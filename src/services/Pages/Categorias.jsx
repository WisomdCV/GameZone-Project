import React, { useState } from "react";
import AddCategory from "./Categorias/AddCategory";
import AddSubcategory from "./Categorias/AddSubcategory";
import CategoryList from "./Categorias/CategoryList";
import AddGameCategory from "./Categorias/AddGameCategory"; // Importamos el nuevo componente

const Categorias = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <AddCategory />
        <AddSubcategory categoryId={selectedCategoryId} />
      </div>

      {/* Nuevo bloque para agregar game categories */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Agregar Categorías de Juegos</h3>
        <AddGameCategory /> {/* Aquí renderizamos el componente AddGameCategory */}
      </div>

      <CategoryList />
    </div>
  );
};

export default Categorias;
