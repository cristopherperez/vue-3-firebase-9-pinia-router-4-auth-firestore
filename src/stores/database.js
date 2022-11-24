import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { db } from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { nanoid } from "nanoid";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    documents: [],
    loadingDoc: false,
  }),
  actions: {
    async getUrls() {
      // Para q se reinicie el state, se usa otra funcion state.$reset en el user.js para hacer lo mismo
      if (this.documents.length !== 0) {
        return;
      }
      this.loadingDoc = true;
      try {
        // query es de la firestore, collection es para entrar a la base de datos (url en este casi), db q configuramos en
        // configfirestore
        // segundo argumento es el nombre de nuestra coleccion
        // where: es una inquietud q dice, cuando el campo user
        const q = query(
          collection(db, "urls"),
          where("user", "==", auth.currentUser.uid)
        );
        // getDocs es para recibir las query, hace un llamado a la base de datos
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.documents.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async addUrl(name) {
      try {
        const objetoDoc = {
          name: name,
          // nanoid es un packete para generar id aleatorios y el 6 hace referencia a la cantidad de caracteres
          short: nanoid(6),
          user: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "urls"), objetoDoc);
        // console.log(docRef.id)
        this.documents.push({
          ...docRef,
          id: docRef.id,
        });
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
    async deleteUrl(id) {
      try {
        const docRef = doc(db, "urls", id);
        await deleteDoc(docRef);
        this.documents = this.documents.filter((item) => item.id !== id);
      } catch (error) {
        console.log(error);
      } finally {
      }
    },
  },
});
