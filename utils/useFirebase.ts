import {
    db,
	storage,
	auth,

	/* firestore refs */
	userRef,
	buildRef,
	blockImagesRef,
    categoryRef,
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
    serverTimestamp,
    Timestamp

} from '@firebase/firestore'

import {
    ref as fbRef, 
    getDownloadURL,
    deleteObject,
    uploadString 
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
	blockImagesRef,
    favoriteRef,
    categoryRef
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
    serverTimestamp,
    Timestamp
}

/* Storage functions */
export {
    fbRef,
    getDownloadURL,
    deleteObject,
    uploadString
}