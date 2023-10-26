import { db } from '../../db/firestore';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

export const fetchChargeTypes = () =>
  getDocs(collection(db, "chargeType"))
    .then(snapshot => snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
    )