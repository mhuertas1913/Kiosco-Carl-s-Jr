# Kiosco Carl’s Jr.

Kiosco táctil para la selección de productos y generación de pedidos de Carl’s Jr.

La interfaz está pensada para mostrarse en una pantalla de cartelería digital. El cliente selecciona productos, personaliza su pedido y, al finalizar, puede generar e imprimir su ticket.

## Flujo del pedido

1. **Comer aquí o para llevar.** Se pregunta nada más pulsar *Continuar*, antes de ver la carta. La elección queda como chip en la barra superior y se puede cambiar en cualquier momento tocándolo. Viaja al resumen, al ticket y al KDS (etiqueta `🍽️ AQUÍ` / `🥡 LLEVAR`), que es quien necesita saberlo para empaquetar.

2. **Hamburguesa individual o en combo.** Al tocar una hamburguesa se elige antes de personalizarla:
   - *Individual*: precio de carta; bebida, acompañamiento y postre son opcionales y se cobran a precio suelto.
   - *En combo*: recargo fijo de **$70** (constante `BURGER_COMBO_SURCHARGE` en `app.js`) que incluye patatas y bebida a elegir, con suplemento solo en las mejoras (Monster, aros de cebolla). Es la misma diferencia que ya tenían los Menús de la carta respecto a su hamburguesa suelta ($169 → $239, $189 → $259, $159 → $229), así que los precios cuadran entre las dos formas de pedir.

   Una hamburguesa pasada a combo se llama **“Menú &lt;hamburguesa&gt;”** en carrito, resumen, ticket y cocina, para que el mismo pedido no aparezca de dos formas distintas según por dónde se haya pedido.

3. **Pago.**

4. **Recoger o servir en mesa.** Después de pagar, y solo si el cliente come en el local, elige si lo recoge él o se lo llevamos. Si elige mesa, teclea en un teclado numérico el número del **cartelito que coge junto al kiosco** (1–99), igual que en McDonald's. Ese número aparece en el resguardo, en el ticket a doble tamaño (`MESA 42`) y en el KDS como etiqueta azul, que es lo que necesita quien lleva la bandeja.

   > Operativa: hay que tener los cartelitos numerados junto al tótem. Si nadie toca nada en 30 segundos, el pedido sale como recogida en mostrador — está cobrado y no puede quedarse sin mandar a cocina.

## Iconos

Los iconos son la foto real del producto siempre que exista, no emojis: es la
imagen de la marca y se reconoce de un vistazo desde lejos, que es como se mira
un tótem. Las fotos recortadas están en `iconos/`.

- **Rail de categorías** (`CATEGORIES` en `app.js`): cada categoría lleva su
  foto en `img`, y el emoji se queda en `icon` como respaldo si la imagen no
  carga. "Menús" usa `imgs` (hamburguesa + patatas + refresco) porque es justo
  lo que lo distingue de "Hamburguesas"; con una estrella se confundía con
  "Infantil". Todas las fotos son locales, así que el rail no depende de
  internet; si alguna faltara, esa categoría cae a su emoji de `icon` sin
  romper nada.
- **Individual / En combo**: cada opción enseña lo que se lleva de verdad — la
  hamburguesa elegida, y esa misma con las patatas y el refresco — para que la
  diferencia de precio se entienda sin leer.
- **Sin dibujo posible** (sin bebida/acompañamiento/postre, comer aquí, para
  llevar, recoger, servicio a mesa y accesibilidad): iconos SVG dibujados. Van
  con `currentColor`, así que se encienden en amarillo al seleccionarse, cosa
  que un emoji no hace. Ojo: dentro de un `<button>`, `currentColor` hereda el
  negro del navegador y no el color del texto, por eso `.choice-icon-svg` fija
  el color a mano.

## Cantidades

Los pasos de "elige tu bebida" y "elige tu postre" no llevan selector de
cantidad: un contador justo debajo se lee como si multiplicara la bebida y no
el menú entero. Las unidades se cambian en el carrito, que es donde se ve qué
se está sumando.

## Accesibilidad

El botón ♿ del final del rail de categorías baja toda la interfaz táctil (carta, diálogos y carrito) a la **mitad inferior** de la pantalla, para que sea alcanzable desde una silla de ruedas: en el tótem vertical de 1080×1920 la parte de arriba queda fuera del alcance de alguien sentado.

El interruptor va anclado al fondo del rail y pegado (`position: sticky`) a propósito: es el único control que tiene que estar al alcance *antes* de activar el modo, así que no puede ir en la barra superior. La mitad de arriba se rellena con un telón de marca en vez de dejarse en negro.

## Resoluciones

> Dos trampas del CSS que ya han mordido una vez, por si vuelven a aparecer:
> **(1)** `background-size` no se hereda de la regla que definió la imagen. La
> regla del fondo de madera fija `220px`, así que al cambiar solo
> `background-image` en `.cat-nav` el degradado se recortaba a 220px y se
> repetía: en el tótem salían ocho franjas horizontales.
> **(2)** `.combo-opt img` (una clase + un elemento) gana a una clase suelta
> como `.choice-photo`, así que las fotos nuevas necesitan `.combo-opt` delante
> para no heredar los 92px del bloque de kiosco.


El diseño está dimensionado para el tótem (1080×1920), pero funciona en cualquier resolución. Las medidas fijas del bloque de kiosko se reescalan con `clamp()` sobre `vh` en el nivel `@media (min-width: 900px) and (max-height: 1500px)` de `styles.css`: el tótem conserva exactamente sus tamaños (son los máximos de cada `clamp`) y el resto de pantallas se ajustan de forma continua.

Comprobado en 1080×1920, 1366×768, 1920×1080, 1024×1366, 1280×800, 390×844 y 900×700, en modo normal y en modo silla de ruedas.

## Impresión de tickets

La web se carga desde GitHub Pages, pero la impresión se realiza localmente en el PC del kiosco.

## Flujo de impresión:
Web del kiosco → print-helper.js local → impresora compartida TICKETS → Epson TM-m30II

### Al cliente no le sale nunca el diálogo de Windows

El ticket se imprime **solo** por HTTP contra el ayudante local (`POST http://localhost:5217/imprimir`), que vuelca el texto crudo a la impresora sin ninguna ventana.

El diálogo de impresión del navegador **no se usa en el flujo del cliente**, a propósito: es una ventana del sistema con un botón *Cancelar* que deja el pedido pagado y sin ticket y, en un tótem sin vigilancia, es una vía para salirse de la aplicación (desde ahí se llega a «Guardar como PDF» y al explorador de archivos). Si la impresión falla, el cliente ve un aviso ámbar —el pedido ya está cobrado y en cocina— y puede reintentar.

Queda disponible solo como herramienta de mantenimiento, pidiéndolo a propósito:

- `?impresion-navegador=1` en la URL, o
- `cj-print-fallback=1` en el `localStorage` del navegador del kiosco.

### Si no imprime: cómo saber por qué

Abre en el propio PC del kiosco **<http://localhost:5217/salud>**. Devuelve el estado del ayudante:

| Lo que ves | Lo que significa |
| --- | --- |
| No carga nada | El ayudante no está arrancado. Ejecuta `abrir-kiosco.bat` y revisa `print-helper.log`. |
| `impresos` y `fallos` a 0 tras un intento | El ayudante está vivo pero la petición del kiosco no le llega: lo está bloqueando el navegador (ver el punto siguiente). |
| `ultimoError` con un mensaje sobre `\\localhost\TICKETS` | El ayudante recibe el ticket pero no puede escribir en la impresora: se ha dejado de compartir, o cambió el nombre del recurso compartido. |

**Navegador bloqueando la petición:** al cargarse el kiosco desde una web pública (`https://…github.io`), Chrome considera que llamar a `localhost` es una petición a la red privada y la bloquea salvo que el destino la autorice. El ayudante manda ya la cabecera `Access-Control-Allow-Private-Network: true` para permitirlo. Si aun así se bloquea, servir el kiosco desde el propio PC (`http://localhost`) elimina el problema de raíz, porque deja de haber mezcla de orígenes.


## Inicio automático del helper de impresión

`abrir-kiosco.bat` arranca el ayudante local de impresión y debe ejecutarse al iniciar sesión en Windows. Hay dos formas; la primera es la recomendada.

### Opción A (recomendada): tarea programada

Doble clic **una vez** en `instalar-inicio-automatico.bat`, desde la carpeta del proyecto. Registra una tarea que arranca el ayudante 30 segundos después de iniciar sesión.

Es más robusto que la carpeta de Inicio porque la tarea guarda la ruta completa del proyecto, así que no se puede romper moviendo o copiando archivos. Si ya tenías un acceso directo en la carpeta de Inicio, bórralo para no arrancar dos veces.

Para quitarla:

```
schtasks /Delete /TN "Kiosco Carls Jr - Ayudante de impresion" /F
```

### Opción B: carpeta de Inicio

Win + R → `shell:startup`. En la carpeta que se abre, crea un **acceso directo** a `abrir-kiosco.bat`.

**No copies el `.bat` a la carpeta de Inicio.** El script localiza al ayudante a partir de su propia carpeta (`%~dp0`): si se copia, esa carpeta pasa a ser la de Inicio, donde no está ni `iniciar-impresora.vbs` ni `print-helper.js`, y no arranca nada — aunque ejecutándolo a mano desde su sitio funcione perfectamente. Es el fallo más habitual de esta opción.

### Si no arranca solo al encender el ordenador

Mira **`inicio-kiosco.log`**, en la carpeta del proyecto: cada arranque deja ahí la carpeta que ha resuelto y lo que ha hecho.

| Lo que dice el log | Lo que significa |
| --- | --- |
| No hay línea nueva tras reiniciar | No se está ejecutando: falta el acceso directo o la tarea programada. |
| «Carpeta resuelta» apunta a la carpeta de Inicio | Hay una **copia** del `.bat` ahí en vez de un acceso directo (ver opción B). |
| «print-helper.js no apareció… tras 60 segundos» | La carpeta del proyecto no estaba disponible. Pasa si `Documents` se sincroniza con OneDrive y los archivos aún no se han materializado al iniciar sesión: usa la opción A, que espera 30 s antes de empezar. |
| «no se encontró Node.js en el PATH» | Falta Node.js, o está instalado solo para otro usuario de Windows. |

El arranque espera hasta 60 segundos a que aparezca la carpeta en vez de fallar de golpe, y si `iniciar-impresora.vbs` no está (borrado, o bloqueado por el antivirus) arranca el ayudante igualmente por otra vía: quedarse sin impresora es peor que un parpadeo de ventana.
