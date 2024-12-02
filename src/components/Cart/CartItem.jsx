import React from "react";

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="flex items-center p-4 border-b border-gray-300 bg-gray-50 rounded-lg shadow-sm">
      {/* Imagen del producto */}
      <img
        src={item.image || item.images[0]} // Manejo de imágenes en ambos formatos
        alt={item.name}
        className="h-16 w-16 rounded-lg object-cover border border-gray-200"
      />

      {/* Detalles del producto */}
      <div className="ml-4 flex-grow">
        <p className="text-lg font-semibold text-gray-800">{item.name}</p>
        <p className="text-sm text-gray-600">
          {item.quantity} x ${item.price.toFixed(2)}
        </p>
        <p className="text-sm font-medium text-gray-800 mt-1">
          Total: ${(item.quantity * item.price).toFixed(2)}
        </p>
      </div>

      {/* Controles de cantidad */}
      <div className="flex items-center space-x-2">
        <button
          className={`px-3 py-1 rounded-lg shadow transition ${
            item.quantity > 1
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={onDecrease} // Llamar a decreaseQuantity
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="px-4 py-1 bg-gray-100 text-gray-800 rounded-lg shadow-sm">
          {item.quantity}
        </span>
        <button
          className="px-3 py-1 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          onClick={onIncrease} // Llamar a increaseQuantity
        >
          +
        </button>
        <button
          className="ml-4 text-red-500 hover:text-red-600"
          onClick={onRemove} // Eliminar el producto
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem;
