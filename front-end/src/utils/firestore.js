import { getFirestore, doc, getDoc, setDoc, collection, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { app } from "../index"


// leave functions async to avoid race conditions!
export const setPreferences = async (email, _sports) => {
    const db = getFirestore(app)
    const sportsRef = doc(db, 'liked_sports', email)

    console.log("Getting userRef: ", sportsRef)

    await getDoc(sportsRef)
        .then((docSnapshot) => {
            console.log("exists:", docSnapshot.exists)
            if (!docSnapshot.exists()) console.log("Document didn't exist!")
            else console.log("Document already existed, overwriting liked_sports with:", _sports)
            const coll = collection(db, "liked_sports")
            setDoc(doc(coll, email), { sports: _sports })
        });
}

export async function fetchPreferences(email) {
    const db = getFirestore(app);

    // 1. Get Preferences from user
    const docRef = doc(db, 'liked_sports', email);
    return await getDoc(docRef);
}

export async function addPreferences(sports, email) {
    const db = getFirestore(app);

    // 1. Get Preferences from user
    const docRef = doc(db, 'liked_sports', email);
    return await updateDoc(docRef, {
        sports: arrayUnion(sports)
    });
}


export async function removePreference(sport, email) {
    const db = getFirestore(app);

    // 1. Get Preferences from user
    const docRef = doc(db, 'liked_sports', email);
    return await updateDoc(docRef, {
        sports: arrayRemove(sport)
    });
}