import {
    db,
	storage,
	auth,

	/* firestore refs */
	userRef,
	buildRef,
    imageRef,
	inventoryRef,
	blockImagesRef,
    favoriteRef
} from "@/assets/scripts/firebase"

import {
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,

} from '@firebase/firestore'

import {
    ref as fbRef, 
    getDownloadURL
} from '@firebase/storage'


export {
    /* Firebase conections */
    db,
	storage,
	auth,

	/* firestore refs */
	userRef,
	buildRef,
    imageRef,
	inventoryRef,
	blockImagesRef,
    favoriteRef,

    /* Firestore function */
    doc,
    setDoc,
    getDoc,
    getDocs,
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,

    /* Storage functions */
    fbRef,
    getDownloadURL
}