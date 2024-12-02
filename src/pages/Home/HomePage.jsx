import React, { useState, useEffect } from "react";
import { getHomeContent } from "../../services/Pages/Home-editor/getHomeContent";
import Banner from "./Banner";
import OffersDisplay from "./OffersDisplay";
import CategoryProductsDisplay from "./CategoryProductsDisplay";

const HomePage = () => {
  const [homeContent, setHomeContent] = useState(null);

  // Cargar el contenido principal (carrousel)
  useEffect(() => {
    const fetchData = async () => {
      const data = await getHomeContent();
      if (data) {
        setHomeContent(data);
      }
    };
    fetchData();
  }, []);

  if (!homeContent) {
    return (
      <p className="text-center text-xl font-semibold text-gray-700">
        Cargando contenido...
      </p>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <h1 className="text-5xl font-bold text-gray-800 mb-12 text-center">
        Bienvenido a Nuestra Tienda
      </h1>

      {/* Componente del Carrusel (Banner) */}
      <Banner homeContent={homeContent} />

      {/* Componente de Juegos en Oferta */}
      <OffersDisplay />

      {/* Sección de Categorías */}
      <CategoryProductsDisplay />


      {/* Sección de Productos Destacados */}
      <div className="my-12">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Productos Destacados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Producto 1"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800">Producto 1</h3>
            <p className="text-sm text-gray-600">Descripción del producto</p>
            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Ver Producto
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Producto 2"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800">Producto 2</h3>
            <p className="text-sm text-gray-600">Descripción del producto</p>
            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Ver Producto
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <img
              src="https://via.placeholder.com/300x200"
              alt="Producto 3"
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800">Producto 3</h3>
            <p className="text-sm text-gray-600">Descripción del producto</p>
            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Ver Producto
            </button>
          </div>
        </div>
      </div>

      {/* Banner Promocional Estático */}
      <div className="bg-blue-600 text-white p-8 text-center rounded-lg shadow-lg mb-12">
        <h2 className="text-3xl font-semibold mb-4">¡Gran Venta de Fin de Año!</h2>
        <p className="text-lg mb-4">Obtén descuentos de hasta el 50% en productos seleccionados.</p>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100">
          Ver Ofertas
        </button>
      </div>


    </div>
  );
};

export default HomePage;
