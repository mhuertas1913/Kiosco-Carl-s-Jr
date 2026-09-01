'use strict';

/* ═════════════════════════════════════════════════
   CARL'S JR — Ayudante de impresión de tickets (proceso local)
   ═════════════════════════════════════════════════
   Por qué existe este archivo:
     Ninguna página web puede imprimir sin el diálogo de confirmación
     del navegador — es una restricción de seguridad de todos los
     navegadores, no depende del código de la página. La única forma
     de imprimir "de verdad" en silencio, sin preguntar nada, es que
     algo FUERA del navegador hable directamente con la impresora.
     Este script es exactamente eso: un pequeño servidor que corre en
     el mismo PC del kiosco, recibe el texto del ticket, lo guarda como
     .txt y lo envía directamente a la impresora de tickets.
   Cómo imprime (sin PowerShell, sin ventanas, sin márgenes):
     En vez de lanzar ningún programa externo (que provocaba el parpadeo
     de una ventana y además dejaba márgenes grandes porque Windows
     renderizaba el .txt con su fuente y márgenes propios), volcamos el
     texto CRUDO directamente al recurso compartido de la impresora
     (\\\\localhost\\<PRINTER_SHARE>). Así la impresora usa su propia
     fuente monoespaciada de 48 columnas y aprovecha todo el ancho del
     papel de 80 mm, y como no se abre ningún proceso, no hay ninguna
     ventana que parpadee.
   Requisito ÚNICO en Windows:
     Compartir la impresora. Panel de control → Dispositivos e impresoras
     → clic derecho en la Epson → Propiedades de impresora → pestaña
     "Compartir" → marcar "Compartir esta impresora" → nombre: TICKETS
     (o el que pongas abajo en PRINTER_SHARE).
   Cómo se usa:
     1. node print-helper.js  (o doble clic en iniciar-impresora.vbs)
     2. El kiosco le habla por HTTP en http://localhost:5217 al pulsar
        "Imprimir ticket". Todo pasa en segundo plano.
   Requisitos: Node.js instalado en el PC del kiosco. Sin librerías
   externas (solo módulos incluidos en Node).
   ═════════════════════════════════════════════════ */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5217;
const TICKETS_DIR = path.join(__dirname, 'tickets-impresos');

// Nombre del recurso compartido de la impresora en Windows.
// Debe coincidir EXACTAMENTE con el nombre que pusiste al compartirla.
const PRINTER_SHARE = 'TICKETS';
const PRINTER_PATH = `\\\\localhost\\${PRINTER_SHARE}`;

if (!fs.existsSync(TICKETS_DIR)) fs.mkdirSync(TICKETS_DIR, { recursive: true });

function withCors(res) {
  // El kiosco se sirve en su propio puerto (p.ej. 3877); este ayudante
  // corre en otro, así que hace falta CORS para que fetch() no lo bloquee.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Private Network Access: si el kiosco se carga desde una web pública
  // (GitHub Pages, https), Chrome trata "página de internet llamando a
  // localhost" como una petición a la red privada y la bloquea salvo que
  // el destino dé permiso explícito con esta cabecera. Sin ella la
  // impresión falla en el tótem aunque el ayudante esté perfectamente
  // arrancado, y el fallo no se ve como error de red normal.
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
}

/* Últimos resultados, para poder diagnosticar desde el propio tótem
   abriendo http://localhost:5217/salud en el navegador. */
const estado = {
  arrancado: new Date().toISOString(),
  impresos: 0,
  fallos: 0,
  ultimaImpresion: null,
  ultimoError: null,
};

function safeOrderNum(n) {
  const s = String(n).replace(/[^a-zA-Z0-9_-]/g, '');
  return s || 'sin-numero';
}

// Envía el ticket a la impresora escribiendo el texto CRUDO directamente
// al recurso compartido de la impresora. No se lanza ningún proceso, así
// que no hay ventana que parpadee, y al ir el texto tal cual, la impresora
// lo imprime con su fuente monoespaciada a todo el ancho (sin márgenes).
function printFileSilently(text, cb) {
  const payload = Buffer.concat([
    Buffer.from(text + '\n\n\n\n', 'utf8'),
    Buffer.from([0x1D, 0x56, 0x00]) // GS V 0: corte completo
  ]);

  fs.writeFile(PRINTER_PATH, payload, (err) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null);
  });
}
const server = http.createServer((req, res) => {
  withCors(res);

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  if (req.method === 'GET' && req.url === '/salud') {
    /* Responde con el historial, no solo con ok:true: si el kiosco cae al
       aviso de "impresora no responde", esto dice si el problema es que el
       ayudante no recibe nada (impresos y fallos a 0) o que sí lo recibe y
       es el recurso compartido de Windows el que falla (ultimoError). */
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      ok: true,
      impresora: PRINTER_PATH,
      ...estado,
    }, null, 2));
    return;
  }

  if (req.method === 'POST' && req.url === '/imprimir') {
    let body = '';
    req.on('data', chunk => { body += chunk; if (body.length > 2_000_000) req.destroy(); });
    req.on('end', () => {
      let data;
      try { data = JSON.parse(body); } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'JSON inválido' }));
        return;
      }

      const orderNum = safeOrderNum(data.orderNum);
      const text = typeof data.text === 'string' ? data.text : '';
      if (!text) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Falta el texto del ticket' }));
        return;
      }

      // Guardamos una copia del ticket como respaldo/historial.
      const filePath = path.join(TICKETS_DIR, `pedido-${orderNum}.txt`);
      fs.writeFile(filePath, text, 'utf8', (writeErr) => {
        if (writeErr) {
          console.warn('[print-helper] Error guardando el ticket:', writeErr);
          // No es crítico: seguimos intentando imprimir de todos modos.
        } else {
          console.log(`[print-helper] Guardado ${filePath}`);
        }

        printFileSilently(text, (printErr) => {
          if (printErr) {
            estado.fallos++;
            estado.ultimoError = {
              cuando: new Date().toISOString(),
              pedido: orderNum,
              codigo: printErr.code || null,
              mensaje: printErr.message,
            };
            console.warn('[print-helper] Error al imprimir:', printErr);
            console.warn(`[print-helper] ¿Está la impresora compartida como "${PRINTER_SHARE}"?`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: false, saved: !writeErr, error: 'No se pudo enviar a la impresora' }));
            return;
          }
          estado.impresos++;
          estado.ultimaImpresion = { cuando: new Date().toISOString(), pedido: orderNum };
          console.log(`[print-helper] Enviado a la impresora: pedido-${orderNum}`);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true, saved: !writeErr, printed: true }));
        });
      });
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: false, error: 'No encontrado' }));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[print-helper] Escuchando en http://localhost:${PORT}`);
  console.log(`[print-helper] Impresora compartida esperada: ${PRINTER_PATH}`);
  console.log(`[print-helper] Tickets guardados en: ${TICKETS_DIR}`);
});
