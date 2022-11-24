// instalar firebase npm install firebase
// iniciar la app
import { initializeApp } from "firebase/app";

// importar metodo para la autenticacion y llamarlo
import { getAuth } from "firebase/auth";

// importacion para obtener la base de datos
import { getFirestore } from "firebase/firestore/lite";

// config para iniciar la app
const firebaseConfig = {
  apiKey: "AIzaSyDLG0zWXcrt0PGNATIQhejpVPsibNLqnKg",
  authDomain: "vue-3-login-setup.firebaseapp.com",
  projectId: "vue-3-login-setup",
  storageBucket: "vue-3-login-setup.appspot.com",
  messagingSenderId: "666484959753",
  appId: "1:666484959753:web:72e63092cfd7c2d7b966d8",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export { auth, db };
