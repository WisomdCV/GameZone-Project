import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { storage } from "../../../../firebase"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 

const EditOffers = ({ offerData, setOfferData }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error al cargar los productos: ", error);
      }
    };

    fetchProducts();
  }, []);

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const storageRef = ref(storage, `offers/game_${index + 1}/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        const newOfferData = [...offerData];
        newOfferData[index].image = downloadURL;
        setOfferData(newOfferData);
        setLoading(false);
        alert("Imagen subida con éxito");
      } catch (error) {
        console.error("Error al subir la imagen: ", error);
        setLoading(false);
      }
    }
  };

  const handleAddOffer = async () => {
    if (selectedProduct && discount > 0) {
      const newOffer = {
        productId: selectedProduct.id,
        gameName: selectedProduct.name,
        discount: discount,
        originalPrice: selectedProduct.price,
        priceWithDiscount: selectedProduct.price - (selectedProduct.price * (discount / 100)),
        image: selectedProduct.images[0] || "",
      };

      setOfferData([...offerData, newOffer]);

      // Actualizar el producto en la base de datos para reflejar la oferta
      const productRef = doc(db, "products", selectedProduct.id);
      await updateDoc(productRef, {
        offer: newOffer,
      });

      // Limpiar campos
      setSelectedProduct(null);
      setDiscount(0);
      alert("Oferta aplicada con éxito");
    } else {
      alert("Por favor selecciona un producto y un descuento");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 mt-12">Juegos en Oferta</h2>

      {/* Selección de producto */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Seleccionar Producto</label>
        <select
          onChange={(e) => {
            const selected = products.find(
              (product) => product.id === e.target.value
            );
            setSelectedProduct(selected);
          }}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Selecciona un producto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} - {product.category}
            </option>
          ))}
        </select>
      </div>

      {/* Ingresar porcentaje de descuento */}
      {selectedProduct && (
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Descuento (%)</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      )}

      {/* Mostrar información del producto seleccionado */}
      {selectedProduct && (
        <div className="mb-4">
          <p><strong>Precio Original:</strong> ${selectedProduct.price}</p>
          <p>
            <strong>Precio con Descuento:</strong> $
            {(selectedProduct.price - (selectedProduct.price * (discount / 100))).toFixed(2)}
          </p>
        </div>
      )}

      {/* Agregar la oferta */}
      <button
        onClick={handleAddOffer}
        className="bg-yellow-600 text-white px-6 py-3 rounded-md mt-6 hover:bg-yellow-700 transition"
      >
        Aplicar Oferta
      </button>

      {/* Mostrar las ofertas ya agregadas */}
      <h3 className="mt-6 text-xl font-semibold">Ofertas Actuales</h3>
      {offerData.map((offer, index) => (
        <div key={index} className="my-6 p-4 border rounded-lg bg-gray-50">
          <h4 className="text-lg font-bold">{offer.gameName}</h4>
          <p className="text-gray-600">Descuento: {offer.discount}%</p>
          <p className="text-gray-600">Precio Original: ${offer.originalPrice}</p>
          <p className="text-gray-600">Precio con Descuento: ${offer.priceWithDiscount}</p>
          <img src={offer.image} alt={offer.gameName} className="w-20 h-20 object-cover rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default EditOffers;
