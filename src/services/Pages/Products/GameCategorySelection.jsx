import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase"; // Asegúrate de importar correctamente Firebase
import { doc, getDoc } from "firebase/firestore";

const GameCategorySelection = ({ selectedGameCategories, setSelectedGameCategories }) => {
  const [gameCategories, setGameCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGameCategories = async () => {
      try {
        const docRef = doc(db, "gameCategories", "categories"); // Ajusta el documento de Firebase
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setGameCategories(data.categories || []);
        } else {
          setError("No se encontraron categorías de juego.");
        }
      } catch (error) {
        console.error("Error al obtener las categorías de juego: ", error);
        setError("Hubo un error al cargar las categorías de juego.");
      }
    };

    fetchGameCategories();
  }, []);

  const handleGameCategoryToggle = (category) => {
    const isSelected = selectedGameCategories.includes(category);
    const updatedGameCategories = isSelected
      ? selectedGameCategories.filter((cat) => cat !== category)
      : [...selectedGameCategories, category];

    setSelectedGameCategories(updatedGameCategories);
  };

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div>
        <label className="block font-medium text-gray-700">Categorías de Juego:</label>
        <div className="flex flex-wrap gap-4 mt-2">
          {gameCategories.map((category, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={`gameCategory-${index}`}
                checked={selectedGameCategories.includes(category)}
                onChange={() => handleGameCategoryToggle(category)}
                className="mr-2"
              />
              <label htmlFor={`gameCategory-${index}`} className="text-gray-700">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCategorySelection;
