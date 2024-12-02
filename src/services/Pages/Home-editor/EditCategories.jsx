import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase";
import { collection, getDocs } from "firebase/firestore";

const EditCategories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);

  // Cargar productos y categorías
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Cargar productos
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Extraer categorías únicas de los productos
        const allCategories = new Set();
        productsData.forEach((product) => {
          product.gameCategories.forEach((category) => {
            allCategories.add(category);  // Agregar cada categoría al Set
          });
        });
        
        setCategories([...allCategories]);  // Convertir Set a array
        setProducts(productsData);
        setFilteredProducts(productsData);  // Mostrar todos los productos inicialmente
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Filtrar productos por categoría
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);

    // Filtrar productos que tienen la categoría seleccionada
    const filtered = products.filter((product) =>
      product.gameCategories.includes(category)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 mt-12">Gestionar Juegos por Categoría</h2>

      {/* Selección de categoría */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Seleccionar Categoría</label>
        <select
          onChange={(e) => handleCategorySelect(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Mostrar productos filtrados */}
      <h3 className="mt-6 text-xl font-semibold">Productos en la categoría "{selectedCategory}"</h3>
      {loading ? (
        <p>Cargando...</p>
      ) : filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product.id} className="p-4 border mb-4 rounded-md">
            <h4 className="font-semibold">{product.name}</h4>
            <p>{product.description}</p>
            <p><strong>Precio:</strong> ${product.price}</p>
            <img src={product.images[0]} alt={product.name} className="w-20 h-20 object-cover" />
          </div>
        ))
      ) : (
        <p>No hay productos en esta categoría.</p>
      )}
    </div>
  );
};

export default EditCategories;
