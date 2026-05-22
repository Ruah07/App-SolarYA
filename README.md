# SolarYa - E-commerce de Paneles Solares

Proyecto SPA desarrollado en React para simular una tienda online de paneles solares.

## Funcionalidades implementadas

- Catalogo de productos con filtro por categoria.
- Vista de detalle de cada producto.
- Carrito global con Context API (agregar, eliminar, vaciar).
- Checkout con formulario de comprador.
- Registro de ordenes en Firebase Firestore.
- Fallback de datos mock si Firebase no esta configurado.

## Tecnologias

- React + Vite
- React Router DOM
- Firebase Firestore
- Material UI

## Ejecutar en local

1. Instalar dependencias:

```bash
npm install
```

2. Levantar entorno de desarrollo:

```bash
npm run dev
```

## Carga automatica de productos a Firestore

```bash
npm run seed:products
```

El script usa los productos de `src/data/products.js` y los carga en la coleccion `products`.

## Configuracion de Firebase

1. Crear archivo `.env` en la raiz del proyecto con las variables:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

2. Crear en Firestore las colecciones:
- `products` (catalogo de productos)
- `orders` (ordenes del checkout)

Si no configuras Firebase, la app funciona con datos de ejemplo (`src/data/products.js`).

## Documentos de apoyo

- Configuracion y carga de Firestore: `FIREBASE_SETUP.md`
- Guion de presentacion/defensa: `GUIA_DEFENSA.md`
- Chuleta oral de 3 minutos: `CHULETA_3_MINUTOS.md`
