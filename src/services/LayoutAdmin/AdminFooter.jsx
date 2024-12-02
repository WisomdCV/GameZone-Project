import React from "react";
import { NavLink } from "react-router-dom";

const AdminFooter = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <p>&copy; {new Date().getFullYear()} GameZone. Todos los derechos reservados.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="#" className="text-gray-400 hover:text-yellow-400">
          Términos
        </a>
        <a href="#" className="text-gray-400 hover:text-yellow-400">
          Privacidad
        </a>
        <a href="#" className="text-gray-400 hover:text-yellow-400">
          Contacto
        </a>
      </div>
    </footer>
  );
};

export default AdminFooter;
