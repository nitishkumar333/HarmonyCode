// src/context/AuthContext.js
import React, { useContext, useState, useEffect } from "react";
import { GoogleAuthProvider, auth, signInWithPopup } from "../components/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const googleSignIn = ()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  }

  function logOut() {
    signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, [currentUser]);


  return <AuthContext.Provider value={{currentUser, googleSignIn, logOut}}>{children}</AuthContext.Provider>;
}
