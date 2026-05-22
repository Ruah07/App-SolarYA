import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { productsMock } from '../data/products'
import { db } from './firebase'

const PRODUCTS_COLLECTION = 'products'
const ORDERS_COLLECTION = 'orders'

export async function getProducts(categoryId) {
  if (!db) {
    if (categoryId) {
      return productsMock.filter((product) => product.category === categoryId)
    }

    return productsMock
  }

  const productsCollection = collection(db, PRODUCTS_COLLECTION)
  const productsQuery = categoryId
    ? query(productsCollection, where('category', '==', categoryId))
    : productsCollection

  const snapshot = await getDocs(productsQuery)
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))
}

export async function getProductById(productId) {
  if (!db) {
    return productsMock.find((product) => product.id === productId) ?? null
  }

  const productRef = doc(db, PRODUCTS_COLLECTION, productId)
  const snapshot = await getDoc(productRef)

  if (!snapshot.exists()) {
    return null
  }

  return { id: snapshot.id, ...snapshot.data() }
}

export async function createOrder(order) {
  if (!db) {
    return `MOCK-${Date.now()}`
  }

  const ordersCollection = collection(db, ORDERS_COLLECTION)
  const response = await addDoc(ordersCollection, order)
  return response.id
}
