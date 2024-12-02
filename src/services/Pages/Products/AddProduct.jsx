import React, { useState } from "react";
import ProductNameDescriptionImage from "../Products/ProductNameDescriptionImage.jsx";
import PriceStock from "./PriceStock.jsx";
import { uploadImages, addProductToFirestore } from "./AddProductService";
import CategorySelection from "./CategorySelection.jsx";  // Importa el nuevo componente
import GameCategorySelection from "./GameCategorySelection.jsx"; // Importar el nuevo componente

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // Nuevo estado para la categoría
  const [selectedGameCategories, setSelectedGameCategories] = useState([]); // Estado para las categorías de juego

  // Función para limpiar los campos del formulario
  const clearForm = () => {
    setProductName("");
    setDescription("");
    setPrice(0);
    setStock(0);
    setImages([]);
    setSelectedCategory(null);
    setSelectedGameCategories([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrls = await uploadImages(images);
      if (!imageUrls.length) {
        alert("No se pudieron subir las imágenes.");
        return;
      }

      // Verifica si hay categoría seleccionada
      if (!selectedCategory) {
        alert("Por favor, selecciona una categoría.");
        return;
      }

      await addProductToFirestore({
        name: productName,
        description,
        price: Number(price),
        stock: Number(stock),
        images: imageUrls,
        category: selectedCategory.name,
        subcategories: selectedCategory.selectedSubcategories || [], // Usar solo las subcategorías seleccionadas
        gameCategories: selectedGameCategories, // Agregar las categorías de juego al producto
      });

      alert("Producto agregado exitosamente");
      clearForm();  // Limpiar los campos después de agregar el producto
    } catch (error) {
      alert("Hubo un error al agregar el producto. Intenta nuevamente.");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-3/4 mx-auto mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Agregar Producto</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <ProductNameDescriptionImage
          productName={productName}
          setProductName={setProductName}
          description={description}
          setDescription={setDescription}
          images={images}
          setImages={setImages}
        />
        <PriceStock price={price} setPrice={setPrice} stock={stock} setStock={setStock} />
        <CategorySelection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <GameCategorySelection
          selectedGameCategories={selectedGameCategories}
          setSelectedGameCategories={setSelectedGameCategories}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors"
        >
          Agregar Producto
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
