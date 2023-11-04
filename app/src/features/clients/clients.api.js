import { db } from '../../db/firestore';
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";

export const fetchClients = () => 
  getDocs(collection(db, "clients"))
    .then(snapshot => 
      snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    )  
    
export const createClient = async client =>{ 
  const docRef = await addDoc(collection(db, 'clients'), client)
  return docRef.id
}

export const editClient = async (client) => {
  const docRef = doc(db, 'clients', client.id)
  await updateDoc(docRef, client)
}

export const addPayment = async(data) => {
  const docRef = doc(db, 'clients', data.id)
  await updateDoc(docRef, {payments: data.payments})
}

export const addCharge = async(data) => {
  const docRef = doc(db, 'clients', data.id)
  await updateDoc(docRef, {charges: data.charges})
}

export const deleteCharge = async(data) => {
  const docRef = doc(db, 'clients', data.id)
  await updateDoc(docRef, {charges: data.charges})
}

export const deletePayment = async(data) => {
  const docRef = doc(db, 'clients', data.id)
  await updateDoc(docRef, {payments: data.payments})
}

export const addInvoice = async(data) => {
  const docRef = doc(db, 'clients', data.id)
  await updateDoc(docRef, {invoices: data.invoices, balance: data.balance, charges: data.charges, payments: data.payments})
}

export const addSummary = async(data) => {
  const docRef = doc(db, 'clients', data.id)
  await updateDoc(docRef, {summary: data})
}