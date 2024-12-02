import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase";
import { getDocs, collection, updateDoc, doc, getDoc } from "firebase/firestore";

const AddSubcategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [message, setMessage] = useState(""); // Mensaje de confirmación

  // Cargar categorías desde Firebase
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesSnapshot = await getDocs(collection(db, "categories"));
        const categoriesData = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  // Cargar subcategorías de la categoría seleccionada
  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategoryId) {
        try {
          const categoryRef = doc(db, "categories", selectedCategoryId);
          const categorySnapshot = await getDoc(categoryRef);
          const subcategoriesData = categorySnapshot.data()?.subcategories || [];
          setSubcategories(subcategoriesData);
        } catch (error) {
          console.error("Error al cargar subcategorías:", error);
        }
      } else {
        setSubcategories([]);
      }
    };
    fetchSubcategories();
  }, [selectedCategoryId]);

  // Manejar la adición de una nueva subcategoría
  const handleAddSubcategory = async () => {
    if (subcategoryName.trim() && selectedCategoryId) {
      const updatedSubcategories = [...subcategories, subcategoryName.trim()];
      try {
        const categoryRef = doc(db, "categories", selectedCategoryId);
        await updateDoc(categoryRef, { subcategories: updatedSubcategories });
        setSubcategories(updatedSubcategories); // Actualizar el estado local
        setSubcategoryName(""); // Limpiar el campo de entrada
        setMessage("Subcategoría agregada correctamente.");
        setTimeout(() => setMessage(""), 3000); // Limpiar el mensaje después de 3 segundos
      } catch (error) {
        console.error("Error al agregar subcategoría:", error);
        setMessage("Error al agregar subcategoría. Intenta de nuevo.");
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2 mx-auto mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Agregar Subcategoría</h3>
      <div className="space-y-4">
        {/* Seleccionar Categoría */}
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Selecciona una Categoría</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Campo para agregar subcategoría */}
        <input
          type="text"
          placeholder="Nombre de la Subcategoría"
          value={subcategoryName}
          onChange={(e) => setSubcategoryName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddSubcategory}
          className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition-colors"
        >
          Agregar Subcategoría
        </button>

        {/* Mensaje de confirmación */}
        {message && <p className="text-green-600 mt-2">{message}</p>}
      </div>

      {/* Lista de subcategorías */}
      <ul className="mt-4">
        {subcategories.map((subcategory, index) => (
          <li key={index} className="flex justify-between items-center border-b py-2 text-gray-700">
            {subcategory}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddSubcategory;
