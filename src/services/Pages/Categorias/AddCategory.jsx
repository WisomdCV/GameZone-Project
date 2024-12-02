import React, { useState } from "react";
import { db } from "../../../../firebase";
import { collection, addDoc } from "firebase/firestore";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "categories"), {
        name: categoryName,
      });
      setCategoryName(""); // Limpiar el campo después de agregar
    } catch (error) {
      console.error("Error al agregar categoría: ", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2 mx-auto mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Agregar Categoría</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campo para el nombre de la categoría */}
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
        {/* Botón para agregar categoría */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Agregar Categoría
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
