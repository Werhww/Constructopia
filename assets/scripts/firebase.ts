import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBT5CluDD-wyoZJrZs9LcqVKJ6cc1d6V4Q",
  authDomain: "constructopia-770e5.firebaseapp.com",
  projectId: "constructopia-770e5",
  storageBucket: "constructopia-770e5.appspot.com",
  messagingSenderId: "610012275527",
  appId: "1:610012275527:web:ecef3001f9a900ad6be262",
  measurementId: "G-28ERVD8TSV"
};

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

export {
    db,
    storage,
    auth
}