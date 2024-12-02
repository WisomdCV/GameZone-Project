// src/services/admin/EditProfileAdmin.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../components/auth/AuthContext"; // Usamos el contexto de autenticación

const EditProfileAdmin = () => {
  const { user, getUserData, updateUserData } = useAuth();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const data = await getUserData(user.uid);
        if (data) {
          setUserData({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
          });
        }
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user, getUserData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserData(user.uid, userData); // Supone que tienes la función para actualizar datos
      alert("Perfil actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("Error al actualizar el perfil");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold text-center mb-4">Editar Perfil</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nombre</label>
            <input
              type="text"
              value={userData.firstName}
              onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              placeholder="Nombre"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Apellido</label>
            <input
              type="text"
              value={userData.lastName}
              onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              placeholder="Apellido"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              placeholder="Correo Electrónico"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md"
          >
            Guardar Cambios
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProfileAdmin;
