import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {
  try {
    const result = await signInWithPopup(FirebaseAuth, googleProvider);
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message
    }
  }
}

export const registerUserWithEmailPassword = async({email, password, displayName}) => {
  try {
    const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
    const {uid, photoURL} = response.user;
    await updateProfile(FirebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false, 
      errorMessage: error.message
    }
  }
};

export const loginWithEmailPassword = async({ email, password}) => {
  try {
    const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);
    const {uid, photoURL, displayName} = response.user;
    
    await updateProfile(FirebaseAuth.currentUser, {displayName});

    return {
      ok: true,
      uid,
      photoURL,
      displayName
    }

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      errorMessage: error.message
    }
  }
};
