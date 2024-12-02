import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../../../firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../auth/AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Cargar carrito desde Firebase
  useEffect(() => {
    if (user) {
      const cartRef = doc(db, "carts", user.uid); // Usamos user.uid como identificador único

      const unsubscribe = onSnapshot(cartRef, (docSnap) => {
        if (docSnap.exists()) {
          setCartItems(docSnap.data().items || []);
        } else {
          setCartItems([]);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  // Agregar producto y guardar directamente en Firebase
  const addToCart = async (item) => {
    if (!user) return;

    const cartRef = doc(db, "carts", user.uid);

    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      let updatedCart;

      if (existingItem) {
        updatedCart = prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updatedCart = [...prev, { ...item, quantity: 1 }];
      }

      // Guardar en Firebase
      setDoc(cartRef, { items: updatedCart });

      return updatedCart;
    });
  };

  // Aumentar cantidad
  const increaseQuantity = async (id) => {
    if (!user) return;

    const cartRef = doc(db, "carts", user.uid);

    setCartItems((prev) => {
      const updatedCart = prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      // Guardar en Firebase
      setDoc(cartRef, { items: updatedCart });

      return updatedCart;
    });
  };

  // Disminuir cantidad
  const decreaseQuantity = async (id) => {
    if (!user) return;

    const cartRef = doc(db, "carts", user.uid);

    setCartItems((prev) => {
      const updatedCart = prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

      // Guardar en Firebase
      setDoc(cartRef, { items: updatedCart });

      return updatedCart;
    });
  };

  // Eliminar producto
  const removeFromCart = async (id) => {
    if (!user) return;

    const cartRef = doc(db, "carts", user.uid);

    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);

      // Actualizar Firebase
      setDoc(cartRef, { items: updatedCart });

      return updatedCart;
    });
  };

  // Limpiar carrito
  const clearCart = async () => {
    if (!user) return;

    const cartRef = doc(db, "carts", user.uid);

    setCartItems([]);
    await setDoc(cartRef, { items: [] });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
