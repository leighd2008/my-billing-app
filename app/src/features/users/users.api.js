import { db } from '../../db/firestore';
import { collection, getDocs } from "firebase/firestore";
  
export const fetchUsers = () => 
  getDocs(collection(db, "users"))
    .then(snapshot => 
      snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    )  
