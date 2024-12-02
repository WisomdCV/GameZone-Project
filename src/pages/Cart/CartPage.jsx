// src/pages/Cart/CartPage.jsx
import React from "react";
import { useCart } from "../../components/Cart/CartContext";
import CartItem from "../../components/cart/CartItem";  // Si el archivo es en minúsculas

const CartPage = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalles de tu Carrito</h1>

      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() => increaseQuantity(item.id)}
              onDecrease={() => decreaseQuantity(item.id)}
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
        </div>
      ) : (
        <p>Tu carrito está vacío.</p>
      )}

      {/* Aquí podrías agregar el formulario o botones de pago */}
      <div className="mt-4">
        <button className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600">
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default CartPage;
