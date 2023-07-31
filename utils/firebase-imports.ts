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
    getDownloadURL,
    deleteObject
} from '@firebase/storage'

/* Firebase conections */
export {
    db,
	storage,
	auth
}

/* firestore refs */
export {
    userRef,
	buildRef,
    imageRef,
	inventoryRef,
	blockImagesRef,
    favoriteRef
}

/* firestore functions */
export {
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
}

/* Storage functions */
export {
    fbRef,
    getDownloadURL,
    deleteObject
}