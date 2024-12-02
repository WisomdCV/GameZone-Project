import React, { useState } from "react";
import { auth, db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore"; // Para actualizar datos en Firestore

const EditUser = ({ userData }) => {
  const [editing, setEditing] = useState(false); // Estado para mostrar/ocultar el formulario
  const [formData, setFormData] = useState(userData); // Datos del formulario
  const [loading, setLoading] = useState(false); // Estado para indicar si se está actualizando

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, formData); // Actualizar los datos en Firestore
        alert("Datos actualizados correctamente.");
        setEditing(false); // Oculta el formulario después de guardar
      }
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      alert("Error al actualizar los datos.");
    } finally {
      setLoading(false);
    }
  };

  if (!editing) {
    return (
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={() => setEditing(true)}
      >
        Editar Perfil
      </button>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Apellidos</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Teléfono</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Edad</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border w-full p-2 rounded"
          ></textarea>
        </div>
      </form>
      <div className="flex space-x-4">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar Cambios"}
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={() => setEditing(false)}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditUser;
