import { getFirestore, doc, getDoc, updateDoc, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../../../firebase";

// Función para obtener las categorías desde Firestore (ahora solo un documento)
export const fetchCategories = async () => {
  try {
    const docRef = doc(db, "gameCategories", "categories"); // Accedemos al documento único
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().categories || []; // Devuelve el array de categorías del documento
    } else {
      console.log("No se encontraron categorías");
      return [];
    }
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
};

// Función para subir imágenes a Firebase Storage
export const uploadImages = async (files) => {
  const storage = getStorage(); // Inicializar Firebase Storage
  const uploadedUrls = []; // Array para guardar URLs de descarga

  for (const file of files) {
    try {
      // Crear referencia en la ubicación deseada en Firebase Storage
      const storageRef = ref(storage, `products/${file.name}`);

      // Subir el archivo al bucket de Firebase Storage
      console.log(`Subiendo archivo: ${file.name} a Firebase Storage...`);
      const uploadResult = await uploadBytes(storageRef, file);
      console.log("Archivo subido correctamente:", uploadResult);

      // Obtener la URL pública del archivo
      const downloadURL = await getDownloadURL(storageRef);
      console.log(`URL pública del archivo: ${downloadURL}`);
      uploadedUrls.push(downloadURL);
    } catch (error) {
      console.error(`Error subiendo el archivo ${file.name}:`, error);
      throw error;
    }
  }

  return uploadedUrls; // Devuelve todas las URLs generadas
};

// Función para agregar un producto a Firestore
export const addProductToFirestore = async (product) => {
  try {
    const db = getFirestore();
    const productsRef = collection(db, "products"); // Referencia a la colección "products"
    await addDoc(productsRef, product);
    console.log("Producto agregado correctamente");
  } catch (error) {
    console.error("Error al agregar producto a Firestore:", error);
    throw error;
  }
};

// Función para obtener las categorías de juegos desde Firestore (únicamente un documento)
export const fetchGameCategories = async () => {
  try {
    const docRef = doc(db, "gameCategories", "categories"); // Referencia al documento único
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().categories || []; // Devuelve el array de categorías
    } else {
      console.log("No se encontraron categorías");
      return [];
    }
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
};
