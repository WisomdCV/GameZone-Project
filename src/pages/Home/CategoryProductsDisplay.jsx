import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const CategoryProductsDisplay = ({ selectedCategories }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectedCategories || selectedCategories.length === 0) {
        console.warn("No se seleccionaron categorías.");
        setProducts([]); // Limpia los productos si no hay categorías seleccionadas
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const q = query(
          collection(db, "products"),
          where("category", "in", selectedCategories)
        );
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategories]);

  return (
    <div className="my-12">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Productos en Categorías Seleccionadas
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading ? (
          <p className="text-center w-full col-span-4">Cargando productos...</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md text-center"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.category}</p>
              <p className="mt-2 text-sm text-gray-600">
                <strong>Precio:</strong> ${product.price}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center w-full col-span-4">No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProductsDisplay;
