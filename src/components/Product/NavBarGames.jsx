import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";

const NavBarGames = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Obtener categorías de juegos desde Firestore
        const docRef = doc(db, "gameCategories", "categories");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setCategories(data.categories || []); // 'categories' es un array de categorías
        }
      } catch (error) {
        console.error("Error al obtener las categorías de juegos:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    // Navegar a una URL con el parámetro específico de categoría de juegos
    navigate(`/products?gameCategories=${category}`);
  };

  // Función para obtener las iniciales de las categorías
  const getInitials = (category) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join(""); // Toma las iniciales y las junta
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 shadow-lg">
      <div className="container mx-auto">
        {/* Contenedor con barra de desplazamiento horizontal */}
        <div className="overflow-x-auto">
          <ul className="flex gap-4 px-4">
            {categories.map((category, index) => (
              <li
                key={index}
                className="cursor-pointer bg-white text-black py-1.5 px-3 rounded-md shadow-md hover:bg-yellow-300 transition duration-300 transform hover:scale-105 whitespace-nowrap min-w-max text-xs flex items-center justify-center"
                onClick={() => handleCategoryClick(category)}
              >
                {category.length > 10 ? getInitials(category) : category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBarGames;
