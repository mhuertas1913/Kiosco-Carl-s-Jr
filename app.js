'use strict';

/* ═══════════════════════════════════════════════════
   CARL'S JR — KIOSCO CLIENTE
   ═══════════════════════════════════════════════════ */

/* INC-06: precios locales en pesos enteros, como en la carta de referencia ($149). */
const EUR = new Intl.NumberFormat('es-MX', {
  style: 'currency', currency: 'MXN',
  minimumFractionDigits: 0, maximumFractionDigits: 0,
});

/* ─── IFRAME-SAFE MODAL ─── */
function safeModal(dialog) {
  try {
    dialog.showModal();
  } catch (e) {
    // Fallback for iframes without allow-modals (e.g. Admira player)
    let bd = dialog._bd;
    if (!bd) {
      bd = document.createElement('div');
      bd.className = 'modal-bd';
      bd.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:998;';
      bd.addEventListener('click', () => safeClose(dialog));
      dialog._bd = bd;
    }
    if (!bd.isConnected) document.body.insertBefore(bd, dialog);
    dialog.style.zIndex = '999';
    dialog.show();
  }
}
function safeClose(dialog) {
  dialog.close();
  if (dialog._bd && dialog._bd.isConnected) dialog._bd.remove();
}

/* ─── PRODUCTOS (reales de carlsjr.es) ─── */
const PRODUCTS = [
  /* HAMBURGUESAS */
  {
    id: 'big-carl', cat: 'burgers', name: 'The Big Carl',
    desc: 'Doble carne de vacuno a la parrilla, queso Cheddar, lechuga y Salsa Clásica Big Carl. Un clásico con carácter.',
    price: 169, tags: ['Top ventas', 'Carne'], badge: '🔥 Más pedido',
    badgeStyle: '',
    img: 'https://carlsjr.es/wp-content/uploads/2023/04/Diseno-sin-titulo-2024-06-19T125728.106.png',
    protein: 'beef', hunger: 'high', stars: 5, mods: ['no-onion','no-tomato','no-sauce','extra-cheese','extra-bacon'], extras: ['extra-cheese','extra-bacon']
  },
  {
    id: 'western-bacon', cat: 'burgers', name: 'Western Bacon Cheeseburger',
    desc: 'Carne a la parrilla, bacon ahumado, queso Cheddar, aros de cebolla crujientes y salsa BBQ.',
    price: 159, tags: ['BBQ', 'Bacon'], badge: 'Favorito',
    badgeStyle: 'yellow',
    img: 'https://carlsjr.es/wp-content/uploads/2023/04/Western-Bacon-Cheeseburger-nueva.png',
    protein: 'beef', hunger: 'high', stars: 5, mods: ['no-onion','no-tomato','no-sauce','extra-cheese','extra-bacon'], extras: ['extra-cheese','extra-bacon']
  },
  {
    id: 'famous-star', cat: 'burgers', name: 'Famous Star',
    desc: 'La burger icónica: carne a la parrilla, queso, tomate fresco, lechuga, cebolla y salsa especial.',
    price: 129, tags: ['Clásica'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Famous-Star.png',
    protein: 'beef', hunger: 'medium', stars: 4, mods: ['no-onion','no-tomato','no-sauce','extra-cheese'], extras: ['extra-cheese']
  },
  {
    id: 'super-star', cat: 'burgers', name: 'Super Star',
    desc: 'Doble carne charbroiled, doble queso Cheddar, tomate, lechuga, mayonesa y salsa especial.',
    price: 189, tags: ['Premium', 'Doble'], badge: 'Premium',
    badgeStyle: 'yellow',
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Super-Star-1-1.png',
    protein: 'beef', hunger: 'high', stars: 5, mods: ['no-onion','no-tomato','no-sauce','extra-cheese','extra-bacon'], extras: ['extra-cheese','extra-bacon']
  },
  {
    id: 'guacamole-angus', cat: 'burgers', name: 'Guacamole Bacon Gran Angus',
    desc: 'Hamburguesa Angus 100%, guacamole, bacon crujiente, queso Suizo, lechuga, tomate, cebolla morada y Salsa Santa Fe.',
    price: 169, tags: ['Angus', 'Premium', 'Guacamole'], badge: 'Premium',
    badgeStyle: 'yellow',
    img: 'https://carlsjr.es/wp-content/uploads/2023/04/Diseno-sin-titulo-2024-05-30T111453.743.png',
    protein: 'beef', hunger: 'high', stars: 5, mods: ['no-onion','no-tomato','no-sauce','extra-cheese','extra-bacon'], extras: ['extra-cheese','extra-bacon']
  },
  {
    id: 'bacon-cheese-angus', cat: 'burgers', name: 'Bacon Cheese Gran Angus',
    desc: 'Carne Angus 100%, doble bacon, queso Cheddar, cebolla caramelizada y nuestra salsa especial.',
    price: 175, tags: ['Angus', 'Bacon'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2025/06/Single-BaconCheese-Gran-Angus_500x500px.png',
    protein: 'beef', hunger: 'high', stars: 4, mods: ['no-onion','no-sauce','extra-cheese','extra-bacon'], extras: ['extra-cheese','extra-bacon']
  },
  {
    id: 'texas-angus', cat: 'burgers', name: 'Texas Bacon Gran Angus',
    desc: 'Angus, bacon ahumado doble, queso Cheddar extra, jalapeños, salsa BBQ y cebolla crujiente.',
    price: 185, tags: ['Angus', 'Picante', 'Texas'], badge: '🌶 Hot',
    badgeStyle: '',
    img: 'https://carlsjr.es/wp-content/uploads/2025/01/Single-Texas-Bacon-Gran-Angus_500x500px.png',
    protein: 'beef', hunger: 'high', stars: 4, mods: ['no-onion','no-sauce','extra-cheese','extra-bacon'], extras: ['extra-cheese','extra-bacon']
  },
  {
    id: 'bacon-trufa', cat: 'burgers', name: 'Bacon Trufa',
    desc: 'Carne charbroiled, queso Cheddar, bacon crujiente y la irresistible salsa de trufa negra.',
    price: 199, tags: ['Trufa', 'Gourmet'], badge: 'Nuevo',
    badgeStyle: 'green',
    img: 'https://carlsjr.es/wp-content/uploads/2025/12/Bacon_trufa_single.png',
    protein: 'beef', hunger: 'high', stars: 5, mods: ['no-onion','no-sauce','extra-cheese','extra-bacon'], extras: ['extra-cheese','extra-bacon']
  },
  {
    id: 'original-angus', cat: 'burgers', name: 'Original Gran Angus',
    desc: 'La hamburguesa Angus 100% en su expresión más pura: carne, queso, lechuga, tomate y mayonesa.',
    price: 149, tags: ['Angus', 'Clásica'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/04/Original_Gran_Angu.png',
    protein: 'beef', hunger: 'high', stars: 4, mods: ['no-onion','no-tomato','no-sauce','extra-cheese'], extras: ['extra-cheese']
  },
  {
    id: 'famous-crispy-chicken', cat: 'burgers', name: 'Famous Crispy Chicken',
    desc: 'Pechuga de pollo crujiente con queso Cheddar, mayonesa, salsa especial, lechuga, tomate, cebolla y pepinillos.',
    price: 135, tags: ['Pollo', 'Crujiente'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2025/04/Single-Famous-Crispy-Chicken_500x500px.png',
    protein: 'chicken', hunger: 'medium', stars: 4, mods: ['no-onion','no-tomato','no-sauce','extra-cheese'], extras: ['extra-cheese']
  },
  {
    id: 'famous-grilled-chicken', cat: 'burgers', name: 'Famous Grilled Chicken',
    desc: 'Pechuga de pollo a la plancha, queso Cheddar, mayonesa, salsa especial, lechuga, tomate, cebolla y pepinillos.',
    price: 129, tags: ['Pollo', 'Plancha', 'Ligera'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2025/04/Single-Famous-Grilled-Chicken_500x500px.png',
    protein: 'chicken', hunger: 'medium', stars: 4, mods: ['no-onion','no-tomato','no-sauce','extra-cheese'], extras: ['extra-cheese']
  },
  {
    id: 'chicken-crispy-sandwich', cat: 'burgers', name: 'Chicken Crispy Sandwich',
    desc: 'Filete de pollo crujiente, lechuga, mayonesa y pepinillos. Sencillo y adictivo.',
    price: 119, tags: ['Pollo', 'Sándwich'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2025/04/Single-Chicken-Crispy-Sandwich_500x500px.png',
    protein: 'chicken', hunger: 'medium', stars: 3, mods: ['no-onion','no-sauce','extra-cheese'], extras: ['extra-cheese']
  },
  {
    id: 'moving-mountains', cat: 'burgers', name: 'Moving Mountains Famous Star',
    desc: 'Proteína 100% vegetal Moving Mountains, queso Cheddar, tomate, pepinillos, cebolla, mayonesa y salsa especial.',
    price: 155, tags: ['Vegetal', '100% Plant'], badge: '🌱 Plant',
    badgeStyle: 'green',
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Moving-Mountains-Famous-Star-1.png',
    protein: 'plant', hunger: 'medium', stars: 4, mods: ['no-onion','no-tomato','no-sauce','extra-cheese'], extras: ['extra-cheese']
  },
  /* COMBOS */
  {
    id: 'combo-super-star', cat: 'combos', name: 'Menú Super Star',
    desc: 'Super Star + Patatas Medianas + Bebida Refill. El combo más popular del kiosco.',
    price: 259, tags: ['Combo', 'Completo'], badge: '⭐ Top Combo',
    badgeStyle: 'yellow',
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Super-Star-1-1.png',
    protein: 'beef', hunger: 'high', stars: 5, combo: true, mods: [], extras: []
  },
  {
    id: 'combo-big-carl', cat: 'combos', name: 'Menú The Big Carl',
    desc: 'The Big Carl + Crisscuts Medianos + Bebida Refill. El dúo perfecto.',
    price: 239, tags: ['Combo', 'Big Carl'], badge: '🔥 Más pedido',
    badgeStyle: '',
    img: 'https://carlsjr.es/wp-content/uploads/2023/04/Diseno-sin-titulo-2024-06-19T125728.106.png',
    protein: 'beef', hunger: 'high', stars: 5, combo: true, mods: [], extras: []
  },
  {
    id: 'combo-western', cat: 'combos', name: 'Menú Western Bacon',
    desc: 'Western Bacon + Patatas Medianas + Bebida Refill. La leyenda de la barbacoa.',
    price: 229, tags: ['Combo', 'BBQ'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/04/Western-Bacon-Cheeseburger-nueva.png',
    protein: 'beef', hunger: 'high', stars: 4, combo: true, mods: [], extras: []
  },
  {
    id: 'combo-chicken-crispy', cat: 'combos', name: 'Menú Chicken Crispy Sandwich',
    desc: 'Chicken Crispy Sandwich + Patatas Medianas + Bebida Refill.',
    price: 189, tags: ['Combo', 'Pollo'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2025/04/Single-Chicken-Crispy-Sandwich_500x500px.png',
    protein: 'chicken', hunger: 'high', stars: 4, combo: true, mods: [], extras: []
  },
  /* COMPLEMENTOS */
  {
    id: 'crisscuts', cat: 'sides', name: 'Crisscuts',
    desc: 'Las patatas más icónicas de Carl\'s Jr. Crujientes por fuera, esponjosas por dentro.',
    price: 65, tags: ['Clásico'], badge: '🔥 Imprescindible',
    badgeStyle: '',
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/crisscuts-2.png',
    protein: 'side', hunger: 'low', stars: 5, mods: [], extras: []
  },
  {
    id: 'fries', cat: 'sides', name: 'Patatas Fritas',
    desc: 'Patatas fritas doradas al punto perfecto.',
    price: 55, tags: ['Clásico'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Patatas-Fritas.png',
    protein: 'side', hunger: 'low', stars: 4, mods: [], extras: []
  },
  {
    id: 'nuggets', cat: 'sides', name: 'Chicken Nuggets',
    desc: 'Nuggets de pollo 100% pechuga, crujientes y jugosos.',
    price: 75, tags: ['Pollo'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Chicken-Nuggets.png',
    protein: 'chicken', hunger: 'low', stars: 4, mods: [], extras: []
  },
  /* POSTRES */
  {
    id: 'twist-oreo', cat: 'desserts', name: 'Twist Oreo',
    desc: 'Helado suave con sirope y topping crujiente de Oreo.',
    price: 65, tags: ['Oreo', 'Postre'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2026/02/twist-oreo-1024x1024.png',
    protein: 'dessert', hunger: 'low', stars: 5, mods: [], extras: []
  },
  {
    id: 'shake-oreo', cat: 'desserts', name: 'American Shake Oreo',
    desc: 'Batido cremoso American-style con galleta Oreo. Espeso y adictivo.',
    price: 85, tags: ['Shake', 'Oreo'], badge: 'Favorito',
    badgeStyle: 'yellow',
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/American_Shake_Oreo_500x500.png',
    protein: 'dessert', hunger: 'low', stars: 5, mods: [], extras: []
  },
  {
    id: 'shake-chocolate', cat: 'desserts', name: 'American Shake Chocolate',
    desc: 'Batido de chocolate intenso con helado cremoso y nata.',
    price: 85, tags: ['Shake', 'Chocolate'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/American_Shake_Chocolate-500x500px.png',
    protein: 'dessert', hunger: 'low', stars: 4, mods: [], extras: []
  },
  {
    id: 'shake-fresa', cat: 'desserts', name: 'American Shake Fresa',
    desc: 'Batido de fresa natural con un toque cremoso irresistible.',
    price: 85, tags: ['Shake', 'Fresa'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/American_Shake_fresa-500x500px.png',
    protein: 'dessert', hunger: 'low', stars: 4, mods: [], extras: []
  },
  /* BEBIDAS */
  {
    id: 'refrescos', cat: 'drinks', name: 'Refresco Refill',
    desc: 'Elige tu favorito: Coca-Cola, Fanta Naranja, Sprite, Aquarius, Fuze Tea o Monster. Vaso refill.',
    price: 49, tags: ['Refill'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Refresco_Vaso_Cocacola-sabor-original.png',
    protein: 'drink', hunger: 'low', stars: 4, mods: [], extras: []
  },
  {
    id: 'cafe-te', cat: 'drinks', name: 'Café y Té',
    desc: 'Café solo, cortado, con leche, té negro o manzanilla.',
    price: 39, tags: ['Caliente'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Cafe-y-Te-carls-jr-bebidas-2.png',
    protein: 'drink', hunger: 'low', stars: 3, mods: [], extras: []
  },
  /* ENSALADAS */
  {
    id: 'crispy-salad', cat: 'salads', name: 'Chicken Crispy Salad',
    desc: 'Pollo crujiente, lechuga variada, cebolla morada, tomate cherry y croutons.',
    price: 145, tags: ['Ensalada', 'Pollo'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Ensalada_crispy_plato_blanco_500x500px.png',
    protein: 'chicken', hunger: 'medium', stars: 4, mods: [], extras: []
  },
  {
    id: 'grilled-salad', cat: 'salads', name: 'Chicken Grilled Salad',
    desc: 'Pollo a la parrilla marinado, lechuga variada, tomate cherry y croutons.',
    price: 145, tags: ['Ensalada', 'Plancha', 'Light'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Chicken_Grilled_Salad_plato_blanco-500x500px.png',
    protein: 'chicken', hunger: 'medium', stars: 4, mods: [], extras: []
  },
  /* MENÚ INFANTIL */
  {
    id: 'kids-burger', cat: 'kids', name: 'Menú Little Stars Burger',
    desc: 'Hamburguesa + Patatas Pequeñas + Bebida + Bebedino. ¡La sorpresa del Bebedino incluida!',
    price: 109, tags: ['Infantil', 'Completo'], badge: '⭐ Little Stars',
    badgeStyle: 'yellow',
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Bodegon_Menu_infantil_Bebidino_Hamburger_500x500px.png',
    protein: 'beef', hunger: 'medium', stars: 5, combo: true, mods: ['no-onion','no-sauce'], extras: []
  },
  {
    id: 'kids-nuggets', cat: 'kids', name: 'Menú Little Stars Nuggets',
    desc: '4 Nuggets de pollo + Patatas Pequeñas + Bebida + Bebedino.',
    price: 105, tags: ['Infantil', 'Pollo'], badge: '⭐ Little Stars',
    badgeStyle: 'yellow',
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Bodegon_Menu_infantil_Bebidino_Nuggets_500x500px.png',
    protein: 'chicken', hunger: 'medium', stars: 5, combo: true, mods: [], extras: []
  },
  /* MYSTERY */
  {
    id: 'mystery-carls', cat: 'combos', name: "Mystery Carl's",
    desc: 'Menú sorpresa preparado especialmente para ti. El chef elige lo que más te conviene hoy. ¡Descúbrelo cuando llegue a la bandeja!',
    price: 269, tags: ['Sorpresa', 'Misterio'], badge: '🎲 Sorpresa',
    badgeStyle: 'mystery',
    img: '',
    protein: 'mystery', hunger: 'any', stars: 5, isMystery: true, combo: true, mods: [], extras: []
  }
];

/* ─── PRODUCT TRANSLATIONS (EN) ─── */
const PRODUCT_I18N = {
  'big-carl':              { name: 'The Big Carl',                    desc: 'Double charbroiled beef, Cheddar cheese, lettuce and Classic Big Carl Sauce. A classic with character.' },
  'western-bacon':         { name: 'Western Bacon Cheeseburger',      desc: 'Charbroiled beef, smoked bacon, Cheddar cheese, crispy onion rings and BBQ sauce.' },
  'famous-star':           { name: 'Famous Star',                     desc: 'The iconic burger: charbroiled beef, cheese, fresh tomato, lettuce, onion and special sauce.' },
  'super-star':            { name: 'Super Star',                      desc: 'Double charbroiled beef, double Cheddar cheese, tomato, lettuce, mayo and special sauce.' },
  'guacamole-angus':       { name: 'Guacamole Bacon Gran Angus',      desc: '100% Angus beef, guacamole, crispy bacon, Swiss cheese, lettuce, tomato, red onion and Santa Fe Sauce.' },
  'bacon-cheese-angus':    { name: 'Bacon Cheese Gran Angus',         desc: '100% Angus beef, double bacon, Cheddar cheese, caramelized onion and our special sauce.' },
  'texas-angus':           { name: 'Texas Bacon Gran Angus',          desc: 'Angus beef, double smoked bacon, extra Cheddar, jalapeños, BBQ sauce and crispy onion.' },
  'bacon-trufa':           { name: 'Bacon Truffle',                   desc: 'Charbroiled beef, Cheddar cheese, crispy bacon and irresistible black truffle sauce.' },
  'original-angus':        { name: 'Original Gran Angus',             desc: '100% Angus beef at its purest: beef, cheese, lettuce, tomato and mayo.' },
  'famous-crispy-chicken': { name: 'Famous Crispy Chicken',           desc: 'Crispy chicken breast with Cheddar cheese, mayo, special sauce, lettuce, tomato, onion and pickles.' },
  'famous-grilled-chicken':{ name: 'Famous Grilled Chicken',          desc: 'Grilled chicken breast, Cheddar cheese, mayo, special sauce, lettuce, tomato, onion and pickles.' },
  'chicken-crispy-sandwich':{ name: 'Chicken Crispy Sandwich',        desc: 'Crispy chicken fillet, lettuce, mayo and pickles. Simple and addictive.' },
  'moving-mountains':      { name: 'Moving Mountains Famous Star',    desc: '100% plant-based Moving Mountains protein, Cheddar cheese, tomato, pickles, onion, mayo and special sauce.' },
  'combo-super-star':      { name: 'Super Star Combo',                desc: 'Super Star + Medium Fries + Refill Drink. The most popular combo at the kiosk.' },
  'combo-big-carl':        { name: 'The Big Carl Combo',              desc: 'The Big Carl + Medium Crisscuts + Refill Drink. The perfect duo.' },
  'combo-western':         { name: 'Western Bacon Combo',             desc: 'Western Bacon + Medium Fries + Refill Drink. The BBQ legend.' },
  'combo-chicken-crispy':  { name: 'Chicken Crispy Sandwich Combo',   desc: 'Chicken Crispy Sandwich + Medium Fries + Refill Drink.' },
  'crisscuts':             { name: 'Crisscuts',                       desc: "Carl's Jr most iconic fries. Crispy outside, fluffy inside." },
  'fries':                 { name: 'French Fries',                    desc: 'Golden fries cooked to perfection.' },
  'nuggets':               { name: 'Chicken Nuggets',                 desc: '100% chicken breast nuggets, crispy and juicy.' },
  'twist-oreo':            { name: 'Twist Oreo',                      desc: 'Soft-serve ice cream with syrup and crunchy Oreo topping.' },
  'shake-oreo':            { name: 'American Shake Oreo',             desc: 'Creamy American-style shake with Oreo cookie. Thick and addictive.' },
  'shake-chocolate':       { name: 'American Shake Chocolate',        desc: 'Rich chocolate shake with creamy ice cream and whipped cream.' },
  'shake-fresa':           { name: 'American Strawberry Shake',       desc: 'Natural strawberry shake with an irresistible creamy twist.' },
  'refrescos':             { name: 'Refill Soda',                     desc: 'Pick your favorite: Coca-Cola, Fanta Orange, Sprite, Aquarius, Fuze Tea or Monster. Refill cup.' },
  'cafe-te':               { name: 'Coffee & Tea',                    desc: 'Espresso, cortado, white coffee, black tea or chamomile.' },
  'crispy-salad':          { name: 'Chicken Crispy Salad',            desc: 'Crispy chicken, mixed greens, red onion, cherry tomato and croutons.' },
  'grilled-salad':         { name: 'Chicken Grilled Salad',           desc: 'Marinated grilled chicken, mixed greens, cherry tomato and croutons.' },
  'kids-burger':           { name: 'Little Stars Burger Combo',       desc: 'Burger + Small Fries + Drink + Bebedino cup. Bebedino surprise included!' },
  'kids-nuggets':          { name: 'Little Stars Nuggets Combo',      desc: '4 Chicken Nuggets + Small Fries + Drink + Bebedino cup.' },
  'mystery-carls':         { name: "Mystery Carl's",                  desc: "Surprise combo made just for you. The chef picks what suits you best today. Discover it when it hits your tray!" },
};

/* El rail usa la foto real del producto en vez de un emoji: es la marca y
   se reconoce de un vistazo desde lejos, que es como se mira un tótem. El
   emoji se queda como respaldo por si la imagen no carga (kiosco sin red).
   "Menús" lleva las tres piezas juntas porque es justo lo que lo distingue
   de "Hamburguesas"; con una estrella se confundía con Infantil. */
const CATEGORIES = [
  { id: 'burgers',  label: 'Hamburguesas', icon: '🍔', img: 'https://carlsjr.es/wp-content/uploads/2023/03/Famous-Star.png' },
  { id: 'combos',   label: 'Menús',        icon: '⭐', imgs: ['https://carlsjr.es/wp-content/uploads/2023/03/Famous-Star.png', './iconos/ic-papas.png', './iconos/ic-cocacola.png'] },
  { id: 'sides',    label: 'Complementos', icon: '🍟', img: './iconos/ic-papas.png' },
  { id: 'desserts', label: 'Postres',      icon: '🥛', img: './iconos/ic-twist-oreo.png' },
  { id: 'drinks',   label: 'Bebidas',      icon: '🥤', img: './iconos/ic-cocacola.png' },
  { id: 'salads',   label: 'Ensaladas',    icon: '🥗', img: 'https://carlsjr.es/wp-content/uploads/2023/03/Ensalada_crispy_plato_blanco_500x500px.png' },
  { id: 'kids',     label: 'Infantil',     icon: '🌟', img: 'https://carlsjr.es/wp-content/uploads/2023/03/Bodegon_Menu_infantil_Bebidino_Hamburger_500x500px.png' }
];

const MODIFIERS = [
  { id: 'no-onion',     label: 'Sin cebolla',    price: 0 },
  { id: 'no-tomato',    label: 'Sin tomate',     price: 0 },
  { id: 'no-sauce',     label: 'Sin salsa',      price: 0 },
  { id: 'extra-cheese', label: 'Extra queso',    price: 18 },
  { id: 'extra-bacon',  label: 'Extra bacon',    price: 25 }
];

/* INC-05 / INC-03 (reporte V4): se añade el pago en efectivo. La tarjeta
   se cobra por datáfono, por eso no se piden los datos de la tarjeta en
   pantalla. */
const PAYMENT_METHODS = [
  { id: 'card',    label: 'Pago con Tarjeta', img: './pay-card.png' },
  { id: 'apple',   label: 'Apple Pay',        img: './pay-apple.png' },
  { id: 'google',  label: 'Google Pay',       img: './pay-google.png' },
  { id: 'cash',    label: 'Efectivo',         img: './pay-cash.png' },
];

// ── STRIPE CONFIG ──────────────────────────────────────────────
// 1. Crea una cuenta en https://dashboard.stripe.com
// 2. Modo Test → Developers → API keys → copia pk_test_...
// 3. Pégala aquí:
const STRIPE_PUBLIC_KEY = 'pk_test_51Tt2ESGRbfstfElckKeac2boGYrqDnDgbszlKDBKVfGJUuREXtlMB86pL2sev5N1KIvGDwp5ooZVaPNljeFoylkp00o2jcPRYA';
// 4. Tras desplegar el Worker, pega aquí su URL:
const WORKER_URL = 'https://carlsjr-stripe-worker.carlsjr-aroa.workers.dev';
// ──────────────────────────────────────────────────────────────

/* ── Stripe runtime state ── */
let stripeInstance   = null;
let stripeElements   = null;
let stripePayEl      = null;
let stripePending    = false; // bloquea doble clic mientras procesa

const QUIZ = [
  {
    id: 'protein',
    q: '¿Qué te apetece hoy?',
    opts: [
      { id: 'beef',    icon: '🥩', img: './iconos/ic-carne.png',   label: 'Carne a la parrilla' },
      { id: 'chicken', icon: '🍗', img: './iconos/ic-pollo.png',   label: 'Pollo crujiente' },
      { id: 'plant',   icon: '🌱', img: './iconos/ic-lechuga.png', label: 'Vegetal' }
    ]
  },
  {
    id: 'hunger',
    q: '¿Cuánta hambre tienes?',
    opts: [
      { id: 'low',    icon: '🙂', label: 'Algo ligero' },
      { id: 'medium', icon: '😋', label: 'Tengo hambre' },
      { id: 'high',   icon: '🔥', label: '¡Muuucha hambre!' }
    ]
  },
  {
    id: 'style',
    q: '¿Cuál es tu rollo hoy?',
    opts: [
      { id: 'classic', icon: '⭐', label: 'El clásico de siempre' },
      { id: 'bacon',   icon: '🥓', label: 'Bacon & BBQ' },
      { id: 'premium', icon: '👑', label: 'Premium Angus' }
    ]
  },
  {
    id: 'budget',
    q: '¿Quieres completarlo en combo?',
    opts: [
      { id: 'solo',  icon: '🍔', label: 'Solo la burger' },
      { id: 'combo', icon: '🍟', label: 'Sí, con patatas + bebida' },
      { id: 'full',  icon: '🎉', label: 'Todo: + postre también' }
    ]
  },
  {
    id: 'sweet',
    q: '¿Rematas con algo dulce?',
    opts: [
      { id: 'shake',  icon: '🥛', img: './iconos/ic-batido.png', label: 'Batido helado' },
      { id: 'ice',    icon: '🍦', img: './iconos/ic-helado.png', label: 'Twist Oreo' },
      { id: 'none',   icon: '🚫', img: './iconos/ic-sin.svg',     label: 'Sin postre, gracias' }
    ]
  }
];

/* ─── UPSELLS CONTEXTUALES (configurables) ─── */
const UPSELL_RULES = [
  { triggerCat: 'burgers', offerProduct: 'crisscuts',  msgKey: 'upsellBurgerMsg', descKey: 'upsellBurgerDesc' },
  { triggerCat: 'burgers', offerProduct: 'refrescos',  msgKey: 'upsellDrinkMsg',  descKey: 'upsellDrinkDesc' },
  { triggerCat: 'sides',   offerProduct: 'shake-oreo', msgKey: 'upsellShakeMsg',  descKey: 'upsellShakeDesc' },
  { triggerCat: 'combos',  offerProduct: 'twist-oreo', msgKey: 'upsellTwistMsg',  descKey: 'upsellTwistDesc' }
];

/* ─── TRANSLATIONS ─── */
const LANGS = {
  es: {
    eyebrow: 'Bigger. Better. Burgers.',
    title: 'Haz tu pedido<br>a lo grande',
    btnLogin: 'Iniciar sesión y sumar puntos ⭐',
    btnGuest: 'Continuar',
    lsTitle: 'Entra con tu cuenta',
    lsSub: 'Escanea el QR con tu móvil o rellena el formulario aquí',
    lsQrHint: '📱 Apunta la cámara',
    lsDivider: 'o rellena aquí',
    lsNameLabel: 'Tu nombre', lsNamePh: 'Ej. María',
    lsEmailLabel: 'Email (para acumular puntos)', lsEmailPh: 'maria@email.com',
    lsSubmit: '¡Entrar y sumar puntos! ⭐',
    lsBack: '← Volver',
    catBurgers: 'Hamburguesas', catCombos: 'Menús', catSides: 'Complementos',
    catDesserts: 'Postres', catDrinks: 'Bebidas', catSalads: 'Ensaladas', catKids: 'Infantil',
    aiBtn: '✨ Sorpréndeme', aiBtnLabel: 'Sorpréndeme',
    dcTitle: 'Reto del día:', dcText: 'Toca aquí para añadir Crisscuts y ganar', dcPts: '+50 puntos',
    cartTitle: 'Tu pedido', fabCart: 'Mi pedido',
    cartEmpty: 'Tu carrito está vacío.\n¡Elige algo delicioso!',
    subtotal: 'Subtotal', tax: 'IVA (10%)', total: 'Total',
    payBtn: 'Pagar',
    howPay: '¿Cómo pagas?', confirmPay: 'Confirmar pago', backOrder: 'Volver al pedido',
    orderPlaced: '¡Pedido enviado!',
    pointsEarned: (n) => `Has ganado <strong>+${n}</strong> puntos ⭐`,
    sendTicket: 'Enviar ticket a mi email ✓', ticketSent: '✅ ¡Ticket enviado!',
    ticketSentTo: (email) => `✅ ¡Ticket enviado a ${email}!`,
    ticketQuestion: '¿Quieres recibir el ticket en tu email?',
    registerTicket: '⭐ Regístrate y recibe tu ticket',
    newOrder: 'Nuevo pedido',
    payCard: 'Pago con Tarjeta', payContactless: 'Contactless', payApple: 'Apple Pay',
    payGoogle: 'Google Pay', payCash: 'Efectivo', payQR: 'QR / Bizum',
    hintCard: 'Pasa o inserta tu tarjeta en el datáfono al confirmar.',
    hintCash: 'Paga en efectivo en el mostrador al recoger tu pedido.',
    hintWallet: 'Acerca tu móvil al datáfono al confirmar.',
    q1: '¿Qué te apetece hoy?', q1o1: 'Carne a la parrilla', q1o2: 'Pollo crujiente', q1o3: 'Vegetal',
    q2: '¿Cuánta hambre tienes?', q2o1: 'Algo ligero', q2o2: 'Tengo hambre', q2o3: '¡Muuucha hambre!',
    q3: '¿Cuál es tu rollo hoy?', q3o1: 'El clásico de siempre', q3o2: 'Bacon & BBQ', q3o3: 'Premium Angus',
    q4: '¿Quieres completarlo en combo?', q4o1: 'Solo la burger', q4o2: 'Sí, con patatas + bebida', q4o3: 'Todo: + postre también',
    q5: '¿Rematas con algo dulce?', q5o1: 'Batido helado', q5o2: 'Twist Oreo', q5o3: 'Sin postre, gracias',
    quizThinking: 'Calculando tu combo perfecto...',
    quizEyebrow: '✨ Tu selección personalizada', quizSubtitle: 'Esto es lo que te recomendamos',
    quizTop: '⭐ Tu mejor opción', quizAlso: 'También te encantará',
    quizCheckout: '🛒 Ver pedido y pagar', quizContinue: '← Seguir comprando', quizRestart: '🔄 Repetir preguntas',
    mysteryLabel: '🎲 Comodín del chef', mysteryAdd: '🎲 ¡Me arriesgo!',
    mysteryRevealed: '¡Sorpresa añadida al pedido! 🎲',
    mysteryChooseDrink: 'Elige tu bebida — lo demás es sorpresa 🎲',
    mysteryAddBtn: '🎲 ¡Quiero esta sorpresa!',
    rdTitle: 'Crea tu cuenta', rdSub: 'Recibe tu ticket y acumula puntos en cada visita ⭐',
    rdName: 'Tu nombre', rdNamePh: 'Ej. María', rdEmail: 'Email', rdEmailPh: 'maria@email.com',
    rdSubmit: '¡Registrarme y recibir ticket! ⭐',
    countdownMsg: 'Nuevo pedido en',
    toastNameEmail: 'Rellena tu nombre y email',
    toastWelcome: (n) => `👋 ¡Bienvenido/a, ${n}! Gana puntos con cada pedido ⭐`,
    toastAdded: (n) => `✅ ${n} añadido`,
    toastDcDone: '🏆 ¡Reto completado! +50 puntos', toastDcRepeat: '🏆 ¡Reto ya completado!',
    toastTicketSent: '📧 Ticket enviado a tu email',
    toastRegistered: '✅ ¡Registrado! Ticket enviado a tu email',
    chooseDrink: 'Elige tu bebida', chooseSide: 'Elige tu acompañamiento',
    chooseDessert: '¿Y de postre?', customizeBurger: 'Personaliza tu hamburguesa',
    comboTotalLabel: 'Total del combo', addCombo: 'Añadir combo —',
    completeYourOrder: '✨ Completa tu pedido', included: 'Incluido',
    orderSummaryTitle: 'Resumen del pedido',
    noChanges: 'Sin cambios',
    extrasOptional: 'Extras (opcionales)', customization: 'Personalización',
    quantity: 'Cantidad', addItem: 'Añadir', addToCart: 'Añadir al pedido',
    quizBack: '← Volver',
    upsellAdd: (name) => `Añadir ${name}`,
    upsellBurgerMsg: '¿Y unas Crisscuts para acompañar?',
    upsellBurgerDesc: "Las favoritas de Carl's Jr, siempre crujientes.",
    upsellDrinkMsg: 'Añade un Refresco Refill',
    upsellDrinkDesc: 'Soda ilimitada mientras comes. ¡Por solo $2.95!',
    upsellShakeMsg: '¿Un batido Oreo para terminar?',
    upsellShakeDesc: "El mejor final para tu visita a Carl's Jr.",
    upsellTwistMsg: 'El toque final: Twist Oreo',
    upsellTwistDesc: 'Solo $3.95. Un pequeño extra para el final.',
    confirmPayLabel: 'Confirmar pago',
    backOrderLabel: 'Volver al pedido',
    'mod-no-onion': 'Sin cebolla', 'mod-no-tomato': 'Sin tomate', 'mod-no-sauce': 'Sin salsa',
    'mod-extra-cheese': 'Extra queso', 'mod-extra-bacon': 'Extra bacon',
    quizQuestion: (n, total) => `Pregunta ${n} de ${total}`,
    comingSoon: 'Próximamente en esta sección',
    diningTitle: '¿Vas a comer aquí o te lo llevas?',
    diningHere: 'Comer aquí', diningToGo: 'Para llevar',
    diningHereShort: 'Aquí', diningToGoShort: 'Llevar',
    a11yLower: 'Bajar menú', a11yRestore: 'Subir menú',
    burgerTypeTitle: '¿Cómo la quieres?',
    burgerTypeSub: 'Puedes personalizarla en el siguiente paso',
    burgerSolo: 'Individual', burgerCombo: 'En combo',
    burgerComboHint: '+ patatas y bebida',
    comboItemName: (n) => `Menú ${n}`,
    orderSummaryDining: (v) => v === 'togo' ? '🥡 Para llevar' : '🍽️ Para comer aquí',
    ticketDiningHere: 'PARA TOMAR AQUÍ', ticketDiningToGo: 'PARA LLEVAR',
    serviceTitle: '¿Cómo quieres recibir tu pedido?',
    serviceSub: 'Tu pago ya está confirmado ✅',
    servicePickup: 'Voy a recogerlo',
    servicePickupHint: 'Te avisamos con tu número',
    serviceTable: 'Que me lo lleven',
    serviceTableHint: 'Servicio a tu mesa',
    serviceTableAsk: 'Coge un cartelito con número junto al kiosco y escribe aquí ese número',
    serviceConfirm: 'Confirmar mesa',
    serviceConfirmHint: '🪑 Escribe el número de tu mesa',
    summaryTable: (n) => `🪑 Te lo llevamos a la mesa ${n}`,
    summaryPickup: '🛎️ Recógelo en el mostrador cuando salga tu número',
    ticketTable: (n) => `MESA ${n}`,
    ticketPickup: 'RECOGER EN MOSTRADOR',
  },
  en: {
    eyebrow: 'Bigger. Better. Burgers.',
    title: 'Make Your Order<br>Big',
    btnLogin: 'Sign in & earn points ⭐',
    btnGuest: 'Continue',
    lsTitle: 'Sign in to your account',
    lsSub: 'Scan the QR with your phone or fill in the form here',
    lsQrHint: '📱 Point your camera',
    lsDivider: 'or fill in here',
    lsNameLabel: 'Your name', lsNamePh: 'E.g. Maria',
    lsEmailLabel: 'Email (to earn points)', lsEmailPh: 'maria@email.com',
    lsSubmit: 'Join & earn points! ⭐',
    lsBack: '← Back',
    catBurgers: 'Burgers', catCombos: 'Combos', catSides: 'Sides',
    catDesserts: 'Desserts', catDrinks: 'Drinks', catSalads: 'Salads', catKids: 'Kids',
    aiBtn: '✨ Surprise me', aiBtnLabel: 'Surprise me',
    dcTitle: 'Daily Challenge:', dcText: 'Tap here to add Crisscuts and earn', dcPts: '+50 points',
    cartTitle: 'Your order', fabCart: 'My order',
    cartEmpty: "Your cart is empty.\nChoose something delicious!",
    subtotal: 'Subtotal', tax: 'Tax (10%)', total: 'Total',
    payBtn: 'Pay',
    howPay: 'How would you like to pay?', confirmPay: 'Confirm payment', backOrder: 'Back to order',
    orderPlaced: 'Order placed!',
    pointsEarned: (n) => `You earned <strong>+${n}</strong> points ⭐`,
    sendTicket: 'Send ticket to my email ✓', ticketSent: '✅ Ticket sent!',
    ticketSentTo: (email) => `✅ Ticket sent to ${email}!`,
    ticketQuestion: 'Want to receive your ticket by email?',
    registerTicket: '⭐ Sign up & receive your ticket',
    newOrder: 'New order',
    payCard: 'Card payment', payContactless: 'Contactless', payApple: 'Apple Pay',
    payGoogle: 'Google Pay', payCash: 'Cash', payQR: 'QR / Bizum',
    hintCard: 'Tap or insert your card on the terminal when you confirm.',
    hintCash: 'Pay with cash at the counter when you pick up your order.',
    hintWallet: 'Hold your phone near the terminal when you confirm.',
    q1: 'What are you in the mood for?', q1o1: 'Grilled beef', q1o2: 'Crispy chicken', q1o3: 'Plant-based',
    q2: 'How hungry are you?', q2o1: 'Something light', q2o2: "I'm hungry", q2o3: 'Starving!',
    q3: "What's your vibe today?", q3o1: 'Classic all the way', q3o2: 'Bacon & BBQ', q3o3: 'Premium Angus',
    q4: 'Want to make it a combo?', q4o1: 'Just the burger', q4o2: 'Yes, fries + drink', q4o3: 'All in: + dessert too',
    q5: 'Finish with something sweet?', q5o1: 'Milkshake', q5o2: 'Twist Oreo', q5o3: 'No dessert, thanks',
    quizThinking: 'Calculating your perfect combo...',
    quizEyebrow: '✨ Your personalized selection', quizSubtitle: "Here's what we recommend",
    quizTop: '⭐ Your best pick', quizAlso: "You'll love this too",
    quizCheckout: '🛒 View order & pay', quizContinue: '← Keep browsing', quizRestart: '🔄 Retake quiz',
    mysteryLabel: "🎲 Chef's wildcard", mysteryAdd: '🎲 Take the risk!',
    mysteryRevealed: 'Surprise added to your order! 🎲',
    mysteryChooseDrink: 'Pick your drink — the rest is a surprise 🎲',
    mysteryAddBtn: '🎲 I want this surprise!',
    rdTitle: 'Create your account', rdSub: 'Receive your ticket and earn points on every visit ⭐',
    rdName: 'Your name', rdNamePh: 'E.g. Maria', rdEmail: 'Email', rdEmailPh: 'maria@email.com',
    rdSubmit: 'Sign me up & get my ticket! ⭐',
    countdownMsg: 'New order in',
    toastNameEmail: 'Please fill in your name and email',
    toastWelcome: (n) => `👋 Welcome, ${n}! Earn points with every order ⭐`,
    toastAdded: (n) => `✅ ${n} added`,
    toastDcDone: '🏆 Challenge completed! +50 points', toastDcRepeat: '🏆 Challenge already completed!',
    toastTicketSent: '📧 Ticket sent to your email',
    toastRegistered: '✅ Registered! Ticket sent to your email',
    chooseDrink: 'Choose your drink', chooseSide: 'Choose your side',
    chooseDessert: 'And for dessert?', customizeBurger: 'Customize your burger',
    comboTotalLabel: 'Combo total', addCombo: 'Add combo —',
    completeYourOrder: '✨ Complete your order', included: 'Included',
    orderSummaryTitle: 'Order summary',
    noChanges: 'No changes',
    extrasOptional: 'Extras (optional)', customization: 'Customization',
    quantity: 'Quantity', addItem: 'Add', addToCart: 'Add to order',
    quizBack: '← Back',
    upsellAdd: (name) => `Add ${name}`,
    upsellBurgerMsg: 'How about Crisscuts on the side?',
    upsellBurgerDesc: "Carl's Jr favorites, always crispy.",
    upsellDrinkMsg: 'Add a Refill Soda',
    upsellDrinkDesc: 'Unlimited refills while you eat. Just $2.95!',
    upsellShakeMsg: 'Finish with an Oreo Shake?',
    upsellShakeDesc: "The best ending to your Carl's Jr visit.",
    upsellTwistMsg: 'The final touch: Twist Oreo',
    upsellTwistDesc: 'Just $3.95. A little extra to finish.',
    confirmPayLabel: 'Confirm payment',
    backOrderLabel: 'Back to order',
    'mod-no-onion': 'No onion', 'mod-no-tomato': 'No tomato', 'mod-no-sauce': 'No sauce',
    'mod-extra-cheese': 'Extra cheese', 'mod-extra-bacon': 'Extra bacon',
    quizQuestion: (n, total) => `Question ${n} of ${total}`,
    comingSoon: 'Coming soon in this section',
    diningTitle: 'Are you dining in or taking out?',
    diningHere: 'Dine in', diningToGo: 'Takeout',
    diningHereShort: 'Dine in', diningToGoShort: 'Takeout',
    a11yLower: 'Lower menu', a11yRestore: 'Raise menu',
    burgerTypeTitle: 'How do you want it?',
    burgerTypeSub: 'You can customize it in the next step',
    burgerSolo: 'Solo', burgerCombo: 'Make it a combo',
    burgerComboHint: '+ fries & drink',
    comboItemName: (n) => `${n} Combo`,
    orderSummaryDining: (v) => v === 'togo' ? '🥡 Takeout' : '🍽️ Dine in',
    ticketDiningHere: 'EAT IN', ticketDiningToGo: 'TAKEOUT',
    serviceTitle: 'How would you like to get your order?',
    serviceSub: 'Your payment is confirmed ✅',
    servicePickup: "I'll pick it up",
    servicePickupHint: "We'll call your number",
    serviceTable: 'Bring it to me',
    serviceTableHint: 'Table service',
    serviceTableAsk: 'Grab a numbered table marker next to the kiosk and type its number here',
    serviceConfirm: 'Confirm table',
    serviceConfirmHint: '🪑 Type your table number',
    summaryTable: (n) => `🪑 We'll bring it to table ${n}`,
    summaryPickup: '🛎️ Pick it up at the counter when your number is called',
    ticketTable: (n) => `TABLE ${n}`,
    ticketPickup: 'COUNTER PICKUP',
  }
};

const t = key => {
  const val = LANGS[state?.lang]?.[key] ?? LANGS.es[key];
  return val ?? key;
};

/* ─── STATE ─── */
const state = {
  cat: 'burgers',
  cart: [],
  points: parseInt(localStorage.getItem('cj-pts') || '0', 10),
  payment: 'card',
  quizStep: 0,
  quizAnswers: {},
  dcDone: false,
  isGuest: true,
  userName: '',
  lang: 'es',
  dining: 'here',
  service: 'pickup',   // 'pickup' | 'table' (solo si se come en el local)
  tableNumber: null
};

/* ─── HELPERS ─── */
const $ = id => document.getElementById(id);
const round = v => Math.round(v * 100) / 100;
const productById = id => PRODUCTS.find(p => p.id === id);
const pName = p => (state.lang === 'en' ? PRODUCT_I18N[p.id]?.name : null) ?? p.name;
const pDesc = p => (state.lang === 'en' ? PRODUCT_I18N[p.id]?.desc : null) ?? p.desc;
/* Una hamburguesa que el cliente ha pasado a combo tiene que leerse igual
   que un Menú de la carta ("Menú The Big Carl") en el carrito, el resumen,
   el ticket y la cocina; si no, el mismo pedido aparece de dos formas
   distintas según por dónde se haya pedido. */
const cartItemName = item => {
  const prod = productById(item.productId);
  const base = prod ? pName(prod) : item.name;
  return item.isCombo ? t('comboItemName')(base) : base;
};
const modLabel = mod => t('mod-' + mod.id) || mod.label;
function modTotal(mods) {
  return mods.reduce((s, id) => s + (MODIFIERS.find(m => m.id === id)?.price || 0), 0);
}

/* ─── FORMATO DEL TICKET DE 80 MM ───
   La Epson TM-m30II permite aproximadamente 48 caracteres
   por línea usando la fuente estándar A. */
const TICKET_COLUMNS = 48;

/* ─── COMANDOS ESC/POS ───
   El nombre, el número de pedido y el total necesitan verse en negrita
   y/o grande en el papel, pero eso no se consigue con texto plano: hay
   que mandarle a la impresora sus propios códigos de control (ESC/POS),
   que es el lenguaje que entienden las impresoras térmicas de tickets.
   print-helper.js manda el texto tal cual (crudo) a la impresora, así
   que estos bytes de control le llegan intactos y es ella quien los
   interpreta.

   Para "grande + negrita" se usa ESC ! (Select print mode) en vez de
   GS ! (Select character size): ESC ! es el comando más antiguo y básico
   de todos, así que lo soportan hasta los clones más baratos; GS ! es
   más moderno y algunas impresoras/clones lo ignoran, que es justo lo
   que pasaba: los códigos llegaban pero la impresora no los aplicaba. */
const ESC = '\x1B';
const PRN_INIT          = `${ESC}@`;      // reinicia el estado de la impresora
const PRN_ALIGN_LEFT    = `${ESC}a\x00`;
const PRN_ALIGN_CENTER  = `${ESC}a\x01`;
const PRN_BOLD_ON       = `${ESC}E\x01`;
const PRN_BOLD_OFF      = `${ESC}E\x00`;
// ESC ! n: bit3 = negrita, bit4 = doble alto, bit5 = doble ancho
const PRN_SIZE_DOUBLE   = `${ESC}!\x38`;  // negrita + doble alto + doble ancho
const PRN_SIZE_NORMAL   = `${ESC}!\x00`;  // vuelta a modo normal (Fuente A)

function centerTicketText(value, width = TICKET_COLUMNS) {
  const text = String(value).slice(0, width);
  const spaces = Math.max(0, Math.floor((width - text.length) / 2));

  return ' '.repeat(spaces) + text;
}

function ticketRow(left, right, width = TICKET_COLUMNS) {
  const rightText = String(right);
  const availableLeft = Math.max(1, width - rightText.length - 1);
  const leftText = String(left).slice(0, availableLeft);
  const spaces = Math.max(
    1,
    width - leftText.length - rightText.length
  );

  return leftText + ' '.repeat(spaces) + rightText;
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', init);

function init() {
  renderCatNav();
  renderProducts();
  renderCart();
  bindWelcome();
  bindTopbar();
  bindCart();
  bindProductDialog();
  bindCheckout();
  bindQuiz();
  bindDailyChallenge();
  bindComboDialog();
  bindRegisterDialog();
  bindLangSwitcher();
  bindDiningDialog();
  bindBurgerTypeDialog();
  bindServiceDialog();
  updatePointsDisplay();
  renderDiningChip();
}

/* ─── WELCOME ─── */
function bindWelcome() {
  $('btnStart').addEventListener('click', () => {
    renderDiningDialog();
    safeModal($('diningDialog'));
  });
  initSlider();
  applyI18n();
}

/* ─── COMER AQUÍ / PARA LLEVAR ─── */
function bindDiningDialog() {
  $('diningClose').addEventListener('click', () => safeClose($('diningDialog')));
  $('diningDialog').addEventListener('click', e => { if (e.target === $('diningDialog')) safeClose($('diningDialog')); });
  $('btnDiningHere').addEventListener('click', () => selectDining('here'));
  $('btnDiningTogo').addEventListener('click', () => selectDining('togo'));
  $('diningChip').addEventListener('click', () => {
    renderDiningDialog();
    safeModal($('diningDialog'));
  });
}

function renderDiningDialog() {
  $('diningTitleEl').textContent = t('diningTitle');
  $('diningHereLabel').textContent = t('diningHere');
  $('diningTogoLabel').textContent = t('diningToGo');
  $('btnDiningHere').classList.toggle('selected', state.dining === 'here');
  $('btnDiningTogo').classList.toggle('selected', state.dining === 'togo');
}

function selectDining(choice) {
  state.dining = choice;
  renderDiningChip();
  safeClose($('diningDialog'));
  // La primera vez (desde la bienvenida) esta elección también arranca la app.
  const w = $('welcome');
  if (w && !w.classList.contains('out')) startApp(true);
}

function renderDiningChip() {
  const isTogo = state.dining === 'togo';
  $('diningChipIcon').textContent = isTogo ? '🥡' : '🍽️';
  $('diningChipLabel').textContent = isTogo ? t('diningToGoShort') : t('diningHereShort');
  $('diningChip').classList.toggle('togo', isTogo);
}

/* ─── ACCESIBILIDAD: MODO SILLA DE RUEDAS ───
   El interruptor vive al final del rail de categorías, anclado abajo: es
   el único control que tiene que estar al alcance ANTES de activar el
   modo, así que no puede ir arriba (topbar) ni flotando sobre la pantalla
   (se comía el botón de pagar del checkout). */
const a11yLowered = () => document.body.classList.contains('a11y-lowered');

function bindA11yToggle() {
  const btn = $('btnA11yMode');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const on = document.body.classList.toggle('a11y-lowered');
    btn.classList.toggle('is-on', on);
    btn.setAttribute('aria-pressed', String(on));
    const label = $('a11yLabel');
    if (label) label.textContent = on ? t('a11yRestore') : t('a11yLower');
  });
}

/* ─── ENTREGA: RECOGER EN MOSTRADOR O SERVIR EN MESA ───
   Igual que en McDonald's: si el cliente come en el local, después de pagar
   elige si lo recoge él o se lo llevamos, y en ese caso teclea el número
   del cartelito que coge junto al kiosco. */
const TABLE_NUM_MAX = 99;
let serviceDone = null;
let serviceTimer = null;

function bindServiceDialog() {
  $('btnServicePickup').addEventListener('click', () => finishService('pickup'));
  $('btnServiceTable').addEventListener('click', showTableStep);
  $('btnServiceBack').addEventListener('click', renderServiceDialog);
  $('btnServiceConfirm').addEventListener('click', () => {
    if (validTableNumber()) finishService('table');
  });
}

function validTableNumber() {
  return Number.isInteger(state.tableNumber) && state.tableNumber >= 1 && state.tableNumber <= TABLE_NUM_MAX;
}

function askServiceMode(done) {
  // Para llevar no hay nada que preguntar: siempre se recoge.
  if (state.dining !== 'here') {
    state.service = 'pickup';
    state.tableNumber = null;
    done();
    return;
  }
  serviceDone = done;
  state.service = null;
  state.tableNumber = null;
  // El diálogo de pago ya no pinta nada: se cierra para no verse detrás
  // (lo reabre _showSuccessScreen con el resguardo del pedido).
  safeClose($('checkoutDialog'));
  renderServiceDialog();
  safeModal($('serviceDialog'));

  /* Un kiosco no puede quedarse esperando indefinidamente con un pedido ya
     cobrado sin mandar: si el cliente se va sin tocar nada, sale como
     recogida en mostrador y el pedido llega igualmente a cocina. */
  clearTimeout(serviceTimer);
  serviceTimer = setTimeout(() => finishService('pickup'), 30000);
}

function renderServiceDialog() {
  $('svTitleEl').textContent   = t('serviceTitle');
  $('svSubEl').textContent     = t('serviceSub');
  $('svPickupLabel').textContent = t('servicePickup');
  $('svPickupHint').textContent  = t('servicePickupHint');
  $('svTableLabel').textContent  = t('serviceTable');
  $('svTableHint').textContent   = t('serviceTableHint');
  $('svChoiceStep').hidden = false;
  $('svTableStep').hidden  = true;
  $('svFooter').hidden     = true;
}

function showTableStep() {
  $('svChoiceStep').hidden = true;
  $('svTableStep').hidden  = false;
  $('svFooter').hidden     = false;
  $('svTableAsk').textContent = t('serviceTableAsk');
  $('btnServiceBack').textContent = t('quizBack');
  renderKeypad();
  updateTableNum();
  $('serviceDialog').scrollTop = 0;
}

function renderKeypad() {
  const keys = ['1','2','3','4','5','6','7','8','9','', '0','⌫'];
  $('svKeypad').innerHTML = keys.map(k => k
    ? `<button class="keypad-key${k === '⌫' ? ' keypad-del' : ''}" data-key="${k}" type="button">${k}</button>`
    : '<span></span>').join('');
  $('svKeypad').querySelectorAll('[data-key]').forEach(btn => {
    btn.addEventListener('click', () => pressTableKey(btn.dataset.key));
  });
}

function pressTableKey(key) {
  const current = state.tableNumber == null ? '' : String(state.tableNumber);
  const next = key === '⌫'
    ? current.slice(0, -1)
    : (current + key).replace(/^0+/, '').slice(0, String(TABLE_NUM_MAX).length);
  state.tableNumber = next ? parseInt(next, 10) : null;
  updateTableNum();
}

function updateTableNum() {
  $('svTableNum').textContent = state.tableNumber ?? '--';
  const ok = validTableNumber();
  $('btnServiceConfirm').disabled = !ok;
  $('btnServiceConfirm').textContent = ok
    ? `${t('serviceConfirm')} ${state.tableNumber}`
    : t('serviceConfirmHint');
}

function finishService(mode) {
  clearTimeout(serviceTimer);
  state.service = mode;
  if (mode !== 'table') state.tableNumber = null;
  safeClose($('serviceDialog'));
  const done = serviceDone;
  serviceDone = null;
  if (done) done();
}

function startApp(isGuest) {
  state.isGuest = isGuest;
  const w = $('welcome');
  if (!w) return;
  w.classList.add('out');
  $('app').hidden = false;
  if (isGuest) {
    $('pointsDisplay').classList.add('hidden');
    $('dailyChallenge').hidden = true;
  } else {
    $('pointsDisplay').classList.remove('hidden');
    $('dailyChallenge').hidden = false;
    showToast(t('toastWelcome')(state.userName));
  }
  setTimeout(() => w.remove(), 450);
}

/* ─── SLIDER BIENVENIDA (coverflow) ─── */
function initSlider() {
  const container = $('welcomeSlider');
  const dotsEl = $('wsDots');
  if (!container) return;
  const slides = Array.from(container.querySelectorAll('.ws-slide'));
  const total = slides.length;
  let current = 0;

  // Crear dots
  dotsEl.innerHTML = slides.map((_, i) =>
    `<button class="ws-dot${i === 0 ? ' active' : ''}" data-slide="${i}" type="button" aria-label="Imagen ${i+1}"></button>`
  ).join('');
  dotsEl.querySelectorAll('.ws-dot').forEach(d => {
    d.addEventListener('click', () => goSlide(parseInt(d.dataset.slide, 10)));
  });

  function goSlide(idx) {
    current = ((idx % total) + total) % total;
    positionSlides();
    dotsEl.querySelectorAll('.ws-dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function positionSlides() {
    const W = container.offsetWidth || window.innerWidth;
    slides.forEach((slide, i) => {
      // Distancia desde current (wrap-around)
      let d = i - current;
      if (d > total / 2)  d -= total;
      if (d < -total / 2) d += total;

      const absD = Math.abs(d);
      const scale  = absD === 0 ? 1 : absD === 1 ? 0.82 : 0.6;
      const opacity = absD === 0 ? 1  : absD === 1 ? 1  : absD === 2 ? 0.4 : 0;
      const zIndex  = 10 - absD;

      // Centro de cada slide relativo al centro del contenedor
      // Los laterales se empujan casi hasta el borde de la pantalla (recortados)
      const offset = d * (W * 0.5);

      slide.style.transform  = `translateX(calc(-50% + ${offset}px)) scale(${scale})`;
      slide.style.opacity    = opacity;
      slide.style.zIndex     = zIndex;
      slide.classList.toggle('center', absD === 0);
    });
  }

  // Init position
  positionSlides();

  // Auto-advance
  setInterval(() => goSlide(current + 1), 2600);
}

/* ─── TOPBAR ─── */
function bindTopbar() {
  $('btnBackToWelcome').addEventListener('click', () => location.reload());
  $('btnCartFab').addEventListener('click', openCart);
}

/* ─── CATEGORY NAV ─── */
const CAT_LABEL_KEYS = {
  burgers: 'catBurgers', combos: 'catCombos', sides: 'catSides',
  desserts: 'catDesserts', drinks: 'catDrinks', salads: 'catSalads', kids: 'catKids'
};

/* Si la foto no carga se sustituye por el emoji de siempre, para que la
   categoría nunca se quede sin icono. */
const catIconHtml = c => {
  if (c.imgs) {
    return `<span class="cat-icon-stack">${c.imgs.map(src =>
      `<img src="${src}" alt="" referrerpolicy="no-referrer" onerror="this.remove()">`
    ).join('')}</span>`;
  }
  return c.img
    ? `<img class="cat-icon-img" src="${c.img}" alt="" referrerpolicy="no-referrer"
            onerror="this.replaceWith(document.createTextNode('${c.icon}'))">`
    : c.icon;
};

/* Silla de ruedas dibujada en vez del emoji ♿: el emoji se ve distinto en
   cada sistema y no sigue el color del botón, que aquí cambia al activarse.
   Con currentColor el icono se enciende junto con el resto del botón. */
const A11Y_ICON_SVG = `
  <svg class="cat-nav-a11y-icon" viewBox="0 0 48 48" aria-hidden="true" fill="none"
       stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="19" cy="7.5" r="4.5" fill="currentColor" stroke="none"/>
    <path d="M18 15v10h10l5 10h7"/>
    <circle cx="21" cy="31" r="11.5"/>
  </svg>`;

function renderCatNav() {
  $('catNav').innerHTML = CATEGORIES.map(c => `
    <button class="cat-tab ${c.id === state.cat ? 'active' : ''}" data-cat="${c.id}" type="button">
      <span class="cat-icon">${catIconHtml(c)}</span>
      <span>${t(CAT_LABEL_KEYS[c.id]) || c.label}</span>
    </button>
  `).join('') + `
    <button class="cat-nav-ai" id="btnAI" type="button" aria-label="${t('aiBtnLabel')}">
      <span class="cat-nav-ai-sparkle">✨</span>
      <span>${t('aiBtnLabel')}</span>
    </button>
    <button class="cat-tab cat-nav-a11y ${a11yLowered() ? 'is-on' : ''}" id="btnA11yMode" type="button"
            aria-pressed="${a11yLowered()}"
            aria-label="Modo silla de ruedas: bajar el menú a la parte alcanzable de la pantalla">
      ${A11Y_ICON_SVG}
      <span id="a11yLabel">${a11yLowered() ? t('a11yRestore') : t('a11yLower')}</span>
    </button>
  `;
  $('catNav').querySelectorAll('[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.cat = btn.dataset.cat;
      // If in quiz view, switch back to catalog without resetting quiz state
      if ($('viewQuiz').classList.contains('active')) {
        $('viewQuiz').classList.remove('active');
        $('viewCatalog').classList.add('active');
      }
      renderCatNav();
      renderProducts();
      triggerUpsell();
    });
  });
  $('btnAI').addEventListener('click', openQuiz);
  // El rail se repinta al cambiar de categoría o de idioma, así que el
  // botón se vuelve a enlazar aquí (igual que el de "Sorpréndeme").
  bindA11yToggle();
}

/* ─── PRODUCTS ─── */
function renderProducts() {
  const items = PRODUCTS.filter(p => p.cat === state.cat);
  if (!items.length) {
    $('productGrid').innerHTML = `<div class="empty-state"><div class="empty-state-icon">🍔</div><p>${t('comingSoon')}</p></div>`;
    return;
  }
  $('productGrid').innerHTML = items.map(productCard).join('');
  $('productGrid').querySelectorAll('[data-product]').forEach(card => {
    card.addEventListener('click', () => openProduct(card.dataset.product));
  });
}

function productCard(p) {
  const starImg = '<img src="./estrella.png" alt="" class="pc-star" aria-hidden="true">';
  const stars = starImg.repeat(p.stars)
    + (p.stars < 5 ? `<span class="pc-star-off">${starImg.repeat(5 - p.stars)}</span>` : '');
  const badgeHtml = p.badge ? `<div class="pc-badge ${p.badgeStyle || ''}">${p.badge}</div>` : '';
  const imgHtml = p.isMystery
    ? `<img referrerpolicy="no-referrer" src="https://carlsjr.es/wp-content/uploads/2023/03/Western-Bacon-Cheeseburger.png" alt="Sorpresa" class="mystery-card-img"><div class="mystery-card-q">?</div>`
    : p.img
      ? `<img referrerpolicy="no-referrer" src="${p.img}" alt="${pName(p)}" loading="lazy" onerror="this.parentElement.innerHTML='<span class=pc-emoji>🍔</span>'">`
      : `<span class="pc-emoji">🍔</span>`;
  return `
    <article class="product-card" data-product="${p.id}" role="button" tabindex="0" aria-label="${pName(p)}, ${EUR.format(p.price)}">
      ${badgeHtml}
      <div class="pc-img pc-cat-${p.cat}">${imgHtml}</div>
      <div class="pc-podium"><div class="pc-podium-stars">${stars}</div></div>
      <div class="pc-body">
        <div class="pc-name">${pName(p)}</div>
        <div class="pc-desc">${pDesc(p)}</div>
        <div class="pc-footer">
          <span class="pc-price">${EUR.format(p.price)}</span>
          <button class="pc-add" type="button" aria-label="Añadir ${pName(p)}">+</button>
        </div>
      </div>
    </article>
  `;
}

/* ─── PRODUCT DIALOG ─── */
let dialogQty = 1;
let dialogMods = [];
let dialogProduct = null;

function bindProductDialog() {
  $('pdClose').addEventListener('click', () => safeClose($('productDialog')));
  $('productDialog').addEventListener('click', e => { if (e.target === $('productDialog')) safeClose($('productDialog')); });
}

function openDrinkPicker(p) {
  const isCoffee = p.id === 'cafe-te';
  const opts = isCoffee ? COFFEE_OPTIONS : DRINKS_OPTIONS.filter(d => d.id !== 'none');
  dialogProduct = p; dialogQty = 1; dialogMods = [];
  renderProductDialog(p);

  // Inject variant selector before the footer.
  // Se usan las imágenes reales de cada vaso en vez de emojis de colores,
  // que se veían genéricos y poco legibles.
  const variantHtml = opts.map(o => `
    <button class="combo-opt pick-variant" data-variant="${o.id}" type="button">
      ${o.img
        ? `<img src="${o.img}" alt="" style="width:48px;height:48px;object-fit:contain;object-position:center;display:block;flex-shrink:0;" onerror="this.outerHTML='<span class=combo-opt-icon>${o.icon}</span>'">`
        : `<span class="combo-opt-icon">${o.icon}</span>`}
      <div><div class="combo-opt-label">${o.label}</div></div>
    </button>`).join('');
  const extraSec = document.createElement('div');
  extraSec.className = 'combo-section pd-variant-section';
  extraSec.innerHTML = `<h3>${isCoffee ? '☕ ¿Qué tipo?' : '🥤 ¿Qué bebida?'} <span class="combo-required">*</span></h3><div class="combo-options">${variantHtml}</div>`;
  const footer = $('pdContent').querySelector('.pd-footer');
  $('pdContent').insertBefore(extraSec, footer);

  const addBtn = $('btnAddCart');
  let chosenVariant = null;
  addBtn.disabled = true;
  addBtn.textContent = isCoffee ? '☕ Elige el tipo' : '🥤 Elige la bebida';

  extraSec.querySelectorAll('.pick-variant').forEach(btn => {
    btn.addEventListener('click', () => {
      chosenVariant = btn.dataset.variant;
      extraSec.querySelectorAll('.pick-variant').forEach(b => b.classList.toggle('selected', b.dataset.variant === chosenVariant));
      addBtn.disabled = false;
      addBtn.textContent = `${t('addToCart')} · ${EUR.format(p.price)}`;
    });
  });

  addBtn.onclick = () => {
    if (!chosenVariant) return;
    const label = (isCoffee ? COFFEE_OPTIONS : DRINKS_OPTIONS).find(o => o.id === chosenVariant)?.label || chosenVariant;
    addToCart(p, [], dialogQty, label);
    safeClose($('productDialog'));
  };
  safeModal($('productDialog'));
}

function openProduct(id) {
  const p = productById(id);
  if (!p) return;
  if (p.isMystery) { openMysteryConfigurator(p); return; }
  if (p.cat === 'drinks') { openDrinkPicker(p); return; }
  if (p.cat === 'combos' || p.cat === 'kids') { openComboConfigurator(p, 'combo'); return; }
  if (p.cat === 'burgers') { openBurgerTypeDialog(p); return; }
  if (p.cat === 'salads') { openComboConfigurator(p, 'solo'); return; }
  dialogProduct = p;
  dialogQty = 1;
  dialogMods = [];
  renderProductDialog(p);
  safeModal($('productDialog'));
  // Scroll dialog to top
  setTimeout(() => $('productDialog').scrollTop = 0, 10);
}

/* ─── INDIVIDUAL / EN COMBO (hamburguesas) ─── */
let burgerTypeProduct = null;

function bindBurgerTypeDialog() {
  $('btClose').addEventListener('click', () => safeClose($('burgerTypeDialog')));
  $('burgerTypeDialog').addEventListener('click', e => { if (e.target === $('burgerTypeDialog')) safeClose($('burgerTypeDialog')); });
  $('btnBurgerSolo').addEventListener('click', () => {
    safeClose($('burgerTypeDialog'));
    openComboConfigurator(burgerTypeProduct, 'solo');
  });
  $('btnBurgerCombo').addEventListener('click', () => {
    safeClose($('burgerTypeDialog'));
    openComboConfigurator(burgerTypeProduct, 'burgercombo');
  });
}

function renderBurgerTypeDialog(p) {
  $('btTitleEl').textContent = t('burgerTypeTitle');
  $('btSubEl').textContent = t('burgerTypeSub');
  $('btSoloLabel').textContent = t('burgerSolo');
  $('btComboLabel').textContent = t('burgerCombo');
  $('btSoloPrice').textContent = EUR.format(p.price);
  $('btComboPrice').textContent = `${EUR.format(p.price + BURGER_COMBO_SURCHARGE)} · ${t('burgerComboHint')}`;

  /* En vez de dos emojis genéricos, cada opción enseña lo que se lleva de
     verdad: la hamburguesa que acaba de elegir, y esa misma con las patatas
     y el refresco. Así la diferencia de precio se entiende sin leer. */
  const foto = (src, alt, extraClass = '') =>
    `<img class="choice-photo ${extraClass}" src="${src}" alt="${alt}" referrerpolicy="no-referrer" onerror="this.remove()">`;

  $('btSoloIcon').innerHTML = p.img ? foto(p.img, pName(p)) : '🍔';
  $('btComboIcon').innerHTML = `
    <span class="choice-stack">
      ${p.img ? foto(p.img, pName(p), 'choice-stack-main') : ''}
      ${foto('./iconos/ic-papas.png', '', 'choice-stack-side')}
      ${foto('./iconos/ic-cocacola.png', '', 'choice-stack-side')}
    </span>`;
}

function openBurgerTypeDialog(product) {
  burgerTypeProduct = product;
  renderBurgerTypeDialog(product);
  safeModal($('burgerTypeDialog'));
}

function renderProductDialog(p) {
  const mods = MODIFIERS.filter(m => p.mods.includes(m.id));
  const extras = mods.filter(m => m.price > 0);
  const frees = mods.filter(m => m.price === 0);

  $('pdContent').innerHTML = `
    <div class="pd-hero">
      ${p.img ? `<img referrerpolicy="no-referrer" src="${p.img}" alt="${pName(p)}" onerror="this.style.display='none'">` : `<span style="font-size:5rem">🍔</span>`}
    </div>
    <div class="pd-body">
      <div class="pd-category">${t(CAT_LABEL_KEYS[p.cat]) || p.cat}</div>
      <h2 class="pd-name" id="pdTitle">${pName(p)}</h2>
      <p class="pd-desc">${pDesc(p)}</p>
      <div class="pd-tags">${p.tags.map(tag => `<span class="pd-tag">${tag}</span>`).join('')}</div>
      ${extras.length ? `
        <div class="pd-modifiers">
          <h3>${t('extrasOptional')}</h3>
          <div class="pd-mod-grid">
            ${extras.map(m => `
              <button class="pd-mod-btn" data-mod="${m.id}" type="button">
                ${modLabel(m)}<small>+${EUR.format(m.price)}</small>
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}
      ${frees.length ? `
        <div class="pd-modifiers">
          <h3>${t('customization')}</h3>
          <div class="pd-mod-grid">
            ${frees.map(m => `
              <button class="pd-mod-btn" data-mod="${m.id}" type="button">
                ${modLabel(m)}
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}
      <div class="pd-qty-row">
        <span class="pd-qty-label">${t('quantity')}</span>
        <div class="pd-qty-ctrl">
          <button class="pd-qty-btn" id="pdQtyMinus" type="button">−</button>
          <span class="pd-qty-val" id="pdQtyVal">1</span>
          <button class="pd-qty-btn" id="pdQtyPlus" type="button">+</button>
        </div>
      </div>
    </div>
    <div class="pd-footer">
      <button class="btn-add-cart" id="btnAddCart" type="button">${t('addItem')} — ${EUR.format(p.price)}</button>
    </div>
  `;

  // Modifier toggles
  $('pdContent').querySelectorAll('[data-mod]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.mod;
      if (dialogMods.includes(id)) {
        dialogMods = dialogMods.filter(m => m !== id);
        btn.classList.remove('active');
      } else {
        dialogMods.push(id);
        btn.classList.add('active');
      }
      updateDialogTotal();
    });
  });

  // Qty
  $('pdQtyMinus').addEventListener('click', () => { if (dialogQty > 1) { dialogQty--; updateDialogTotal(); } });
  $('pdQtyPlus').addEventListener('click', () => { if (dialogQty < 9) { dialogQty++; updateDialogTotal(); } });

  $('btnAddCart').addEventListener('click', () => {
    addToCart(dialogProduct, dialogMods, dialogQty);
    safeClose($('productDialog'));
    dialogProduct = null;
  });
}

function updateDialogTotal() {
  if (!dialogProduct) return;
  const total = (dialogProduct.price + modTotal(dialogMods)) * dialogQty;
  $('pdQtyVal').textContent = dialogQty;
  $('btnAddCart').textContent = `${t('addItem')} — ${EUR.format(round(total))}`;
}

/* ─── CART ─── */
function bindCart() {
  $('btnCloseCart').addEventListener('click', closeCart);
  $('cartOverlay').addEventListener('click', closeCart);
}

function openCart() {
  $('cartPanel').classList.add('open');
  $('cartPanel').setAttribute('aria-hidden', 'false');
  $('cartOverlay').hidden = false;
  renderCartUpsell();
}

function closeCart() {
  $('cartPanel').classList.remove('open');
  $('cartPanel').setAttribute('aria-hidden', 'true');
  $('cartOverlay').hidden = true;
}

/* `extras` es el recargo de bebida/acompañamiento/postre elegidos en el
   configurador. Sin él, el carrito cobraba solo el precio base del producto
   aunque el modal hubiese mostrado un total mayor. */
function addToCart(product, mods = [], qty = 1, note = '', extras = 0, isCombo = false) {
  const modsSig = [...mods].sort().join(',');
  /* isCombo entra en la comparación: la misma burger suelta con bebida y
     patatas a la carta genera la misma nota que en combo, pero no cuesta
     lo mismo, así que no pueden fundirse en una sola línea. */
  const existing = state.cart.find(i =>
    i.productId === product.id &&
    [...i.mods].sort().join(',') === modsSig &&
    i.note === note &&
    !!i.isCombo === !!isCombo
  );
  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({
      key: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      img: product.img,
      unitPrice: product.price,
      extras,
      mods,
      qty,
      note,
      isCombo
    });
  }
  renderCart();
  triggerUpsell();
  showToast(t('toastAdded')(isCombo ? t('comboItemName')(pName(product)) : pName(product)));
  launchConfetti();

  // Reto del día: si añaden Crisscuts
  if (product.id === 'crisscuts' && !state.dcDone) {
    state.dcDone = true;
    addPoints(50);
    showToast(t('toastDcDone'));
    animateDcBar(100);
  }
}

function removeFromCart(key) {
  state.cart = state.cart.filter(i => i.key !== key);
  renderCart();
  triggerUpsell();
}

function changeQty(key, delta) {
  const item = state.cart.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  renderCart();
}

function cartLineTotal(item) {
  return round((item.unitPrice + modTotal(item.mods) + (item.extras || 0)) * item.qty);
}

function cartSummary() {
  const subtotal = round(state.cart.reduce((s, i) => s + cartLineTotal(i), 0));
  const tax = round(subtotal * 0.10);
  const total = round(subtotal + tax);
  return { subtotal, tax, total };
}

function renderCart() {
  const itemCount = state.cart.reduce((s, i) => s + i.qty, 0);

  // Badges (FAB)
  const badge = $('cartBadge');
  if (badge) { badge.hidden = itemCount === 0; badge.textContent = itemCount; }
  const fabBadge = $('fabCartBadge');
  fabBadge.hidden = itemCount === 0;
  fabBadge.textContent = itemCount;
  const fab = $('btnCartFab');
  fab.classList.toggle('has-items', itemCount > 0);

  // Items
  // Update static cart labels
  if ($('cartTitleEl')) $('cartTitleEl').textContent = t('cartTitle');
  if ($('fabCartText')) $('fabCartText').textContent = t('fabCart');
  if ($('payBtnLabel')) $('payBtnLabel').textContent = t('payBtn');

  $('cartItems').innerHTML = state.cart.length ? state.cart.map(item => {
    const itemName = cartItemName(item);
    const labels = item.mods.map(id => { const m = MODIFIERS.find(m => m.id === id); return m ? modLabel(m) : null; }).filter(Boolean);
    return `
      <div class="cart-line">
        ${item.img
          ? `<img referrerpolicy="no-referrer" class="cl-img" src="${item.img}" alt="${itemName}" onerror="this.className='cl-emoji';this.outerHTML='<div class=cl-emoji>🍔</div>'">`
          : `<div class="cl-emoji">🍔</div>`}
        <div class="cl-body">
          <div class="cl-name">${itemName}</div>
          <div class="cl-mods">${[labels.join(', ') || t('noChanges'), item.note].filter(Boolean).join(' · ')}</div>
          <div class="cl-qty">
            <button class="cl-qty-btn minus" data-qty-key="${item.key}" data-delta="-1" type="button">−</button>
            <span class="cl-qty-val">${item.qty}</span>
            <button class="cl-qty-btn" data-qty-key="${item.key}" data-delta="1" type="button">+</button>
            <button class="cl-qty-btn minus" style="margin-left:auto" data-remove="${item.key}" type="button" aria-label="Eliminar">🗑</button>
          </div>
        </div>
        <div class="cl-price">${EUR.format(cartLineTotal(item))}</div>
      </div>
    `;
  }).join('') : `
    <div class="cart-empty">
      <div class="cart-empty-icon">🛒</div>
      <p>${t('cartEmpty').replace('\n', '<br>')}</p>
    </div>
  `;

  // Events
  $('cartItems').querySelectorAll('[data-qty-key]').forEach(btn => {
    btn.addEventListener('click', () => changeQty(btn.dataset.qtyKey, parseInt(btn.dataset.delta, 10)));
  });
  $('cartItems').querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.remove));
  });

  // Totals
  const { subtotal, tax, total } = cartSummary();
  $('cartTotals').innerHTML = `
    <div class="ct-row"><span>${t('subtotal')}</span><span>${EUR.format(subtotal)}</span></div>
    <div class="ct-row"><span>${t('tax')}</span><span>${EUR.format(tax)}</span></div>
    <div class="ct-row total"><span>${t('total')}</span><span>${EUR.format(total)}</span></div>
  `;
  $('checkoutTotal').textContent = EUR.format(total);
  $('btnCheckout').disabled = state.cart.length === 0;
}

/* ─── CART UPSELL ─── */
function renderCartUpsell() {
  if (!state.cart.length) { $('cartUpsell').hidden = true; return; }

  const inCart = new Set(state.cart.map(i => i.productId));

  // Suggest items not in cart that complement what's there
  const suggestions = [];
  if (!inCart.has('crisscuts') && !inCart.has('fries') && !inCart.has('nuggets')) {
    suggestions.push(productById('crisscuts'));
  }
  if (!inCart.has('refrescos') && !inCart.has('cafe-te')) {
    suggestions.push(productById('refrescos'));
  }
  if (!inCart.has('shake-oreo') && !inCart.has('twist-oreo') && !inCart.has('shake-chocolate') && !inCart.has('shake-fresa')) {
    suggestions.push(productById('shake-oreo'));
  }

  const toShow = suggestions.filter(Boolean).slice(0, 2);
  if (!toShow.length) { $('cartUpsell').hidden = true; return; }

  $('cartUpsell').hidden = false;
  $('cartUpsell').innerHTML = `
    <div class="cu-title">${t('completeYourOrder')}</div>
    <div class="cu-items">
      ${toShow.map(p => `
        <div class="cu-item" data-upsell-add="${p.id}" role="button" tabindex="0">
          <img referrerpolicy="no-referrer" src="${p.img}" alt="${pName(p)}" onerror="this.style.display='none'">
          <div class="cu-item-body">
            <div class="cu-item-name">${pName(p)}</div>
            <div class="cu-item-price">${EUR.format(p.price)}</div>
          </div>
          <span class="cu-item-add">+</span>
        </div>
      `).join('')}
    </div>
  `;
  $('cartUpsell').querySelectorAll('[data-upsell-add]').forEach(el => {
    el.addEventListener('click', () => {
      addToCart(productById(el.dataset.upsellAdd));
      renderCartUpsell();
    });
  });
}

/* ─── UPSELL BANNER (en catálogo) ─── */
function triggerUpsell() {
  if (!state.cart.length) { $('upsellBanner').hidden = true; return; }
  const rule = UPSELL_RULES.find(r => r.triggerCat === state.cat && !state.cart.find(i => i.productId === r.offerProduct));
  if (!rule) { $('upsellBanner').hidden = true; return; }
  const product = productById(rule.offerProduct);
  if (!product) { $('upsellBanner').hidden = true; return; }
  $('upsellTitle').textContent = t(rule.msgKey);
  $('upsellDesc').textContent = `${t(rule.descKey)} — ${EUR.format(product.price)}`;
  $('upsellBtn').textContent = t('upsellAdd')(pName(product));
  $('upsellBanner').hidden = false;
  $('upsellBtn').onclick = () => { addToCart(product); $('upsellBanner').hidden = true; };
}

/* ─── DAILY CHALLENGE ─── */
function bindDailyChallenge() {
  $('dailyChallenge').addEventListener('click', () => {
    if (state.dcDone) { showToast(t('toastDcRepeat')); return; }
    const crisscuts = productById('crisscuts');
    if (crisscuts) {
      addToCart(crisscuts, [], 1);
      // addToCart already handles dcDone + points + toast
    }
  });
}

/* ─── QUIZ IA ─── */
function bindQuiz() {
  $('btnQuizBack').addEventListener('click', () => {
    $('viewQuiz').classList.remove('active');
    $('viewCatalog').classList.add('active');
  });
  $('btnQuizBack').textContent = t('quizBack');
}

function openQuiz() {
  const quiz = getQuiz();
  const inProgress = state.quizStep > 0 && state.quizStep < quiz.length;
  if (!inProgress) {
    state.quizStep = 0;
    state.quizAnswers = {};
    $('quizResults').innerHTML = '';
  }
  $('viewCatalog').classList.remove('active');
  $('viewQuiz').classList.add('active');
  renderQuizStep();
}

function getQuiz() {
  return [
    { id: 'protein', q: t('q1'), opts: [
      { id: 'beef', icon: '🥩', img: './iconos/ic-carne.png', label: t('q1o1') },
      { id: 'chicken', icon: '🍗', img: './iconos/ic-pollo.png', label: t('q1o2') },
      { id: 'plant', icon: '🌱', img: './iconos/ic-lechuga.png', label: t('q1o3') }
    ]},
    { id: 'hunger', q: t('q2'), opts: [
      { id: 'low', icon: '🙂', label: t('q2o1') },
      { id: 'medium', icon: '😋', label: t('q2o2') },
      { id: 'high', icon: '🔥', label: t('q2o3') }
    ]},
    { id: 'style', q: t('q3'), opts: [
      { id: 'classic', icon: '⭐', label: t('q3o1') },
      { id: 'bacon', icon: '🥓', label: t('q3o2') },
      { id: 'premium', icon: '👑', label: t('q3o3') }
    ]},
    { id: 'budget', q: t('q4'), opts: [
      { id: 'solo', icon: '🍔', label: t('q4o1') },
      { id: 'combo', icon: '🍟', label: t('q4o2') },
      { id: 'full', icon: '🎉', label: t('q4o3') }
    ]},
    { id: 'sweet', q: t('q5'), opts: [
      { id: 'shake', icon: '🥛', img: './iconos/ic-batido.png', label: t('q5o1') },
      { id: 'ice', icon: '🍦', img: './iconos/ic-helado.png', label: t('q5o2') },
      { id: 'none', icon: '🚫', img: './iconos/ic-sin.svg', label: t('q5o3') }
    ]}
  ];
}

function renderQuizStep() {
  const quiz = getQuiz();
  const step = quiz[state.quizStep];
  if (!step) { renderQuizThinking(); return; }

  const pct = ((state.quizStep + 1) / quiz.length) * 100;
  $('quizBar').style.width = pct + '%';
  $('quizStep').textContent = `${state.quizStep + 1} / ${quiz.length}`;

  $('quizContent').innerHTML = `
    <p class="quiz-q-eyebrow">${t('quizQuestion')(state.quizStep + 1, quiz.length)}</p>
    <h2 class="quiz-q-title">${step.q}</h2>
    <div class="quiz-options">
      ${step.opts.map(o => `
        <button class="quiz-option" data-answer="${o.id}" type="button">
          ${o.img
            ? `<img class="quiz-option-img" src="${o.img}" alt="" onerror="this.outerHTML='<span class=quiz-option-icon>${o.icon}</span>'">`
            : `<span class="quiz-option-icon">${o.icon}</span>`}
          <span class="quiz-option-label">${o.label}</span>
        </button>
      `).join('')}
    </div>
  `;

  $('quizContent').querySelectorAll('[data-answer]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.add('selected');
      state.quizAnswers[step.id] = btn.dataset.answer;
      state.quizStep++;
      setTimeout(renderQuizStep, 280);
    });
  });
}

function renderQuizThinking() {
  $('quizBar').style.width = '100%';
  $('quizContent').innerHTML = `
    <div class="quiz-thinking">
      <span class="quiz-thinking-anim">✨</span>
      <h3>${t('quizThinking')}</h3>
    </div>
  `;
  setTimeout(renderQuizResults, 1400);
}

function renderQuizResults() {
  const a = state.quizAnswers;

  // Score products — exclude sides, drinks, mystery
  const scored = PRODUCTS
    .filter(p => !['sides','drinks'].includes(p.cat) && !p.isMystery)
    .map(p => {
      let score = 0;

      // Protein match (strict for plant)
      if (p.protein === a.protein) score += 8;
      else if (a.protein === 'plant') score -= 20;

      // Hunger match
      if (p.hunger === a.hunger) score += 5;
      else if (a.hunger === 'high' && p.hunger === 'medium') score += 2;
      else if (a.hunger === 'low'  && p.hunger === 'medium') score += 1;

      // Style match using tags
      if (a.style === 'bacon') {
        if (p.tags.some(tag => /bacon|bbq/i.test(tag))) score += 6;
      }
      if (a.style === 'premium') {
        if (p.tags.some(tag => /angus|premium|gourmet|trufa/i.test(tag))) score += 6;
        if (p.price >= 10.5) score += 2;
      }
      if (a.style === 'classic') {
        if (p.tags.some(tag => /cl[aá]sic|iconic|star/i.test(tag))) score += 4;
        if (p.cat === 'burgers' && p.price < 10) score += 2;
      }

      // Format match
      if ((a.budget === 'combo' || a.budget === 'full') && (p.combo || p.cat === 'combos')) score += 7;
      if (a.budget === 'solo'  && !p.combo && p.cat === 'burgers') score += 5;
      if (a.budget === 'full'  && p.cat === 'combos') score += 3;

      // Slight boost for stars
      score += (p.stars || 3) * 0.4;

      return { p, score };
    })
    .sort((x, y) => y.score - x.score);

  const top2 = scored.slice(0, 2).map(s => s.p);
  const mystery = productById('mystery-carls');

  // Extras based on sweet preference and format
  const extras = [];
  if (a.sweet === 'shake') extras.push(productById('shake-oreo'));
  if (a.sweet === 'ice')   extras.push(productById('twist-oreo'));
  if ((a.budget === 'combo' || a.budget === 'full') && !top2[0]?.combo) {
    extras.push(productById('crisscuts'), productById('refrescos'));
  }

  $('quizContent').innerHTML = `
    <p class="quiz-q-eyebrow">${t('quizEyebrow')}</p>
    <h2 class="quiz-q-title">${t('quizSubtitle')}</h2>
  `;

  const uniq = [...new Set(extras.filter(Boolean))];
  $('quizResults').innerHTML = `
    <div class="qr-cards">
      ${top2.map((p, i) => qrCard(p, i === 0)).join('')}
      ${mystery ? qrMysteryCard(mystery) : ''}
      ${uniq.slice(0, 1).map(p => qrCard(p, false, t('quizAlso'))).join('')}
    </div>
    <div class="qr-actions">
      <button class="btn-qr-checkout" id="btnQuizCheckout" type="button">${t('quizCheckout')}</button>
      <button class="btn-qr-continue" id="btnQuizContinue" type="button">${t('quizContinue')}</button>
      <button class="qr-restart" id="btnQuizRestart" type="button">${t('quizRestart')}</button>
    </div>
  `;

  $('quizResults').querySelectorAll('[data-qr-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = productById(btn.dataset.qrAdd);
      if (!p) return;
      if (p.isMystery) {
        openMysteryConfigurator(p);
      } else if (p.combo || p.cat === 'combos') {
        openComboConfigurator(p);
      } else {
        openProduct(p.id);
      }
    });
  });
  $('btnQuizCheckout').addEventListener('click', () => {
    $('viewQuiz').classList.remove('active');
    $('viewCatalog').classList.add('active');
    openCart();
  });
  $('btnQuizContinue').addEventListener('click', () => {
    $('viewQuiz').classList.remove('active');
    $('viewCatalog').classList.add('active');
  });
  $('btnQuizRestart').addEventListener('click', () => {
    state.quizStep = 0;
    state.quizAnswers = {};
    $('quizResults').innerHTML = '';
    renderQuizStep();
  });
}

function qrMysteryCard(p) {
  return `
    <div class="qr-card qr-card-mystery">
      <div class="qr-mystery-visual">🎲</div>
      <div class="qr-card-body">
        <div class="qr-card-label">${t('mysteryLabel')}</div>
        <h4>${pName(p)}</h4>
        <p>${pDesc(p)}</p>
        <div class="qr-card-price">${EUR.format(p.price)}</div>
      </div>
      <button class="qr-add qr-add-mystery" data-qr-add="${p.id}" type="button">${t('mysteryAdd')}</button>
    </div>
  `;
}

function qrCard(p, isTop, customLabel = null) {
  const label = customLabel || (isTop ? t('quizTop') : t('quizAlso'));
  return `
    <div class="qr-card ${isTop ? 'top' : ''}">
      <img referrerpolicy="no-referrer" src="${p.img}" alt="${pName(p)}" onerror="this.style.display='none'">
      <div class="qr-card-body">
        <div class="qr-card-label">${label}</div>
        <h4>${pName(p)}</h4>
        <p>${pDesc(p).substring(0, 60)}...</p>
        <div class="qr-card-price">${EUR.format(p.price)}</div>
      </div>
      <button class="qr-add" data-qr-add="${p.id}" type="button">${t('addItem')}</button>
    </div>
  `;
}

/* ─── CHECKOUT ─── */
function bindComboDialog() {
  $('comboClose').addEventListener('click', () => safeClose($('comboDialog')));
  $('comboDialog').addEventListener('click', e => { if (e.target === $('comboDialog')) safeClose($('comboDialog')); });
}

function bindCheckout() {
  $('btnCheckout').addEventListener('click', () => {
    renderPaymentGrid();
    $('checkoutPayment').hidden = false;
    $('checkoutSuccess').hidden = true;
    safeModal($('checkoutDialog'));
    $('checkoutDialog').scrollTop = 0;
    closeCart();
  });
  $('btnCancelCheckout').addEventListener('click', () => {
    safeClose($('checkoutDialog'));
    openCart();
  });
  $('btnPay').addEventListener('click', confirmPayment);
  $('btnNewOrder').addEventListener('click', () => {
    clearInterval(activeCountdownTimer);
    location.reload();
  });
}

const PAY_LABEL_KEYS = {
  card: 'payCard', contactless: 'payContactless', apple: 'payApple',
  google: 'payGoogle', cash: 'payCash', qr: 'payQR'
};

function renderPaymentGrid() {
  if ($('howPayTitle')) $('howPayTitle').textContent = t('howPay');
  if ($('confirmPayBtn')) $('confirmPayBtn').textContent = t('confirmPay');
  if ($('backOrderBtn')) $('backOrderBtn').textContent = t('backOrder');
  $('paymentGrid').innerHTML = PAYMENT_METHODS.map(m => {
    const label = t(PAY_LABEL_KEYS[m.id]) || m.label;
    const visual = m.img
      ? `<img class="pay-icon" src="${m.img}" alt="">`
      : `<span class="pay-emoji" aria-hidden="true">${m.icon || ''}</span>`;
    return `
    <button class="pay-method ${state.payment === m.id ? 'selected' : ''}" data-pay="${m.id}" type="button">
      ${visual}
      <span class="pay-label">${label}</span>
    </button>`;
  }).join('');
  $('paymentGrid').querySelectorAll('[data-pay]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.payment = btn.dataset.pay;
      renderPaymentGrid();
    });
  });

  // INC-05: el cobro con tarjeta se hace en el datáfono, así que no se
  // solicitan los datos de la tarjeta en pantalla.
  const stripeWrap = $('stripe-element-wrap');
  if (stripeWrap) stripeWrap.hidden = true;
  if (stripePayEl) { stripePayEl.unmount(); stripePayEl = null; stripeElements = null; }

  const hint = $('payMethodHint');
  if (hint) {
    const hints = {
      card: t('hintCard'), cash: t('hintCash'),
      apple: t('hintWallet'), google: t('hintWallet'),
    };
    const msg = hints[state.payment] || '';
    hint.textContent = msg;
    hint.hidden = !msg;
  }
}

function _mountStripeElement() {
  if (stripePayEl) return; // ya montado
  if (!stripeInstance) {
    if (typeof Stripe === 'undefined') {
      console.warn('[Stripe] Stripe.js no cargado');
      return;
    }
    stripeInstance = Stripe(STRIPE_PUBLIC_KEY);
  }
  const { total } = cartSummary();
  const amountCents = Math.round(total * 100);

  fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'create_intent', amountCents, description: "Carl's Jr — Pedido kiosco" }),
  })
    .then(r => r.json())
    .then(({ clientSecret, error }) => {
      if (error) { console.warn('[Stripe] Worker error:', error); return; }
      stripeElements = stripeInstance.elements({ clientSecret, appearance: {
        theme: 'night',
        variables: { colorPrimary: '#CC0000', colorBackground: '#1a1a1a', fontFamily: 'Inter, sans-serif' },
      }});
      stripePayEl = stripeElements.create('payment', {
        terms: { card: 'never' },
        wallets: { link: 'never', applePay: 'never', googlePay: 'never' },
        fields: { billingDetails: { address: { country: 'never' } } },
      });
      stripePayEl.mount('#stripe-payment-element');
    })
    .catch(e => console.warn('[Stripe] create_intent error:', e));
}

let activeCountdownTimer = null;

function pushOrderToKDS(cartSnapshot, num) {
  try {
    const order = {
      id: num,
      timestamp: Date.now(),
      status: 'pending',
      dining: state.dining,
      service: state.service,
      table: state.service === 'table' ? state.tableNumber : null,
      items: cartSnapshot.map(i => {
        const prod = productById(i.productId);
        const modLabels = i.mods.map(id => {
          const m = MODIFIERS.find(m => m.id === id);
          return m ? modLabel(m) : null;
        }).filter(Boolean);
        return { name: cartItemName(i), qty: i.qty, mods: modLabels, img: prod?.img || null };
      })
    };
    // Se añade sobre la lista real del servidor (transacción), no sobre la
    // copia local: así no reaparecen pedidos ya finalizados en el KDS.
    CJSync.addOrder(order);
  } catch(e) { console.warn('pushOrderToKDS error:', e); }
}

function confirmPayment() {
  if (stripePending) return;
  stripePending = true;
  const btn = $('btnPay');
  if (btn) { btn.disabled = true; btn.textContent = 'Procesando…'; }

  const cartSnapshot = [...state.cart];
  const { total } = cartSummary();
  const pts = Math.round(total * 10);

  // Simulación de pago (tarjeta, Apple Pay, Google Pay) — no depende de
  // que el Worker de Stripe esté disponible para completar el pedido.
  setTimeout(() => {
    stripePending = false;
    if (btn) { btn.disabled = false; btn.textContent = t('confirmPayLabel'); }
    addPoints(pts);
    /* Antes de mandar nada a cocina se pregunta si lo recoge el cliente o
       se lo llevamos a la mesa: el número de mesa tiene que viajar con el
       pedido al KDS y al ticket. */
    askServiceMode(() => {
      CJSync.nextOrderNum(orderNum => {
        pushOrderToKDS(cartSnapshot, orderNum);
        _showSuccessScreen(orderNum, pts, cartSnapshot, total);
      });
    });
  }, 600);
}

function _showSuccessScreen(orderNum, pts, cartSnapshot, total) {
  if ($('orderPlacedTitle')) $('orderPlacedTitle').textContent = t('orderPlaced');
  if ($('newOrderLabel')) $('newOrderLabel').textContent = t('newOrder');

  $('successOrderId').textContent = `#${orderNum}`;
  $('successPointsRow').hidden = state.isGuest;
  if (!state.isGuest) {
    $('successPointsRow').innerHTML = t('pointsEarned')(pts);
  }

  // Resumen del pedido
  const summaryEl = $('orderSummary');
  summaryEl.innerHTML = `
    <div class="os-title">${t('orderSummaryTitle')}</div>
    <div class="os-line os-dining"><span>${t('orderSummaryDining')(state.dining)}</span></div>
    ${state.dining === 'here'
      ? `<div class="os-line os-dining os-service"><span>${state.service === 'table' ? t('summaryTable')(state.tableNumber) : t('summaryPickup')}</span></div>`
      : ''}
    <div class="os-items">
      ${cartSnapshot.map(i => `
        <div class="os-line">
          <span>${cartItemName(i)} ×${i.qty}</span>
          <span>${EUR.format(cartLineTotal(i))}</span>
        </div>
      `).join('')}
      <div class="os-line os-total-line">
        <span>${t('total')}</span>
        <span>${EUR.format(total)}</span>
      </div>
    </div>
  `;

  // Ticket digital
  const box = $('ticketDigitalBox');
  if (!state.isGuest) {
    box.innerHTML = `
      <div class="ticket-registered">
        <strong>📧 Recibir ticket digital</strong>
        <p>Te lo enviamos a <em>${$('loginEmail')?.value || state.userName}</em></p>
        <button class="btn-ticket" id="btnSendTicket" type="button">${t('sendTicket')}</button>
      </div>
    `;
    $('btnSendTicket').addEventListener('click', () => {
      $('btnSendTicket').textContent = t('ticketSent');
      $('btnSendTicket').disabled = true;
      showToast(t('toastTicketSent'));
    });
  } else {
    box.innerHTML = `
      <div class="ticket-guest">
        <p>${t('ticketQuestion')}</p>
        <button class="btn-ticket-register" id="btnTicketRegister" type="button">
          ${t('registerTicket')}
        </button>
      </div>
    `;
    $('btnTicketRegister').addEventListener('click', () => {
      safeModal($('registerDialog'));
    });
  }

// Construir el texto del ticket para la Epson TM-m30II
// usando papel de 80 mm y 48 caracteres por línea.
const receiptDate = new Date().toLocaleString('es-ES', {
  dateStyle: 'short',
  timeStyle: 'short'
});

const rule = '-'.repeat(TICKET_COLUMNS);

const diningLabel = state.dining === 'togo' ? t('ticketDiningToGo') : t('ticketDiningHere');

/* Si se sirve en mesa, el número del cartelito es lo que necesita el
   camarero para encontrar al cliente: va destacado en el ticket. */
const serviceLabel = state.dining !== 'here'
  ? ''
  : state.service === 'table' ? t('ticketTable')(state.tableNumber) : t('ticketPickup');

/* INC-02: si print-helper.js no puede imprimir (ayudante caído, impresora
   no compartida, etc.) el cliente se quedaba con un botón de error y sin
   ticket. Este HTML es la red de seguridad: si falla la impresión
   silenciosa, se imprime igualmente mediante el diálogo del navegador
   (ver printReceipt más abajo), para que el ticket salga de una forma u
   otra. No lleva los códigos ESC/POS (no significan nada en HTML); el
   grande/negrita se consigue aquí con CSS normal. */
const receiptHtml = `
  <div class="ticket-logo">CARL'S JR</div>
  <div class="ticket-tag">Bigger. Better. Burgers.</div>
  <div class="ticket-date">${receiptDate}</div>
  <div class="ticket-rule"></div>
  <div class="ticket-order">PEDIDO #${orderNum}</div>
  <div class="ticket-tag" style="font-weight:800">${diningLabel}</div>
  ${serviceLabel ? `<div class="ticket-order" style="font-size:18px">${serviceLabel}</div>` : ''}
  <div class="ticket-rule"></div>
  ${cartSnapshot.map(item => {
    const price = EUR.format(cartLineTotal(item));
    return `<div class="ticket-line"><span>${item.qty}× ${cartItemName(item)}</span><span>${price}</span></div>`;
  }).join('')}
  <div class="ticket-rule"></div>
  <div class="ticket-line ticket-total"><span>TOTAL</span><span>${EUR.format(total)}</span></div>
  <div class="ticket-rule"></div>
  ${!state.isGuest ? `<div class="ticket-pts">+${pts} puntos acumulados ⭐</div>` : ''}
  <div class="ticket-thanks">¡Gracias por tu visita!</div>
`;

const receiptLines = [
  PRN_INIT + PRN_ALIGN_CENTER + PRN_SIZE_DOUBLE + "CARL'S JR" + PRN_SIZE_NORMAL,
  centerTicketText('Bigger. Better. Burgers.'),
  centerTicketText(receiptDate),

  PRN_ALIGN_LEFT + rule,
  PRN_ALIGN_CENTER + PRN_SIZE_DOUBLE + `PEDIDO #${orderNum}` + PRN_SIZE_NORMAL,
  PRN_BOLD_ON + centerTicketText(diningLabel) + PRN_BOLD_OFF,
  ...(serviceLabel
    ? [PRN_ALIGN_CENTER + PRN_SIZE_DOUBLE + serviceLabel + PRN_SIZE_NORMAL]
    : []),
  PRN_ALIGN_LEFT + rule,

  ...cartSnapshot.map(item => {
    const price = EUR
      .format(cartLineTotal(item))
      .replace(/\u00A0/g, ' ');

    return ticketRow(`${item.qty}x ${cartItemName(item)}`, price);
  }),

  rule,

  PRN_BOLD_ON + ticketRow(
    'TOTAL',
    EUR.format(total).replace(/\u00A0/g, ' ')
  ) + PRN_BOLD_OFF,

  rule,

  ...(state.isGuest
    ? []
    : [centerTicketText(`+${pts} puntos acumulados`)]),

  '',
  centerTicketText('Gracias por tu visita'),
  ''
];

const receiptText = receiptLines.join('\n');

  /* El ticket NO se imprime solo: únicamente si el cliente pulsa el botón.
     Al pulsarlo, todo pasa en segundo plano sin que el cliente vea nada:
     se guarda el .txt y se manda a imprimir a través del ayudante local
     (print-helper.js), sin ningún diálogo del navegador. Si eso falla,
     el cliente ve un aviso para avisar al personal y puede reintentar,
     pero NUNCA se le abre el diálogo del sistema (ver printTicketSilently). */
  const btnPrint = $('btnPrintTicket');
  if (btnPrint) {
    btnPrint.disabled = false;
    btnPrint.textContent = '🖨️ Imprimir ticket';
    hidePrintProblemNote();
    btnPrint.onclick = () => {
      btnPrint.disabled = true;
      btnPrint.textContent = '🖨️ Imprimiendo…';
      hidePrintProblemNote();
      // La recarga automática no puede pillar la impresión a medias.
      stopSuccessCountdown();
      printTicketSilently(orderNum, receiptText, receiptHtml);
    };
  }

  $('checkoutPayment').hidden = true;
  $('checkoutSuccess').hidden = false;
  // Si se cerró para preguntar por la entrega en mesa, vuelve a abrirse ya
  // con el resguardo montado, sin que se vea el paso de pago.
  if (!$('checkoutDialog').open) safeModal($('checkoutDialog'));
  // El resguardo empieza desde arriba: si no, hereda el scroll que tuviera
  // la pantalla de pago y aparece empezado por la mitad.
  $('checkoutDialog').scrollTop = 0;
  launchConfetti();
  state.cart = [];
  renderCart();

  startSuccessCountdown(SUCCESS_COUNTDOWN);
}

/* ─── CUENTA ATRÁS DEL RESGUARDO ───
   Recarga el kiosco para dejarlo listo para el siguiente cliente. Se puede
   parar y rearrancar a propósito: imprimir tarda unos segundos y no se
   puede recargar la página mientras el cliente espera su ticket, porque se
   quedaría sin ticket y sin ver el aviso de que algo ha fallado. */
const SUCCESS_COUNTDOWN = 12;
/* Si la impresión falla, el cliente tiene que leer el aviso y poder
   reintentar: más tiempo, pero sin dejar el kiosco bloqueado si se marcha. */
const SUCCESS_COUNTDOWN_PRINT_ERROR = 30;

function startSuccessCountdown(seconds) {
  clearInterval(activeCountdownTimer);
  const box = $('countdownBox');
  if (box) box.hidden = false;
  let countdown = seconds;
  $('countdownVal').textContent = countdown;
  $('countdownMsg').textContent = t('countdownMsg') + '...';
  activeCountdownTimer = setInterval(() => {
    countdown--;
    $('countdownVal').textContent = countdown;
    if (countdown <= 0) {
      clearInterval(activeCountdownTimer);
      location.reload();
    }
  }, 1000);
}

/* Se oculta el recuadro además de parar el reloj: si se queda a la vista con
   un número congelado, parece que el kiosco se ha colgado. */
function stopSuccessCountdown() {
  clearInterval(activeCountdownTimer);
  const box = $('countdownBox');
  if (box) box.hidden = true;
}

/* ─── POINTS ─── */
function addPoints(n) {
  if (state.isGuest) return;
  state.points += n;
  localStorage.setItem('cj-pts', state.points);
  updatePointsDisplay();
}

function updatePointsDisplay() {
  $('pointsValue').textContent = state.points;
  const el = $('pointsDisplay');
  el.classList.remove('bump');
  void el.offsetWidth; // reflow
  el.classList.add('bump');
}

/* ─── DAILY CHALLENGE BAR ─── */
function animateDcBar(pct) {
  $('dcBar').style.width = pct + '%';
}

/* ─── IMPRESIÓN SILENCIOSA DEL TICKET ───
   Ningún navegador permite imprimir sin su diálogo de confirmación — es una
   restricción de seguridad, no algo que se pueda evitar desde el código de
   la página. La única forma de guardar el .txt e imprimir de verdad sin
   preguntar nada es que un programa aparte, fuera del navegador, hable
   directamente con la impresora: eso es print-helper.js (ver ese archivo),
   un pequeño servidor que corre en el mismo PC del kiosco.
   Aquí solo le pedimos, por HTTP, que guarde e imprima. Si por lo que sea
   no está corriendo, se reintenta una vez y se avisa al cliente en pantalla;
   lo que NO se hace es abrir el diálogo del navegador (ver más abajo). */
const PRINT_HELPER_BASE = 'http://localhost:5217';
const PRINT_HELPER_URL = `${PRINT_HELPER_BASE}/imprimir`;

/* Si el ayudante está caído, un fetch puede quedarse colgado hasta que el
   navegador se canse (decenas de segundos). El cliente está de pie delante
   de la pantalla y la cuenta atrás recarga a los 12 s, así que cortamos
   pronto y reintentamos una vez: casi todos los fallos reales son un
   tropiezo puntual del recurso compartido de Windows. */
const PRINT_TIMEOUT_MS = 3500;
const PRINT_ATTEMPTS = 2;

/* El diálogo de impresión del navegador NO puede salirle nunca a un cliente:
   es una ventana del SISTEMA, con un botón Cancelar que deja el pedido pagado
   y sin ticket, y en un tótem sin vigilancia es además una vía para salirse
   de la aplicación (desde ahí se llega a "Guardar como PDF" y al explorador
   de archivos). Encima la recarga automática de la pantalla de éxito puede
   cerrarlo a medias.
   Se conserva como herramienta de mantenimiento —para probar la impresión
   desde un PC sin el ayudante— pero hay que pedirlo a propósito:
   ?impresion-navegador=1 en la URL, o cj-print-fallback=1 en localStorage. */
function browserPrintAllowed() {
  try {
    return new URLSearchParams(location.search).get('impresion-navegador') === '1'
      || localStorage.getItem('cj-print-fallback') === '1';
  } catch {
    return false;
  }
}

function postToPrintHelper(payload) {
  /* AbortController y no Promise.race: hay que cancelar la petición de
     verdad, si no el reintento se suma a una petición que sigue viva. */
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), PRINT_TIMEOUT_MS);

  return fetch(PRINT_HELPER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: ctrl.signal,
  })
    .then(async response => {
      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.error || `Error HTTP ${response.status}`);
      }
      return result;
    })
    .finally(() => clearTimeout(timer));
}

async function printTicketSilently(orderNum, text, fallbackHtml) {
  const btnPrint = $('btnPrintTicket');
  let lastError = null;

  for (let intento = 1; intento <= PRINT_ATTEMPTS; intento++) {
    try {
      await postToPrintHelper({ orderNum, text });
      console.log(`[Tickets] pedido-${orderNum}.txt enviado a la impresora.`);
      if (btnPrint) {
        btnPrint.disabled = true;
        btnPrint.textContent = '🖨️ Ticket impreso';
      }
      startSuccessCountdown(SUCCESS_COUNTDOWN);
      return;
    } catch (error) {
      lastError = error;
      console.warn(`[Tickets] Intento ${intento}/${PRINT_ATTEMPTS} fallido:`, error);
      if (intento < PRINT_ATTEMPTS) {
        await new Promise(res => setTimeout(res, 600));
      }
    }
  }

  /* Pistas para quien atienda el tótem: las dos causas reales son que el
     ayudante no esté arrancado o que la impresora no esté compartida. */
  console.error(
    '[Tickets] No se pudo imprimir mediante print-helper.js.',
    '\n  1) ¿Está arrancado el ayudante? Abre ' + PRINT_HELPER_BASE + '/salud',
    '\n  2) ¿Sigue compartida la impresora como TICKETS?',
    '\n  Detalle:', lastError
  );

  if (browserPrintAllowed() && fallbackHtml) {
    console.warn('[Tickets] Recurriendo al diálogo del navegador (modo mantenimiento).');
    printReceipt(fallbackHtml);
    if (btnPrint) {
      btnPrint.disabled = false;
      btnPrint.textContent = '🖨️ Imprimir ticket';
    }
    // Sin cuenta atrás: recargar cerraría el diálogo del sistema a medias.
    return;
  }

  /* El pedido ya está cobrado y en cocina: lo único que falta es el papel,
     así que se avisa sin alarmar y se deja reintentar. */
  if (btnPrint) {
    btnPrint.disabled = false;
    btnPrint.textContent = '🔄 Reintentar impresión';
  }
  showPrintProblemNote();
  startSuccessCountdown(SUCCESS_COUNTDOWN_PRINT_ERROR);
}

/* Aviso discreto bajo el botón: el número de pedido ya está en pantalla,
   así que el personal puede darle el ticket a mano sin bloquear la cola. */
function showPrintProblemNote() {
  const btnPrint = $('btnPrintTicket');
  if (!btnPrint) return;

  let note = $('printProblemNote');
  if (!note) {
    note = document.createElement('p');
    note.id = 'printProblemNote';
    note.className = 'print-problem-note';
    btnPrint.insertAdjacentElement('afterend', note);
  }
  note.textContent = '⚠️ La impresora no responde. Tu pedido está confirmado y ya está en cocina — enseña tu número al personal.';
  note.hidden = false;
}

function hidePrintProblemNote() {
  const note = $('printProblemNote');
  if (note) note.hidden = true;
}

/* ─── IMPRESIÓN DE TICKET (iframe aislado, tamaño de ticket térmico) ───
   SOLO mantenimiento: abre el diálogo del sistema, así que no se llama en
   el flujo normal del cliente (ver browserPrintAllowed). Se imprime en un
   iframe aparte y no la página entera para que Admira no saque el
   reproductor en blanco por detrás; se cierra solo al terminar. */
function printReceipt(bodyHtml) {
  const existing = document.getElementById('print-frame');
  if (existing) existing.remove();

  const iframe = document.createElement('iframe');
  iframe.id = 'print-frame';
  iframe.style.cssText = 'position:fixed;width:0;height:0;border:0;visibility:hidden;';
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  doc.open();
  doc.write(`<!doctype html>
<html><head><meta charset="utf-8"><title></title>
<style>
  @page { size: 80mm auto; margin: 0; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    width: 80mm; padding: 4mm 5mm; color: #000;
    font-family: 'Courier New', monospace; font-size: 12px; line-height: 1.5;
  }
  .ticket-logo { text-align: center; font-size: 20px; font-weight: 900; letter-spacing: 2px; }
  .ticket-tag  { text-align: center; font-size: 10px; color: #333; }
  .ticket-date { text-align: center; font-size: 10px; color: #333; margin-top: 2px; }
  .ticket-rule { border-top: 1px dashed #000; margin: 6px 0; }
  .ticket-order { text-align: center; font-size: 22px; font-weight: 900; }
  .ticket-line { display: flex; justify-content: space-between; margin: 3px 0; }
  .ticket-total { font-weight: 900; font-size: 14px; }
  .ticket-pts, .ticket-thanks { text-align: center; font-size: 10px; color: #333; margin-top: 4px; }
</style>
</head><body>${bodyHtml}</body></html>`);
  doc.close();

  iframe.onload = () => {
    const win = iframe.contentWindow;
    win.focus();
    win.print();

    win.addEventListener('afterprint', () => {
      setTimeout(() => iframe.remove(), 300);
    });

    setTimeout(() => {
      if (document.getElementById('print-frame')) {
        iframe.remove();
      }
    }, 2000);
  };
}

/* ─── CONFETTI ─── */
let _confettiFrame = null;

/* INC-09: efecto de confeti retirado. Se conserva la función como no-op
   para no romper las llamadas existentes. */
function launchConfetti() {
  if (_confettiFrame) { cancelAnimationFrame(_confettiFrame); _confettiFrame = null; }
  const canvas = $('confetti');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/* ─── COMBO CONFIGURADOR ─── */

function makeCupSvg({ liq, brand, straw, name }) {
  const svg = `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <polygon points="19,15 101,15 88,167 32,167" fill="${liq}"/>
    <polygon points="19,15 34,15 25,167 32,167" fill="rgba(0,0,0,0.22)"/>
    <polygon points="86,15 101,15 88,167 94,167" fill="rgba(0,0,0,0.22)"/>
    <polygon points="42,15 78,15 72,95 48,95" fill="rgba(255,255,255,0.10)"/>
    <rect x="22" y="20" width="18" height="13" rx="3" fill="rgba(255,255,255,0.62)"/>
    <rect x="48" y="16" width="22" height="15" rx="3" fill="rgba(255,255,255,0.62)"/>
    <rect x="77" y="18" width="16" height="14" rx="3" fill="rgba(255,255,255,0.62)"/>
    <rect x="33" y="31" width="13" height="9" rx="2" fill="rgba(255,255,255,0.50)"/>
    <polygon points="18,14 102,14 89,168 31,168" fill="none" stroke="rgba(255,255,255,0.50)" stroke-width="2"/>
    <polygon points="18,14 26,14 18,80" fill="rgba(255,255,255,0.18)"/>
    <polygon points="25,90 95,90 86,132 34,132" fill="${brand}" fill-opacity="0.93"/>
    <text x="60" y="114" font-size="11" font-weight="900" fill="white" text-anchor="middle" dominant-baseline="middle" font-family="Impact,Arial Black,sans-serif">${name}</text>
    <ellipse cx="60" cy="14" rx="44" ry="5.5" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.38)" stroke-width="1"/>
    <rect x="82" y="-8" width="5" height="78" rx="2.5" fill="${straw}" fill-opacity="0.82" transform="rotate(-7,84,30)"/>
  </svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

/* Iconos propios recortados de las láminas gráficas de la marca */
const CUP_IMGS = {
  'coca-cola': './iconos/ic-cocacola.png',
  'fanta':     './iconos/ic-fanta.png',
  'sprite':    './iconos/ic-sprite.png',
  'aquarius':  './iconos/ic-aquarius.png',
  'monster':   './iconos/ic-monster.png',
  'agua':      './iconos/ic-agua.png',
};

const DRINKS_OPTIONS = [
  { id: 'none',       label: 'Sin bebida',       labelEn: 'No drink',        icon: '🚫', img: './iconos/ic-sin.svg', extra: 0,    retail: 0    },
  { id: 'coca-cola',  label: 'Coca-Cola',         labelEn: 'Coca-Cola',       icon: '🥤', img: CUP_IMGS['coca-cola'], extra: 0,    retail: 49 },
  { id: 'fanta',      label: 'Fanta Naranja',     labelEn: 'Fanta Orange',    icon: '🟠', img: CUP_IMGS['fanta'],     extra: 0,    retail: 49 },
  { id: 'sprite',     label: 'Sprite',            labelEn: 'Sprite',          icon: '💚', img: CUP_IMGS['sprite'],    extra: 0,    retail: 49 },
  { id: 'aquarius',   label: 'Aquarius',          labelEn: 'Aquarius',        icon: '💙', img: CUP_IMGS['aquarius'],  extra: 0,    retail: 49 },
  { id: 'monster',    label: 'Monster',           labelEn: 'Monster',         icon: '⚡', img: CUP_IMGS['monster'],   extra: 10, retail: 59 },
  { id: 'agua',       label: 'Agua',              labelEn: 'Water',           icon: '💧', img: CUP_IMGS['agua'],      extra: 0,    retail: 35 },
];

const COFFEE_OPTIONS = [
  { id: 'cafe-solo',    label: 'Café Solo',      labelEn: 'Espresso',      icon: '☕', img: './iconos/ic-cafe1.png' },
  { id: 'cafe-cortado', label: 'Cortado',        labelEn: 'Cortado',       icon: '☕', img: './iconos/ic-cafe2.png' },
  { id: 'cafe-leche',   label: 'Café con Leche', labelEn: 'Café Latte',    icon: '☕', img: './iconos/ic-cafe3.png' },
  { id: 'te-negro',     label: 'Té Negro',       labelEn: 'Black Tea',     icon: '🍵', img: './iconos/ic-cafe4.png' },
  { id: 'manzanilla',   label: 'Manzanilla',     labelEn: 'Chamomile Tea', icon: '🍵', img: './iconos/ic-cafe5.png' },
];

const SIDES_OPTIONS = [
  { id: 'none',       label: 'Sin acompañamiento', labelEn: 'No side',         icon: '🚫', img: './iconos/ic-sin.svg', extra: 0,    retail: 0    },
  { id: 'crisscuts',  label: 'Crisscuts',          labelEn: 'Crisscuts',       icon: '🍟', img: './iconos/ic-crisscuts.png', extra: 0,    retail: 65 },
  { id: 'fries',      label: 'Patatas Fritas',     labelEn: 'French Fries',    icon: '🍟', img: './iconos/ic-papas.png', extra: 0,    retail: 55 },
  { id: 'nuggets',    label: 'Chicken Nuggets',    labelEn: 'Chicken Nuggets', icon: '🍗', img: './iconos/ic-nuggets.png', extra: 0,    retail: 75 },
  { id: 'rings',      label: 'Aros de cebolla',    labelEn: 'Onion Rings',     icon: '⭕', img: './iconos/ic-aros.png', extra: 14, retail: 79 },
];

const DESSERT_OPTIONS = [
  { id: 'none',        label: 'Sin postre',       labelEn: 'No dessert',       icon: '🚫', img: './iconos/ic-sin.svg', extra: 0 },
  { id: 'twist-oreo',  label: 'Twist Oreo',       labelEn: 'Twist Oreo',       icon: '🍦', img: './iconos/ic-twist-oreo.png', extra: 65 },
  { id: 'shake-oreo',  label: 'Shake Oreo',       labelEn: 'Oreo Shake',       icon: '🥛', img: './iconos/ic-shake-oreo.png', extra: 85 },
  { id: 'shake-choc',  label: 'Shake Chocolate',  labelEn: 'Chocolate Shake',  icon: '🍫', img: './iconos/ic-shake-chocolate.png', extra: 85 },
];

/* Iconos gráficos de los modificadores (láminas de la marca) */
const BURGER_MODS = [
  { id: 'no-onion',     label: 'Sin cebolla',   price: 0,  img: './iconos/ic-cebolla.png' },
  { id: 'no-tomato',    label: 'Sin tomate',    price: 0,  img: './iconos/ic-tomate.png' },
  { id: 'no-sauce',     label: 'Sin salsa',     price: 0,  img: './iconos/ic-salsa.png' },
  { id: 'extra-cheese', label: '+Queso',        price: 18, img: './iconos/ic-queso.png' },
  { id: 'extra-bacon',  label: '+Bacon',        price: 25, img: './iconos/ic-bacon.png' },
];

let comboState = {};

function openMysteryConfigurator(product) {
  comboState = { product, drink: null, side: null, dessert: null, mods: [], qty: 1 };
  const optLabel = opt => (state.lang === 'en' && opt.labelEn) ? opt.labelEn : opt.label;

  const drinkHtml = DRINKS_OPTIONS.map(d => `
    <button class="combo-opt ${comboState.drink?.id === d.id ? 'selected' : ''}" data-drink="${d.id}" type="button">
      <img referrerpolicy="no-referrer" src="${d.img}" alt="${optLabel(d)}" onerror="this.style.opacity='.3'">
      <div>
        <div class="combo-opt-label">${optLabel(d)}</div>
        <div class="combo-opt-price">${d.extra ? '+' + EUR.format(d.extra) : t('included')}</div>
      </div>
    </button>
  `).join('');

  $('comboContent').innerHTML = `
    <div class="combo-hero mystery-hero">
      <img referrerpolicy="no-referrer" class="mystery-hero-img" src="https://carlsjr.es/wp-content/uploads/2023/03/Western-Bacon-Cheeseburger.png" alt="Sorpresa" onerror="this.style.display='none'">
      <div class="mystery-hero-q">?</div>
    </div>
    <div class="combo-body">
      <div class="combo-name">Mystery Carl's</div>
      <div class="combo-desc">${pDesc(product)}</div>
      <div class="combo-section">
        <h3>${t('mysteryChooseDrink')} <span class="combo-required">*</span></h3>
        <div class="combo-options">${drinkHtml}</div>
      </div>
      <!-- Sin selector de cantidad, igual que en el configurador: debajo de
           "elige tu bebida" se lee como si contara bebidas. -->
    </div>
    <div class="combo-footer">
      <div class="combo-total-row">
        <span class="combo-total-label">${t('comboTotalLabel')}</span>
        <span class="combo-total-price" id="comboTotalPrice">${EUR.format(comboTotal())}</span>
      </div>
      <button class="btn-add-cart mystery-add-btn" id="btnAddCombo" type="button" ${!comboState.drink ? 'disabled' : ''}>
        ${comboState.drink ? `${t('mysteryAddBtn')} · ${EUR.format(comboTotal())}` : '🥤 Elige tu bebida primero'}
      </button>
    </div>
  `;

  $('comboContent').querySelectorAll('[data-drink]').forEach(btn => {
    btn.addEventListener('click', () => {
      comboState.drink = DRINKS_OPTIONS.find(d => d.id === btn.dataset.drink);
      updateComboPrices();
      $('comboContent').querySelectorAll('[data-drink]').forEach(b => b.classList.toggle('selected', b.dataset.drink === btn.dataset.drink));
    });
  });
  $('btnAddCombo').addEventListener('click', () => {
    if (!comboState.drink) return;
    const note = `Bebida: ${comboState.drink.label} · 🎲 Sorpresa`;
    addToCart(comboState.product, [], comboState.qty, note, comboState.drink.extra ?? 0);
    safeClose($('comboDialog'));
    showToast(t('mysteryRevealed'));
  });

  safeModal($('comboDialog'));
}

/* INC-04: la personalización de la hamburguesa va primero, después el resto de opciones */
const COMBO_STEPS_FULL = ['mods', 'side', 'drink', 'dessert'];
/* "Individual o en combo" en hamburguesas: el combo solo añade patatas +
   bebida (sin forzar postre), así que se salta ese paso. */
const COMBO_STEPS_BURGERCOMBO = ['mods', 'side', 'drink'];

/* Recargo fijo al convertir una hamburguesa suelta en combo (patatas +
   bebida). Los Menús ya montados de la carta no usan esto: llevan su
   propio precio de conjunto. */
const BURGER_COMBO_SURCHARGE = 70;

/* Pinta el paso actual y lo deja visible desde arriba. */
function goComboStep() {
  renderComboDialog();
  $('comboDialog').scrollTop = 0;
}

function openComboConfigurator(product, mode = 'combo') {
  comboState = {
    product, mode,
    steps: mode === 'burgercombo' ? COMBO_STEPS_BURGERCOMBO : COMBO_STEPS_FULL,
    // En productos sueltos no hay opciones "Sin bebida/acompañamiento/postre":
    // se empieza sin nada seleccionado y basta con no elegir nada.
    drink: null, side: null, dessert: null,
    mods: [], qty: 1, step: 0
  };
  renderComboDialog();
  safeModal($('comboDialog'));
  $('comboDialog').scrollTop = 0;
}

function comboStepBlockMsg(stepKey) {
  if (comboState.mode === 'solo') return null; // todo opcional en modo solo
  if (stepKey === 'drink'   && !comboState.drink)   return '🥤 Elige tu bebida primero';
  if (stepKey === 'side'    && !comboState.side)    return '🍟 Elige tu acompañamiento';
  if (stepKey === 'dessert' && !comboState.dessert) return '🍦 Elige el postre';
  return null;
}

function optPrice(opt, field) {
  // For solo mode use retail price, for combo use extra upcharge
  return comboState.mode === 'solo' ? (opt?.retail ?? 0) : (opt?.[field] ?? 0);
}

function comboTotal() {
  const drinkCost   = optPrice(comboState.drink,   'extra');
  const sideCost    = optPrice(comboState.side,     'extra');
  const dessertCost = (comboState.dessert?.extra ?? 0);
  const modsExtra   = comboState.mods.reduce((s, id) => s + (BURGER_MODS.find(m => m.id === id)?.price || 0), 0);
  const comboSurcharge = comboState.mode === 'burgercombo' ? BURGER_COMBO_SURCHARGE : 0;
  return round((comboState.product.price + comboSurcharge + drinkCost + sideCost + dessertCost + modsExtra) * comboState.qty);
}

function comboReady() {
  if (comboState.product?.isMystery) return !!comboState.drink;
  if (comboState.mode === 'solo') return true; // none options preselected, always ready
  if (comboState.mode === 'burgercombo') return !!(comboState.drink && comboState.side);
  return !!(comboState.drink && comboState.side && comboState.dessert);
}

function comboBlockMsg() {
  // Producto suelto: nada es obligatorio, se puede añadir sin extras.
  if (comboState.mode === 'solo') return null;
  if (comboState.product?.isMystery) {
    if (!comboState.drink) return '🥤 Elige tu bebida primero';
    return null;
  }
  if (!comboState.drink)   return '🥤 Elige tu bebida primero';
  if (!comboState.side)    return '🍟 Elige tu acompañamiento';
  if (comboState.mode !== 'burgercombo' && !comboState.dessert) return '🍦 Elige el postre';
  return null;
}

function renderComboDialog() {
  const p = comboState.product;
  const isSolo = comboState.mode === 'solo';
  const optLabel = opt => (state.lang === 'en' && opt.labelEn) ? opt.labelEn : opt.label;

  const drinkPrice = d => {
    const price = isSolo ? d.retail : d.extra;
    if (d.id === 'none') return isSolo ? t('included') : t('included');
    return price ? '+' + EUR.format(price) : t('included');
  };
  const sidePrice = s => {
    const price = isSolo ? s.retail : s.extra;
    if (s.id === 'none') return t('included');
    return price ? '+' + EUR.format(price) : t('included');
  };

  /* En productos sueltos se ocultan las opciones "Sin …": si el cliente no
     quiere bebida, acompañamiento o postre, simplemente no selecciona nada. */
  const pick = list => isSolo ? list.filter(o => o.id !== 'none') : list;

  const drinkHtml = pick(DRINKS_OPTIONS).map(d => `
    <button class="combo-opt ${comboState.drink?.id === d.id ? 'selected' : ''}" data-drink="${d.id}" type="button">
      ${d.img ? `<img referrerpolicy="no-referrer" src="${d.img}" alt="${optLabel(d)}" onerror="this.style.opacity='.3'">` : `<span class="combo-opt-icon">${d.icon}</span>`}
      <div>
        <div class="combo-opt-label">${optLabel(d)}</div>
        <div class="combo-opt-price">${drinkPrice(d)}</div>
      </div>
    </button>
  `).join('');

  const sideHtml = pick(SIDES_OPTIONS).map(s => `
    <button class="combo-opt ${comboState.side?.id === s.id ? 'selected' : ''}" data-side="${s.id}" type="button">
      ${s.img ? `<img referrerpolicy="no-referrer" src="${s.img}" alt="${optLabel(s)}" onerror="this.style.display='none'">` : `<span class="combo-opt-icon">${s.icon}</span>`}
      <div>
        <div class="combo-opt-label">${optLabel(s)}</div>
        <div class="combo-opt-price">${sidePrice(s)}</div>
      </div>
    </button>
  `).join('');

  const dessertHtml = pick(DESSERT_OPTIONS).map(d => `
    <button class="combo-opt ${comboState.dessert?.id === d.id ? 'selected' : ''}" data-dessert="${d.id}" type="button">
      ${d.img ? `<img referrerpolicy="no-referrer" src="${d.img}" alt="${optLabel(d)}" onerror="this.style.opacity='.3'">` : `<span class="combo-opt-icon">${d.icon}</span>`}
      <div>
        <div class="combo-opt-label">${optLabel(d)}</div>
        <div class="combo-opt-price">${d.extra ? '+' + EUR.format(d.extra) : t('included')}</div>
      </div>
    </button>
  `).join('');

  const modsHtml = BURGER_MODS.map(m => `
    <button class="combo-mod ${comboState.mods.includes(m.id) ? 'active' : ''}" data-mod="${m.id}" type="button">
      ${m.img ? `<img class="combo-mod-img" src="${m.img}" alt="" onerror="this.remove()">` : ''}
      <span class="combo-mod-label">${t('mod-' + m.id)}${m.price ? ` +${EUR.format(m.price)}` : ''}</span>
    </button>
  `).join('');

  const steps    = comboState.steps || COMBO_STEPS_FULL;
  const stepIdx  = comboState.step;
  const stepKey  = steps[stepIdx];
  const isLast   = stepIdx === steps.length - 1;

  const stepSection = {
    drink:   `<h3>${t('chooseDrink')} ${!isSolo ? '<span class="combo-required">*</span>' : ''}</h3><div class="combo-options">${drinkHtml}</div>`,
    side:    `<h3>${t('chooseSide')} ${!isSolo ? '<span class="combo-required">*</span>' : ''}</h3><div class="combo-options">${sideHtml}</div>`,
    dessert: `<h3>${t('chooseDessert')} ${!isSolo ? '<span class="combo-required">*</span>' : ''}</h3><div class="combo-options">${dessertHtml}</div>`,
    mods:    `<h3>${t('customizeBurger')}</h3><div class="combo-mods">${modsHtml}</div>`,
  }[stepKey];

  const dotsHtml = steps.map((_, i) => `<span class="combo-step-dot ${i === stepIdx ? 'active' : i < stepIdx ? 'done' : ''}"></span>`).join('');
  const blockMsg = comboStepBlockMsg(stepKey);

  $('comboContent').innerHTML = `
    <div class="combo-hero">
      ${p.img ? `<img referrerpolicy="no-referrer" src="${p.img}" alt="${pName(p)}">` : `<span style="font-size:5rem">🍔</span>`}
    </div>
    <div class="combo-body">
      <div class="combo-name" id="comboTitle">${pName(p)}</div>
      <div class="combo-desc">${pDesc(p)}</div>

      <div class="combo-steps-dots">${dotsHtml}</div>

      <div class="combo-section combo-step-section">${stepSection}</div>
      <!-- Sin selector de cantidad: el último paso es "elige tu bebida" o
           "elige tu postre", y un contador justo debajo se lee como si
           multiplicara la bebida, no el menú entero. Las unidades se
           cambian en el carrito, que es donde se ve qué se está sumando. -->
    </div>
    <div class="combo-footer">
      <div class="combo-total-row">
        <span class="combo-total-label">${t('comboTotalLabel')}</span>
        <span class="combo-total-price" id="comboTotalPrice">${EUR.format(comboTotal())}</span>
      </div>
      <div class="combo-step-nav">
        ${stepIdx > 0 ? `<button class="btn-secondary combo-step-back" id="btnComboBack" type="button">← Volver</button>` : ''}
        ${isLast
          ? `<button class="btn-add-cart" id="btnAddCombo" type="button" ${!comboReady() ? 'disabled' : ''}>${comboBlockMsg() ?? `${t('addCombo')} ${EUR.format(comboTotal())}`}</button>`
          : `<button class="btn-add-cart" id="btnComboNext" type="button" ${blockMsg ? 'disabled' : ''}>${blockMsg ?? 'Siguiente →'}</button>`
        }
      </div>
    </div>
  `;

  // Bind drink selection
  /* En producto suelto se puede deseleccionar volviendo a tocar la opción,
     ya que no existe un botón "Sin …" al que volver. */
  const toggleSolo = (current, id) => (isSolo && current?.id === id) ? null : undefined;

  $('comboContent').querySelectorAll('[data-drink]').forEach(btn => {
    btn.addEventListener('click', () => {
      const off = toggleSolo(comboState.drink, btn.dataset.drink);
      comboState.drink = off === null ? null : DRINKS_OPTIONS.find(d => d.id === btn.dataset.drink);
      renderComboDialog();
    });
  });

  // Bind side selection
  $('comboContent').querySelectorAll('[data-side]').forEach(btn => {
    btn.addEventListener('click', () => {
      const off = toggleSolo(comboState.side, btn.dataset.side);
      comboState.side = off === null ? null : SIDES_OPTIONS.find(s => s.id === btn.dataset.side);
      renderComboDialog();
    });
  });

  // Bind dessert selection
  $('comboContent').querySelectorAll('[data-dessert]').forEach(btn => {
    btn.addEventListener('click', () => {
      const off = toggleSolo(comboState.dessert, btn.dataset.dessert);
      comboState.dessert = off === null ? null : DESSERT_OPTIONS.find(d => d.id === btn.dataset.dessert);
      renderComboDialog();
    });
  });

  // Bind mods
  $('comboContent').querySelectorAll('[data-mod]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.mod;
      if (comboState.mods.includes(id)) comboState.mods = comboState.mods.filter(m => m !== id);
      else comboState.mods.push(id);
      btn.classList.toggle('active', comboState.mods.includes(id));
      updateComboPrices();
    });
  });

  /* Navegación entre pasos. El scroll se reinicia SOLO al cambiar de paso
     (no en cada re-render): si no, el paso siguiente heredaba el scroll del
     anterior y aparecía empezado por la mitad; y reiniciarlo en cada click
     daría un salto al principio cada vez que se elige una opción. */
  if (stepIdx > 0) {
    $('btnComboBack').addEventListener('click', () => { comboState.step--; goComboStep(); });
  }
  if (!isLast) {
    $('btnComboNext').addEventListener('click', () => {
      if (comboStepBlockMsg(stepKey)) return;
      comboState.step++;
      goComboStep();
    });
  }

  if (isLast) {
    $('btnAddCombo').addEventListener('click', () => {
      if (!comboReady()) return;
      // Solo se anota lo que el cliente ha elegido de verdad
      const chosen = o => o && o.id !== 'none' ? o.label : null;
      const note = [
        chosen(comboState.drink)   ? `Bebida: ${comboState.drink.label}`   : '',
        chosen(comboState.side)    ? `Acomp: ${comboState.side.label}`     : '',
        chosen(comboState.dessert) ? `Postre: ${comboState.dessert.label}` : ''
      ].filter(Boolean).join(' · ');

      // Recargo de los extras elegidos (+ el recargo fijo de combo, si aplica),
      // para que el carrito cobre lo mismo que el total mostrado en el configurador.
      const comboSurcharge = comboState.mode === 'burgercombo' ? BURGER_COMBO_SURCHARGE : 0;
      const extras = comboSurcharge
                   + optPrice(comboState.drink, 'extra')
                   + optPrice(comboState.side,  'extra')
                   + (comboState.dessert?.extra ?? 0);

      addToCart(comboState.product, comboState.mods, comboState.qty, note, extras, comboState.mode === 'burgercombo');
      safeClose($('comboDialog'));
    });
  }
}

/* Los controles de cantidad y el botón de añadir solo existen en el último
   paso del asistente. Como los modificadores son ahora el PRIMER paso, esta
   función se llama también cuando esos elementos todavía no están en el DOM:
   por eso cada acceso va comprobado (antes lanzaba un TypeError y dejaba el
   precio sin actualizar). */
function updateComboPrices() {
  const total = comboTotal();

  const qtyVal = $('comboQtyVal');
  if (qtyVal) qtyVal.textContent = comboState.qty;

  const totalEl = $('comboTotalPrice');
  if (totalEl) totalEl.textContent = EUR.format(total);

  const btn = $('btnAddCombo');
  if (!btn) return;

  const msg = comboBlockMsg();
  if (msg) {
    btn.disabled = true;
    btn.textContent = msg;
  } else {
    btn.disabled = false;
    const isMystery = btn.classList.contains('mystery-add-btn');
    btn.textContent = isMystery ? `${t('mysteryAddBtn')} · ${EUR.format(total)}` : `${t('addCombo')} ${EUR.format(total)}`;
  }
}

/* ─── IDIOMA ─── */
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (key === 'title') el.innerHTML = val;
    else el.textContent = val;
  });
  // Placeholders
  const loginName = $('loginName');
  if (loginName) loginName.placeholder = t('lsNamePh');
  const loginEmail = $('loginEmail');
  if (loginEmail) loginEmail.placeholder = t('lsEmailPh');
  const rdName = $('rdNameInput');
  if (rdName) rdName.placeholder = t('rdNamePh');
  const rdEmail = $('rdEmailInput');
  if (rdEmail) rdEmail.placeholder = t('rdEmailPh');
  // Lang button active state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === state.lang);
  });
  // Daily challenge text
  if ($('dcTitle')) $('dcTitle').textContent = t('dcTitle');
  if ($('dcText')) $('dcText').textContent = t('dcText');
  if ($('dcPts')) $('dcPts').textContent = t('dcPts');
}

function setLang(lang) {
  state.lang = lang;
  applyI18n();
  renderCatNav();
  renderCart();
  renderProducts();
  triggerUpsell();
  // Quiz back button
  if ($('btnQuizBack')) $('btnQuizBack').textContent = t('quizBack');
  // Re-render quiz if open
  if ($('viewQuiz').classList.contains('active')) {
    $('quizResults').innerHTML = '';
    renderQuizStep();
  }
  // Re-render payment grid if checkout is open
  if ($('checkoutDialog').open) {
    renderPaymentGrid();
  }
  // Re-render combo dialog if open
  if ($('comboDialog').open) {
    renderComboDialog();
  }
  // Re-render product dialog if open
  if ($('productDialog').open && dialogProduct) {
    renderProductDialog(dialogProduct);
  }
  // Update checkout static buttons
  if ($('btnPay')) $('btnPay').textContent = t('confirmPayLabel');
  if ($('btnCancelCheckout')) $('btnCancelCheckout').textContent = t('backOrderLabel');
  if ($('howPayTitle')) $('howPayTitle').textContent = t('howPay');
  renderDiningChip();
  if ($('diningDialog').open) renderDiningDialog();
  if ($('burgerTypeDialog').open && burgerTypeProduct) renderBurgerTypeDialog(burgerTypeProduct);
  // El diálogo de entrega solo aparece tras pagar; si estuviera abierto al
  // cambiar de idioma, se repinta en el paso en el que esté.
  if ($('serviceDialog').open) {
    if ($('svTableStep').hidden) renderServiceDialog();
    else { renderServiceDialog(); showTableStep(); }
  }
}

function bindLangSwitcher() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
}

/* ─── REGISTRO DESDE CHECKOUT ─── */
function bindRegisterDialog() {
  const dialog = $('registerDialog');
  if (!dialog) return;
  $('rdClose').addEventListener('click', () => safeClose(dialog));
  dialog.addEventListener('click', e => { if (e.target === dialog) safeClose(dialog); });

  $('registerForm').addEventListener('submit', e => {
    e.preventDefault();
    const name  = $('rdNameInput').value.trim();
    const email = $('rdEmailInput').value.trim();
    if (!name || !email) { showToast(t('toastNameEmail')); return; }
    state.userName = name;
    state.isGuest = false;
    $('pointsDisplay').classList.remove('hidden');
    safeClose(dialog);
    showToast(t('toastRegistered'));
    // Update ticket box to show confirmation
    const box = $('ticketDigitalBox');
    if (box) {
      box.innerHTML = `<div class="ticket-registered"><strong>${t('ticketSentTo')(email)}</strong></div>`;
    }
  });
}

/* ─── TOAST ─── */
let toastTimer;
function showToast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ─── ATTRACT MODE ─── */
(function() {
  const IDLE_MS  = 30_000;
  const PHOTO_MS = 3_000;
  const VIDEO_FALLBACK_MS = 20_000; // máximo por vídeo por si 'ended' no llega

  const PLAYLIST = [
    { type: 'video', src: './promo1.mp4' },
    /* INC-01: promo2.jpg (Godzilla vs Kong) retirada — imagen pixelada */
    { type: 'video', src: './promo3.mp4' },
    { type: 'photo', src: './promo4.png', ms: 3_000 },
    { type: 'video', src: './promo5.mp4' },
    { type: 'photo', src: './promo6.png', ms: 3_000 },
    { type: 'video', src: './promo7.mp4' },
    { type: 'photo', src: './promo8.png', ms: 3_000 },
  ];

  let idleTimer     = null;
  let slideTimer    = null;
  let idx           = 0;

  const screen = $('attractScreen');
  const video  = $('attractVideo');
  const photo  = $('attractPhoto');
  if (!screen || !video || !photo) return;

  function isOnWelcome() {
    const w = document.getElementById('welcome');
    return w && !w.hidden;
  }

  function nextItem() { playItem(idx + 1); }

  function playItem(i) {
    idx = ((i % PLAYLIST.length) + PLAYLIST.length) % PLAYLIST.length;
    const item = PLAYLIST[idx];
    clearTimeout(slideTimer);

    if (item.type === 'video') {
      photo.hidden = true;
      video.style.display = 'block';
      video.src = item.src;
      // play() directo sin load() previo — load() cancela la reproducción en algunos navegadores
      const p = video.play();
      if (p) p.catch(() => {}); // ignorar rechazo; el fallback timer avanza igualmente
      // Fallback por si 'ended' no llega (vídeo corto, error de red, etc.)
      slideTimer = setTimeout(nextItem, VIDEO_FALLBACK_MS);
    } else {
      video.style.display = 'none';
      video.pause();
      photo.src = item.src;
      photo.hidden = false;
      slideTimer = setTimeout(nextItem, item.ms || PHOTO_MS);
    }
  }

  function showAttract() {
    if (!isOnWelcome()) return;
    screen.hidden = false;
    playItem(idx);
  }

  function hideAttract() {
    screen.hidden = true;
    clearTimeout(slideTimer);
    video.pause();
    video.src = '';
    video.style.display = 'block';
    photo.hidden = true;
    resetIdle();
  }

  function resetIdle() {
    clearTimeout(idleTimer);
    if (isOnWelcome()) idleTimer = setTimeout(showAttract, IDLE_MS);
  }

  // 'ended' cancela el fallback y avanza al siguiente
  video.addEventListener('ended', () => { clearTimeout(slideTimer); nextItem(); });

  screen.addEventListener('pointerdown', hideAttract);

  ['pointerdown', 'pointermove', 'keydown'].forEach(ev =>
    document.addEventListener(ev, () => {
      if (!screen.hidden) return;
      resetIdle();
    }, { passive: true })
  );

  const observer = new MutationObserver(resetIdle);
  const welcome = document.getElementById('welcome');
  if (welcome) observer.observe(welcome, { attributes: true, attributeFilter: ['hidden'] });

  resetIdle();
})();

