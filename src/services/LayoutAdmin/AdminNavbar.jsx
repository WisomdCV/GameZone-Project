import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa"; // Solo el ícono de usuario
import { useAuth } from "../../components/auth/AuthContext"; // Usamos el contexto de autenticación
import { NavLink } from "react-router-dom"; // Importar NavLink

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState(""); // Para almacenar el nombre del usuario
  const { user, logout, getUserData } = useAuth(); // Obtenemos `getUserData` para cargar el nombre del usuario

  useEffect(() => {
    const fetchUserName = async () => {
      if (user) {
        try {
          const userData = await getUserData(user.uid); // Función que obtiene los datos del usuario desde Firestore
          if (userData && userData.firstName) {
            const name = userData.firstName.length > 25
              ? userData.firstName.slice(0, 25) + "…" // Limitar a 25 caracteres
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

  // Cierra el menú al hacer clic fuera de él
  const handleOutsideClick = (event) => {
    if (!event.target.closest('.user-menu')) {
      setMenuOpen(false);
    }
  };

  // Escuchar clicks fuera del menú
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Toggle de menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Nombre de la página (Panel de Administración) */}
        <div className="text-2xl font-bold">Panel de Administración</div>

        {/* Menú de Usuario */}
        <div className="flex items-center space-x-4">
          {user && (
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400 font-medium">{userName}</span>
              <div className="relative user-menu">
                <FaUserCircle
                  size={28}
                  className="cursor-pointer hover:text-yellow-400"
                  onClick={toggleMenu}
                />
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-20">
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                        <NavLink to="/admin/edit-profile" className="block">
                          Editar Perfil
                        </NavLink>
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
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
