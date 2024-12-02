import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import LoginModal from "../login/LoginModal";
import RegisterModal from "../register/RegisterModal";
import { useAuth } from "../auth/AuthContext"; // Suponiendo que tienes un contexto de autenticación
import CartDropdown from "../cart/CartDropdown";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [userName, setUserName] = useState("");

  const { user, logout, getUserData } = useAuth();

  // Referencias para detectar clics fuera
  const cartRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        try {
          const userData = await getUserData(user.uid);
          if (userData && userData.firstName) {
            const name =
              userData.firstName.length > 25
                ? userData.firstName.slice(0, 25) + "…"
                : userData.firstName;
            setUserName(name);
          }
        } catch (error) {
          console.error("Error al obtener el nombre del usuario:", error);
        }
      }
    };

    fetchUserName();
  }, [user, getUserData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Cerrar el carrito si se hace clic fuera
      if (cartOpen && cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }

      // Cerrar el menú si se hace clic fuera
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen, menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const toggleCart = () => {
    setCartOpen((prev) => !prev);
  };

  const handleCheckout = () => {
    alert("Ir a pagar (funcionalidad pendiente)");
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold">GameZone</div>

        {/* Links de navegación */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`
            }
          >
            Contact
          </NavLink>
        </div>

        {/* Login/Register o Menú de Usuario */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="hover:text-yellow-400 border border-yellow-400 px-3 py-1 rounded"
              >
                Login
              </button>
              <button
                onClick={() => setIsRegisterModalOpen(true)}
                className="hover:text-yellow-400 border border-yellow-400 px-3 py-1 rounded"
              >
                Register
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400 font-medium">{userName}</span>
              <div ref={menuRef} className="relative">
                <FaUserCircle
                  size={28}
                  className="cursor-pointer hover:text-yellow-400"
                  onClick={toggleMenu}
                />
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-20">
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                        <NavLink to="/profile">Editar Usuario</NavLink>
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        onClick={logout}
                      >
                        Cerrar Sesión
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Icono del carrito */}
          <div ref={cartRef} className="relative">
            <FaShoppingCart
              size={24}
              className="hover:text-yellow-400 cursor-pointer"
              onClick={toggleCart}
            />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
            {cartOpen && (
              <CartDropdown
                cartItems={cartItems}
                onCheckout={handleCheckout}
                onClose={() => setCartOpen(false)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modales para Login y Register */}
      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
      {isRegisterModalOpen && (
        <RegisterModal onClose={() => setIsRegisterModalOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
