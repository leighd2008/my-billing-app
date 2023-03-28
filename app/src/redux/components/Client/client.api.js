import { db } from '../../../db/firestore';
import { collection, getDocs } from "firebase/firestore";
// import firebase from 'firebase/app';

const extractSnapshotData = snapshot =>
  snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
  
export const fetchClients = () => 
  getDocs(collection(db, "clients"))
    .then(snapshot => 
      snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    )  
    
export const createClient = client =>
  db
    .collection('clients')
    .add(client)
    .then(docRef => docRef.id)