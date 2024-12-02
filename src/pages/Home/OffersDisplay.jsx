import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const OffersDisplay = () => {
  const [productsOnOffer, setProductsOnOffer] = useState([]);

  // Cargar los productos con oferta
  useEffect(() => {
    const fetchProductsOnOffer = async () => {
      try {
        // Filtramos por productos que tienen un descuento mayor a 0
        const q = query(collection(db, "products"), where("offer.discount", ">", 0)); 
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductsOnOffer(productsData);
      } catch (error) {
        console.error("Error al obtener los productos con oferta:", error);
      }
    };

    fetchProductsOnOffer();
  }, []);

  return (
    <div className="my-12">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Juegos en Oferta
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {productsOnOffer.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.category}</p>
            <div className="mt-2 flex items-center">
              <span className="text-xl font-semibold text-gray-800 line-through mr-2">
                ${product.price}
              </span>
              <span className="text-xl font-semibold text-red-600">
                ${(
                  product.price -
                  product.price * (product.offer.discount / 100)
                ).toFixed(2)}
              </span>
            </div>
            <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Ver Producto
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersDisplay;
