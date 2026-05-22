import 'dotenv/config'
import { initializeApp } from 'firebase/app'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { productsMock } from '../src/data/products.js'

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}

if (!Object.values(firebaseConfig).every(Boolean)) {
  console.error('Faltan variables en .env para conectarse a Firebase.')
  process.exit(1)
}

async function seedProducts() {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  for (const product of productsMock) {
    const { id, ...productData } = product
    await setDoc(doc(db, 'products', id), productData)
    console.log(`Producto cargado: ${id}`)
  }

  console.log('Carga de productos finalizada.')
}

seedProducts().catch((error) => {
  console.error('Error cargando productos:', error.message)
  process.exit(1)
})
