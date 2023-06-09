import { createContext, useEffect, useState } from "react";
import app from "../firebase/config.firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      //   console.log(currentUser);
      setLoading(false);
      if (currentUser && currentUser.email) {
        const user = { email: currentUser.email };
        axios
          .post("http://localhost:5000/jwt", user)
          .then((res) => {
            localStorage.setItem("access-token", res.data.token);
            // console.log(res.data.token, "Token");
            // console.log(localStorage.getItem("access-token"));
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        localStorage.removeItem("access-token");
      }
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    createUser,
    signInUser,
    googleSignIn,
    logOut,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
