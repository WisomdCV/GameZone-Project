import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";

// Función para obtener el contenido del home
export const getHomeContent = async () => {
  try {
    const docRef = doc(db, "homeContent", "homePage");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.error("No se encontró el contenido de la página de inicio");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener los datos de Firebase: ", error);
  }
};

// Función para actualizar el contenido del home
export const updateHomeContent = async (updatedContent) => {
  try {
    const docRef = doc(db, "homeContent", "homePage");
    await setDoc(docRef, updatedContent);
    console.log("Contenido actualizado con éxito");
  } catch (error) {
    console.error("Error al actualizar el contenido de Firebase: ", error);
  }
};

// **Nueva función para obtener las categorías**
export const getCategories = async () => {
  try {
    const categoriesRef = collection(db, "categories");
    const querySnapshot = await getDocs(categoriesRef);
    const categories = [];
    querySnapshot.forEach((doc) => {
      categories.push({ id: doc.id, ...doc.data() }); // Agrega el id y los datos de cada categoría
    });
    return categories;
  } catch (error) {
    console.error("Error al obtener las categorías de Firebase: ", error);
    return [];
  }
};
