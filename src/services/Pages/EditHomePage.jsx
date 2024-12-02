// src/Pages/Home-editor/EditHomePage.jsx
import React, { useState, useEffect } from "react";
import { getHomeContent } from "../Pages/Home-editor/getHomeContent"; 
import EditBannerSections from "../Pages/Home-editor/EditBannerSections";  // Importar el componente EditBannerSections
import EditOffers from "../Pages/Home-editor/EditOffers";  // Importar el componente EditOffers
import ManageOffers from "../Pages/Home-editor/ManageOffers";  // Importar el componente ManageOffers
import EditProductCategories from "../Pages/Home-editor/EditProductCategories"; // Importar el componente EditProductCategories

const EditHomePage = () => {
  const [homeContent, setHomeContent] = useState(null);
  const [formData, setFormData] = useState([]);
  const [offerData, setOfferData] = useState([]);  // Para almacenar juegos en oferta
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados según la categoría

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHomeContent();
      if (data) {
        setHomeContent(data);
        setFormData(data.sections || []);
        setOfferData(data.offers || []);  // Cargar ofertas
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Página de Inicio</h1>

      {/* Componente EditBannerSections para gestionar las secciones del banner */}
      <EditBannerSections formData={formData} setFormData={setFormData} />

      {/* Componente EditOffers para agregar nuevas ofertas */}
      <EditOffers offerData={offerData} setOfferData={setOfferData} />

      {/* Componente ManageOffers para editar o eliminar ofertas existentes */}
      <ManageOffers offerData={offerData} setOfferData={setOfferData} />

      {/* Componente EditProductCategories para seleccionar categoría de productos */}
      <EditProductCategories filteredProducts={filteredProducts} setFilteredProducts={setFilteredProducts} 
      />
    </div>
  );
};

export default EditHomePage;
