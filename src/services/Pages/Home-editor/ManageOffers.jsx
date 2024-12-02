import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase";
import { collection, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { storage } from "../../../../firebase"; 
import { ref, deleteObject } from "firebase/storage";

const ManageOffers = ({ offerData, setOfferData }) => {
  const [products, setProducts] = useState([]);

  // Fetch products with offers in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (querySnapshot) => {
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    }, (error) => {
      console.error("Error al cargar los productos: ", error);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Handle offer edit
  const handleEditOffer = async (product, newDiscount) => {
    const updatedProduct = {
      ...product,
      offer: {
        ...product.offer,
        discount: newDiscount,
        priceWithDiscount: product.price - (product.price * (newDiscount / 100)),
      }
    };

    const productRef = doc(db, "products", product.id);
    await updateDoc(productRef, {
      offer: updatedProduct.offer,
    });

    // Update offerData state
    const updatedOfferData = offerData.map((offer) => 
      offer.productId === product.id ? updatedProduct.offer : offer
    );
    setOfferData(updatedOfferData);
    alert("Oferta actualizada con éxito");
  };

  // Handle offer deletion
  const handleDeleteOffer = async (product) => {
    const productRef = doc(db, "products", product.id);
    
    // If an image exists in the offer, delete it from Firebase Storage
    if (product.offer.image) {
      const imageRef = ref(storage, product.offer.image);
      try {
        await deleteObject(imageRef);
        console.log("Imagen eliminada con éxito");
      } catch (error) {
        console.error("Error al eliminar la imagen: ", error);
      }
    }

    // Delete the offer field in the product document
    await updateDoc(productRef, {
      offer: null,
    });

    // Update offerData state to remove the deleted offer
    const updatedOfferData = offerData.filter((offer) => offer.productId !== product.id);
    setOfferData(updatedOfferData);
    alert("Oferta eliminada con éxito");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 mt-12">Gestionar Ofertas</h2>

      {/* Grid de productos con oferta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => 
          product.offer && (
            <div key={product.id} className="p-4 border rounded-lg bg-gray-50 shadow-md hover:shadow-lg transition">
              <img 
                src={product.offer.image} 
                alt={product.offer.gameName} 
                className="w-full h-40 object-cover rounded-md mb-4" 
              />
              <h4 className="text-lg font-semibold text-gray-800">{product.offer.gameName}</h4>
              <p className="text-gray-600">Descuento: {product.offer.discount}%</p>
              <p className="text-gray-600">Precio Original: ${product.price}</p>
              <p className="text-gray-600">Precio con Descuento: ${product.offer.priceWithDiscount}</p>

              {/* Botones de edición y eliminación */}
              <div className="mt-4 flex justify-between space-x-2">
                <button
                  onClick={() => handleEditOffer(product, prompt("Nuevo descuento (%)", product.offer.discount))}
                  className="bg-yellow-600 text-white px-3 py-2 rounded-md hover:bg-yellow-700 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteOffer(product)}
                  className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ManageOffers;
