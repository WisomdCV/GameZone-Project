import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase";
import { collection, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Categoría seleccionada para editar
  const [modalOpen, setModalOpen] = useState(false); // Estado del modal

  useEffect(() => {
    // Suscribirse a los cambios en tiempo real
    const unsubscribe = onSnapshot(
      collection(db, "categories"),
      (snapshot) => {
        const categoriesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesData);
      },
      (error) => {
        console.error("Error al cargar categorías:", error);
      }
    );

    // Limpieza al desmontar el componente
    return () => unsubscribe();
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    try {
      const categoryRef = doc(db, "categories", categoryId);
      await deleteDoc(categoryRef);
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category); // Selecciona la categoría
    setModalOpen(true); // Abre el modal
  };

  const handleSaveCategory = async () => {
    try {
      const categoryRef = doc(db, "categories", selectedCategory.id);
      await updateDoc(categoryRef, {
        name: selectedCategory.name,
        subcategories: selectedCategory.subcategories,
      });
      setModalOpen(false); // Cierra el modal
      alert("Categoría actualizada correctamente.");
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
      alert("Hubo un error al actualizar la categoría.");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false); // Cierra el modal sin guardar
    setSelectedCategory(null);
  };

  const handleAddSubcategory = () => {
    setSelectedCategory((prev) => ({
      ...prev,
      subcategories: [...(prev.subcategories || []), ""],
    }));
  };

  const handleSubcategoryChange = (index, value) => {
    const updatedSubcategories = [...selectedCategory.subcategories];
    updatedSubcategories[index] = value;
    setSelectedCategory((prev) => ({
      ...prev,
      subcategories: updatedSubcategories,
    }));
  };

  const handleDeleteSubcategory = (index) => {
    const updatedSubcategories = selectedCategory.subcategories.filter((_, i) => i !== index);
    setSelectedCategory((prev) => ({
      ...prev,
      subcategories: updatedSubcategories,
    }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full mx-auto mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Lista de Categorías</h3>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category.id}
            className="bg-gray-100 p-3 rounded-md shadow-sm"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-medium">{category.name}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
            {category.subcategories && category.subcategories.length > 0 && (
              <ul className="ml-4 mt-2">
                {category.subcategories.map((subcategory, index) => (
                  <li
                    key={index}
                    className="text-gray-600 text-sm bg-gray-50 p-2 rounded-md mt-1"
                  >
                    {subcategory}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Modal de edición */}
      {modalOpen && selectedCategory && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Editar Categoría</h2>
            <label className="block mb-2">
              Nombre:
              <input
                type="text"
                value={selectedCategory.name}
                onChange={(e) =>
                  setSelectedCategory((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full border-gray-300 rounded-md p-2 mt-1"
              />
            </label>
            <div className="mb-4">
              <h3 className="font-medium">Subcategorías:</h3>
              {selectedCategory.subcategories.map((subcategory, index) => (
                <div key={index} className="flex items-center mt-2">
                  <input
                    type="text"
                    value={subcategory}
                    onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                    className="w-full border-gray-300 rounded-md p-2"
                  />
                  <button
                    onClick={() => handleDeleteSubcategory(index)}
                    className="text-red-600 ml-2 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddSubcategory}
                className="text-blue-600 mt-2 hover:text-blue-800"
              >
                Agregar Subcategoría
              </button>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveCategory}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
