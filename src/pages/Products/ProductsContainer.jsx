// src/pages/Products/ProductsContainer.jsx
import React, { useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import ProductsPage from "./ProductsPage";

const ProductsContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Función para manejar la selección de categoría
  const handleCategorySelect = (category) => {
    // Si ya se ha seleccionado una subcategoría, mantenla al cambiar la categoría
    if (selectedSubcategory) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(category);
      setSelectedSubcategory(null); // Opción: resetear subcategoría solo si no hay una seleccionada
    }
  };

  // Función para manejar la selección de subcategoría
  const handleSubcategorySelect = (category, subcategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        onCategorySelect={handleCategorySelect}
        onSubcategorySelect={handleSubcategorySelect}
      />

      {/* Página de Productos */}
      <div className="flex-grow p-6">
        <ProductsPage
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
        />
      </div>
    </div>
  );
};


export default ProductsContainer;
