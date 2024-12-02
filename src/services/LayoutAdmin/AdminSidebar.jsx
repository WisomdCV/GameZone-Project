import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white w-64 p-6 shadow-lg">
      <h2 className="text-2xl font-extrabold mb-8">Panel de Administración</h2>
      <nav className="space-y-6">
        {/* Enlaces para administrar productos, categorías, colaboradores */}
        <NavLink
          to="/admin/add-Products"
          className={({ isActive }) =>
            `block px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors ${isActive ? "bg-yellow-400 text-gray-900" : "text-white"}`
          }
        >
          Agregar Producto
        </NavLink>

        <NavLink
          to="/admin/add-category"
          className={({ isActive }) =>
            `block px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors ${isActive ? "bg-yellow-400 text-gray-900" : "text-white"}`
          }
        >
          Agregar Categoría
        </NavLink>

        <NavLink
          to="/admin/add-collaborator"
          className={({ isActive }) =>
            `block px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors ${isActive ? "bg-yellow-400 text-gray-900" : "text-white"}`
          }
        >
          Agregar Colaborador
        </NavLink>

        {/* Nueva ruta para editar la página de inicio */}
        <NavLink
          to="/admin/edit-home"
          className={({ isActive }) =>
            `block px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors ${isActive ? "bg-yellow-400 text-gray-900" : "text-white"}`
          }
        >
          Editar Página de Inicio
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
