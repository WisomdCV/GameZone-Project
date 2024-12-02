import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "./CartContext";

const CartIcon = ({ onClick }) => {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div
      className="relative cursor-pointer flex items-center justify-center"
      onClick={onClick}
      aria-label={`Carrito con ${itemCount} ${itemCount === 1 ? "producto" : "productos"}`}
    >
      <FaShoppingCart
        size={28}
        className="text-gray-700 hover:text-yellow-500 transition duration-300"
      />
      {itemCount > 0 && (
        <span
          className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-pulse"
          aria-label={`${itemCount} productos en el carrito`}
        >
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
