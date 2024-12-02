import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { useCart } from "../../components/Cart/CartContext";
import NavBarGames from "../../components/Product/NavBarGames";  // Asegúrate de importar el NavBarGames

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const { addToCart, cartItems } = useCart(); // Usamos addToCart y cartItems

  const params = new URLSearchParams(location.search);
  const selectedCategory = params.get("categoria");  // Parámetro de categoría
  const selectedSubcategory = params.get("subcategoria");  // Parámetro de subcategoría
  const selectedgameCategories = params.get("gameCategories") || '';

  const fetchProducts = async () => {
    try {
      let productsQuery = collection(db, "products");

      // Filtro por categoría principal (campo "category")
      if (selectedCategory) {
        productsQuery = query(
          productsQuery,
          where("category", "==", selectedCategory.trim()) // Filtro por categoría principal
        );
      }

      // Filtro por subcategoría (campo "subcategories")
      if (selectedSubcategory) {
        productsQuery = query(
          productsQuery,
          where("subcategories", "array-contains", selectedSubcategory.trim()) // Filtro por subcategoría
          
        );
      

      }

        // Filtro por categoría de juegos dentro de "gameCategories"
      if (selectedgameCategories && selectedgameCategories.trim()) {
        productsQuery = query(
          productsQuery,
          where("gameCategories", "array-contains", selectedgameCategories.trim())
        );
        console.log("selectedgameCategories con espacio trim:", selectedgameCategories.trim());

      }
        



      // Realizar la consulta a Firebase
      const querySnapshot = await getDocs(productsQuery);

      // Mapear los documentos a un array de productos
      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Actualizar el estado con los productos filtrados
      setProducts(productsArray);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedSubcategory,selectedgameCategories]);

  const findCartQuantity = (id) => {
    const item = cartItems.find((cartItem) => cartItem.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <div>
      <NavBarGames />  {/* Agregar el NavBarGames aquí */}

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Productos</h1>

        {selectedCategory && (
          <p className="text-lg text-gray-600 mb-2">
            <strong>Categoría seleccionada:</strong> {selectedCategory}
          </p>
        )}
        {selectedSubcategory && (
          <p className="text-lg text-gray-600 mb-6">
            <strong>Subcategoría seleccionada:</strong> {selectedSubcategory}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm mt-2">
                    {product.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Categoría: {product.category}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-green-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        product.stock > 0
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {product.stock > 0 ? `Stock: ${product.stock}` : "Sin stock"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={() => addToCart(product)} // Agregar al carrito
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out"
                      disabled={product.stock <= 0} // Deshabilitar si no hay stock
                    >
                      Agregar
                    </button>
                    <span className="text-sm px-4 py-1 bg-gray-100 text-gray-800 rounded-lg">
                      {findCartQuantity(product.id)} en carrito
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No hay productos disponibles.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
