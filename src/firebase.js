import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPhoneNumber, RecaptchaVerifier, signOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDIrVBdPAN5h103gR50agPrOw4FFt3Hr_E",
  authDomain: "boliexpress-f8282.firebaseapp.com",
  projectId: "boliexpress-f8282",
  storageBucket: "boliexpress-f8282.firebasestorage.app",
  messagingSenderId: "179060383372",
  appId: "1:179060383372:web:54d5ffdb066e5bcd4d65a9",
  measurementId: "G-YR1YSKYY8Z"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializar la autenticación
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Función para iniciar sesión con Google
export const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      console.log("Usuario autenticado con Google:", user);
    })
    .catch((error) => console.error("Error al iniciar sesión con Google:", error));
};

// Registro con correo electrónico y contraseña
export const registerWithEmailPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Iniciar sesión con correo electrónico y contraseña
export const loginWithEmailPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Función para recuperar la contraseña
export const recoverPassword = (email) => {
  return sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Correo de recuperación enviado a:", email);
    })
    .catch((error) => {
      console.error("Error al enviar correo de recuperación:", error);
    });
};

// Autenticación por teléfono
export const signInWithPhone = (phoneNumber, recaptchaContainer) => {
  const recaptchaVerifier = new RecaptchaVerifier(recaptchaContainer, {
    size: "invisible",
    callback: (response) => console.log("Recaptcha resuelto!", response),
  }, auth);

  return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
};

// Cerrar sesión
export const signOutUser = () => {
  signOut(auth)
    .then(() => {
      console.log("Usuario cerrado sesión");
    })
    .catch((error) => console.error("Error al cerrar sesión:", error));
};

export { auth };
