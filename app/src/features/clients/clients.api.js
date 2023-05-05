import { db } from '../../db/firestore';
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";
// import firebase from 'firebase/app';

const extractSnapshotData = snapshot =>
  snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
  
export const fetchClients = () => 
  getDocs(collection(db, "clients"))
    .then(snapshot => 
      snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    )  
    
export const createClient = async client =>{ 
  const docRef = await addDoc(collection(db, 'clients'), client)
  console.log(docRef)
  return docRef.id
}

export const editClient = async (client) => {
  const docRef = doc(db, 'clients', client.id)
  await updateDoc(docRef, client)
}