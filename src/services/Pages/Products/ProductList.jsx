import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase";
import { collection, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";  // Importa onSnapshot

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado para editar
  const [modalOpen, setModalOpen] = useState(false); // Estado del modal

  // Cambiar getDocs por onSnapshot para escuchar cambios en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData); // Actualizar el estado con los productos en tiempo real
    });

    // Limpiar la suscripción cuando el componente se desmonte
    return () => unsubscribe();
  }, []); // Este useEffect se ejecuta solo una vez cuando se monta el componente

  const handleDeleteProduct = async (productId) => {
    try {
      const productRef = doc(db, "products", productId);
      await deleteDoc(productRef);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Hubo un error al eliminar el producto.");
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product); // Selecciona el producto
    setModalOpen(true); // Abre el modal
  };

  const handleSaveProduct = async () => {
    try {
      const productRef = doc(db, "products", selectedProduct.id);
      await updateDoc(productRef, {
        name: selectedProduct.name,
        description: selectedProduct.description,
        price: selectedProduct.price,
        stock: selectedProduct.stock,
        category: selectedProduct.category,
        subcategories: selectedProduct.subcategories || [],
      });

      // No es necesario actualizar el estado de productos manualmente, ya que onSnapshot lo hará automáticamente
      setModalOpen(false); // Cierra el modal
      alert("Producto actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Hubo un error al actualizar el producto.");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false); // Cierra el modal sin guardar
    setSelectedProduct(null);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full mx-auto mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Lista de Productos</h3>
      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="p-4 border border-gray-300 rounded-md shadow-sm flex justify-between items-center"
          >
            <div>
              <h4 className="text-lg font-bold">{product.name}</h4>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-sm text-gray-600">Categoría: {product.category}</p>
              <p className="text-sm text-gray-600">Precio: ${product.price}</p>
              <p className="text-sm text-gray-600">Stock: {product.stock}</p>
            </div>
            {product.images && product.images.length > 0 && (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-md"
              />
            )}
            <div className="space-x-2">
              <button
                onClick={() => handleEditProduct(product)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal de edición */}
      {modalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
            <label className="block mb-2">
              Nombre:
              <input
                type="text"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full border-gray-300 rounded-md p-2 mt-1"
              />
            </label>
            <label className="block mb-2">
              Descripción:
              <textarea
                value={selectedProduct.description}
                onChange={(e) =>
                  setSelectedProduct((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full border-gray-300 rounded-md p-2 mt-1"
              />
            </label>
            <label className="block mb-2">
              Precio:
              <input
                type="number"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
                className="w-full border-gray-300 rounded-md p-2 mt-1"
              />
            </label>
            <label className="block mb-2">
              Stock:
              <input
                type="number"
                value={selectedProduct.stock}
                onChange={(e) =>
                  setSelectedProduct((prev) => ({
                    ...prev,
                    stock: Number(e.target.value),
                  }))
                }
                className="w-full border-gray-300 rounded-md p-2 mt-1"
              />
            </label>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveProduct}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
