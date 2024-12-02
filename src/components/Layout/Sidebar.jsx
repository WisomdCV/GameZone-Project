import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null); // Estado para manejar la categoría abierta
  const navigate = useNavigate();

  // Obtener categorías desde Firebase
  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoriesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesArray);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Manejar la selección de la categoría
  const handleCategorySelect = (categoryName) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName); // Alterna la categoría abierta
    navigate(`/products?categoria=${categoryName}`);
  };

  // Manejar la selección de la subcategoría
  const handleSubcategorySelect = (categoryName, subcategoryName) => {
    navigate(`/products?categoria=${categoryName}&subcategoria=${subcategoryName}`);
  };

  return (
    <aside className="bg-white w-64 p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Categorías</h2>
      <ul className="space-y-6">
        {categories.map((category) => (
          <li key={category.id}>
            <div>
              <button
                onClick={() => handleCategorySelect(category.name)}
                className="flex items-center justify-between w-full text-gray-700 hover:text-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-50 focus:outline-none transition duration-300 ease-in-out"
              >
                <span className="font-medium">{category.name}</span>
                {/* Icono de flecha para mostrar/ocultar subcategorías */}
                <span
                  className={`transform transition-transform ${
                    openCategory === category.name ? "rotate-90" : ""
                  }`}
                >
                  ➤
                </span>
              </button>
              {/* Subcategorías */}
              {openCategory === category.name && category.subcategories && (
                <ul className="ml-4 mt-4 space-y-2">
                  {category.subcategories.map((subcategory, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleSubcategorySelect(category.name, subcategory)}
                        className="w-full text-gray-600 hover:text-yellow-500 block px-4 py-2 rounded-lg hover:bg-yellow-100 transition duration-300 ease-in-out"
                      >
                        {subcategory}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
