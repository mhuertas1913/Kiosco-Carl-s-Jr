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

## Accesibilidad

El botón ♿ del final del rail de categorías baja toda la interfaz táctil (carta, diálogos y carrito) a la **mitad inferior** de la pantalla, para que sea alcanzable desde una silla de ruedas: en el tótem vertical de 1080×1920 la parte de arriba queda fuera del alcance de alguien sentado.

El interruptor va anclado al fondo del rail y pegado (`position: sticky`) a propósito: es el único control que tiene que estar al alcance *antes* de activar el modo, así que no puede ir en la barra superior. La mitad de arriba se rellena con un telón de marca en vez de dejarse en negro.

## Resoluciones

El diseño está dimensionado para el tótem (1080×1920), pero funciona en cualquier resolución. Las medidas fijas del bloque de kiosko se reescalan con `clamp()` sobre `vh` en el nivel `@media (min-width: 900px) and (max-height: 1500px)` de `styles.css`: el tótem conserva exactamente sus tamaños (son los máximos de cada `clamp`) y el resto de pantallas se ajustan de forma continua.

Comprobado en 1080×1920, 1366×768, 1920×1080, 1024×1366, 1280×800, 390×844 y 900×700, en modo normal y en modo silla de ruedas.

## Impresión de tickets

La web se carga desde GitHub Pages, pero la impresión se realiza localmente en el PC del kiosco.

## Flujo de impresión:
Web del kiosco → print-helper.js local → impresora compartida TICKETS → Epson TM-m30II


## Inicio automático del helper de impresión
El archivo abrir-kiosco.bat inicia el helper local de impresión. Debe ejecutarse automáticamente al iniciar sesión en Windows.

Pulsa Win + R.

Escribe:

shell:startup

En la carpeta que se abre, crea un acceso directo a:

C:\Users\Admin\Documents\Kiosco-Carl-s-Jr-main\abrir-kiosco.bat

No copies el archivo .bat a la carpeta de inicio; crea solamente un acceso directo.
