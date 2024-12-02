import React, { useRef } from "react";
import CartItem from "./CartItem"; // Importamos el componente CartItem
import { useCart } from "../Cart/CartContext";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación

const CartDropdown = ({ onClose }) => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const navigate = useNavigate(); // Usamos useNavigate para redirigir
  const cartContainerRef = useRef(null); // Ref para el contenedor de los productos

  // Función para redirigir a la página de pago
  const handleCheckout = () => {
    navigate("/cart"); // Redirige a la página de carrito
  };

  // Función para hacer scroll hacia abajo
  const scrollToBottom = () => {
    if (cartContainerRef.current) {
      cartContainerRef.current.scrollTop = cartContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className="absolute top-16 right-4 w-96 bg-white shadow-lg rounded-lg p-4 z-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Tu Carrito</h2>
        <button
          className="text-gray-500 hover:text-gray-800 transition"
          onClick={onClose}
        >
          ✖️
        </button>
      </div>

      {/* Contenedor de productos con scroll */}
      <div
        ref={cartContainerRef}
        className="space-y-4 overflow-y-auto max-h-72" // Limitar la altura para permitir desplazamiento
      >
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() => increaseQuantity(item.id)} // Aumentar cantidad
              onDecrease={() => decreaseQuantity(item.id)} // Disminuir cantidad
              onRemove={() => removeFromCart(item.id)} // Eliminar producto
            />
          ))
        ) : (
          <p className="text-gray-600 text-center">Tu carrito está vacío.</p>
        )}
      </div>

      {/* Botón para hacer scroll hacia abajo */}
      {cartItems.length > 3 && (
        <div className="mt-2 text-center">
          <button
            onClick={scrollToBottom}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Ver más productos
          </button>
        </div>
      )}

      {/* Botón para proceder al checkout (comprar) */}
      <div className="mt-4">
        <button
          onClick={handleCheckout}
          className="w-full py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600"
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

export default CartDropdown;
