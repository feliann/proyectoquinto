import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBxS7IEekPIM9l94m-5-dFAlyMhqDIvO2E",
  authDomain: "autorizaciones-eefbc.firebaseapp.com",
  projectId: "autorizaciones-eefbc",
  storageBucket: "autorizaciones-eefbc.appspot.com",
  messagingSenderId: "467566675986",
  appId: "1:467566675986:web:854441ea5c09d7d10db0cb",
  measurementId: "G-CRZTJFTW85"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Crear una instancia del proveedor de autenticación de Google
const provider = new GoogleAuthProvider();

// Función para iniciar sesión con Google
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const email = user.email;
      if (email.endsWith('@est.ort.edu.ar')) {
        // Si el correo electrónico tiene el dominio correcto, guardar información del usuario en localStorage
        const name = result.user.displayName;
        const profilePic = result.user.photoURL;
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("profilePic", profilePic);

        alert("Log in exitoso");
        window.location.reload();

      } else {
        // Si el correo electrónico no tiene el dominio correcto, eliminar la cuenta de usuario recién creada
        user.delete().then(() => {
          console.log('Usuario eliminado');
        }).catch((error) => {
          console.log('Error al eliminar usuario:', error);
        });

        // Mostrar un mensaje de error
        throw new Error("Solo se permiten direcciones de correo electrónico que terminen en '@est.ort.edu'");
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error('No se pudo iniciar sesión');
      alert("Solo se permiten direcciones de correo electrónico que terminen en '@est.ort.edu'");
    });
};

// Función para cerrar sesión con Google
export const signOutWithGoogle = () => {
  auth.signOut().then(() => {
    // Cerrar sesión exitosa
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("profilePic");
    alert("cierre de sesion exitoso");
    window.location.reload();
  }).catch((error) => {
    console.log('Error al cerrar sesión:', error);
  });
};

// Función para enviar un correo electrónico
export async function sendEmail() {
  const db = getFirestore();
  const user = auth.currentUser;
  if (user) {
    try {
      await addDoc(collection(db, "mail"), {
        to: user.email,
        message: {
          subject: 'Hello from Firebase!',
          html: 'aceptado',
        },
      });
      console.log("Email enviado a", user.email);
      alert("Correo electrónico enviado");
    } catch (error) {
      console.log('Error al enviar correo electrónico:', error);
    }
  } else {
    console.log("No hay ningún usuario autenticado");
    alert("No hay ningun usuario autenticado");
  }
}
