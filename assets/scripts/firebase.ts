import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc } from 'firebase/firestore';
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
const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)

/* firestore refs */
const userRef = collection(db, 'users')
const buildRef = collection(db, "builds")
const blockImagesRef = collection(db, "blockImages") /* production fase */
const categoryRef = collection(db, "categories")
const categoryRequestRef = collection(db, "categoryRequests")
const categoryIdsRef = doc(categoryRef, "ALL_IDS_LIST")
const favoriteRef = collection(db, "favorites")


export {
	db,
	storage,
	auth,

	/* firestore refs */
	userRef,
	buildRef,
	blockImagesRef,
	categoryRef,
	categoryIdsRef,
	categoryRequestRef,
	favoriteRef
}