import { db, storage } from "../../firebase"; // Importar Firestore y Storage configurados
import { collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

/**
 * Obtener categorías desde Firestore
 */
export const fetchCategories = async () => {
  try {
    const categoriesSnapshot = await getDocs(collection(db, "categories"));
    return categoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error al cargar categorías:", error);
    throw new Error("No se pudieron cargar las categorías");
  }
};

/**
 * Subir imágenes a Firebase Storage
 * @param {File[]} files - Archivos a subir
 * @returns {Promise<string[]>} URLs de las imágenes subidas
 */
export const uploadImages = async (files) => {
  const uploadedUrls = [];

  for (const file of files) {
    try {
      const uniqueFileName = `products/${uuidv4()}-${file.name}`;
      const storageRef = ref(storage, uniqueFileName);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      uploadedUrls.push(downloadURL);
    } catch (error) {
      console.error(`Error al subir la imagen ${file.name}:`, error);
      throw new Error(`Error al subir la imagen: ${file.name}`);
    }
  }

  return uploadedUrls;
};

/**
 * Agregar un nuevo producto a Firestore
 * @param {Object} productData - Datos del producto
 */
export const addProductToFirestore = async (productData) => {
  try {
    await addDoc(collection(db, "products"), {
      ...productData,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    throw new Error("Error al guardar el producto en Firestore");
  }
};
