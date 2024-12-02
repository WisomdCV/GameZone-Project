import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase"; // Asegúrate de importar correctamente Firebase
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

const AddGameCategory = () => {
  const [categoryName, setCategoryName] = useState(""); // Para almacenar el nombre de la categoría
  const [categories, setCategories] = useState([]); // Para almacenar las categorías de la base de datos
  const [error, setError] = useState(""); // Para manejar errores
  const documentId = "categories"; // ID único para el documento en la colección "gameCategories"

  // Cargar categorías existentes al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const docRef = doc(db, "gameCategories", documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCategories(data.categories || []);
        } else {
          // Si el documento no existe, lo creamos con un array vacío
          await setDoc(docRef, { categories: [] });
          setCategories([]);
        }
      } catch (error) {
        console.error("Error al obtener las categorías: ", error);
        setError("Hubo un error al cargar las categorías.");
      }
    };

    fetchCategories();
  }, []);

  // Manejar la adición de una nueva categoría
  const handleAddCategory = async (e) => {
    e.preventDefault();

    // Validar que la categoría no esté vacía ni duplicada
    if (!categoryName) {
      setError("Por favor, ingrese una categoría.");
      return;
    }
    if (categories.includes(categoryName)) {
      setError("La categoría ya existe.");
      return;
    }

    try {
      // Actualizar el documento único con la nueva categoría
      const docRef = doc(db, "gameCategories", documentId);
      const updatedCategories = [...categories, categoryName];

      await updateDoc(docRef, { categories: updatedCategories });

      // Actualizamos el estado local con la nueva categoría
      setCategories(updatedCategories);
      setCategoryName(""); // Limpiamos el campo de entrada
      setError(""); // Limpiamos el mensaje de error
    } catch (error) {
      console.error("Error al agregar categoría: ", error);
      setError("Hubo un error al agregar la categoría.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2 mx-auto mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Agregar Categoría de Juego</h3>

      {/* Mensaje de error si hay */}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {/* Formulario para agregar la categoría */}
      <form onSubmit={handleAddCategory} className="space-y-4">
        <div>
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-600">
            Nombre de la Categoría
          </label>
          <input
            type="text"
            id="categoryName"
            placeholder="Escribe el nombre de la categoría"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Botón para agregar la categoría */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Agregar Categoría
        </button>
      </form>

      {/* Mostrar las categorías agregadas */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Categorías Agregadas</h4>
        <ul className="list-disc pl-5">
          {categories.map((category, index) => (
            <li key={index} className="text-gray-700">{category}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddGameCategory;
