import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore"; // Añadido setDoc para guardar datos

const EditProductCategories = ({ filteredProducts, setFilteredProducts }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // Para mostrar si los datos han sido guardados
  const [selectedProducts, setSelectedProducts] = useState([]); // Para manejar la selección de productos

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      setLoading(true);
      try {
        // Cargar productos desde Firebase
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsData);

        // Extraer categorías únicas
        const allCategories = new Set();
        productsData.forEach((product) => {
          product.gameCategories.forEach((category) => {
            allCategories.add(category);
          });
        });
        setCategories([...allCategories]);
      } catch (error) {
        console.error("Error al cargar los productos o categorías:", error);
      }
      setLoading(false);
    };

    fetchProductsAndCategories();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);

    // Filtrar productos por la categoría seleccionada
    const filtered = products.filter((product) =>
      product.gameCategories.includes(category)
    );
    setFilteredProducts(filtered); // Actualizar los productos filtrados en el estado padre
  };

  const handleProductSelection = (product, isChecked) => {
    if (isChecked) {
      // Agregar el producto seleccionado al array
      setSelectedProducts((prevSelected) => [...prevSelected, product]);
    } else {
      // Eliminar el producto deseleccionado del array
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((p) => p.id !== product.id)
      );
    }
  };

  const handleSave = async () => {
    if (!selectedCategory || selectedProducts.length === 0) {
      alert("Selecciona una categoría y asegúrate de que haya productos seleccionados para guardar.");
      return;
    }

    try {
      // Aquí creamos una nueva entrada en Firebase para guardar esta selección
      const docRef = doc(collection(db, "selectedCategories"), selectedCategory); // Guarda la categoría seleccionada
      await setDoc(docRef, {
        category: selectedCategory,
        products: selectedProducts.map(product => ({
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          images: product.images,
        }))
      });
      console.log("Categoría seleccionada y productos guardados en Firebase.");
      setIsSaved(true); // Marcar como guardado
    } catch (error) {
      console.error("Error al guardar la categoría seleccionada:", error);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Seleccionar Categoría de Juego</h2>
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

      {/* Mostrar los productos filtrados según la categoría seleccionada */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {loading ? (
          <p>Cargando productos...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 border rounded-lg shadow-md">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h4 className="font-semibold text-sm mb-2">{product.name}</h4>
              <p className="text-xs mb-2">{product.description}</p>
              <p className="text-sm text-gray-600"><strong>Precio:</strong> ${product.price}</p>
              <label className="mt-2 block text-sm">
                <input
                  type="checkbox"
                  onChange={(e) => handleProductSelection(product, e.target.checked)}
                  className="mr-2"
                />
                Seleccionar para guardar
              </label>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles en esta categoría.</p>
        )}
      </div>

      {/* Botón de guardar */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Guardar Categoría y Productos
        </button>
      </div>

      {/* Mostrar mensaje de éxito si se guardó correctamente */}
      {isSaved && (
        <div className="mt-4 text-green-500 font-semibold">
          ¡Datos guardados exitosamente!
        </div>
      )}
    </div>
  );
};

export default EditProductCategories;
