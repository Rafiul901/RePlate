import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from './config';


const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
     const [role, setRole] = useState(null); // ✅ Add role  
 


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signOutUser = () => {
        setLoading(true);
         setRole(null); // ✅ clear role
        return signOut(auth);
    }

    const googleSignIn = () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

useEffect(() => {
  const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);

    if (currentUser?.email) {
      try {
        const res = await fetch(`http://localhost:3000/users/${currentUser.email}`);
        const data = await res.json();
        setRole(data.role); // ✅ Set role from DB
      } catch (err) {
        console.error("Failed to fetch role:", err);
        setRole(null);
      }
    } else {
      setRole(null); // No user = no role
    }

    setLoading(false);
  });

  return () => unSubscribe();
}, []);


    const authInfo = {
        loading,
        user,
         role, // ✅ expose role
        createUser,
       
        signInUser,
        signOutUser,
        googleSignIn 
    }

    return (
        <AuthContext.Provider value={authInfo}> 
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;
