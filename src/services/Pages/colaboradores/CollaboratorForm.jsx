import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Importar Firebase Storage

const CollaboratorForm = ({ isEditing, collaboratorData, onSubmit, loading }) => {
  const [collaboratorName, setCollaboratorName] = useState(isEditing ? collaboratorData.name : "");
  const [description, setDescription] = useState(isEditing ? collaboratorData.description : "");
  const [position, setPosition] = useState(isEditing ? collaboratorData.position : "");
  const [email, setEmail] = useState(isEditing ? collaboratorData.email : "");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const uploadImageToFirebase = async (file) => {
    const storage = getStorage(); // Inicializar Firebase Storage
    const storageRef = ref(storage, `collaborators/${file.name}`); // Ruta en Firebase Storage

    try {
      // Subir el archivo al bucket de Firebase Storage
      const uploadResult = await uploadBytes(storageRef, file);
      console.log("Archivo subido correctamente:", uploadResult);

      // Obtener la URL pública del archivo
      const downloadURL = await getDownloadURL(storageRef);
      console.log(`URL pública del archivo: ${downloadURL}`);
      return downloadURL; // Retornar la URL de la imagen
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      throw error; // Lanzar el error para capturarlo en el handleSubmit
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!collaboratorName || !description || !position || !email || (!isEditing && !image)) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    setError(null);
    let imageUrl = null;

    if (image) {
      imageUrl = await uploadImageToFirebase(image); // Subir la imagen y obtener la URL
    }

    onSubmit({
      name: collaboratorName,
      description,
      position,
      email,
      imageUrl, // Pasar la URL de la imagen al enviar el formulario
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input
        type="text"
        placeholder="Nombre del Colaborador"
        value={collaboratorName}
        onChange={(e) => setCollaboratorName(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md"
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        placeholder="Cargo"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md"
      />
      <input
        type="email"
        placeholder="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md"
      />
      <input
        type="file"
        onChange={handleImageChange}
        className="w-full p-3 border border-gray-300 rounded-md"
      />
      {error && <p className="text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className={`w-full p-3 rounded-md ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white`}
      >
        {loading ? "Cargando..." : isEditing ? "Actualizar Colaborador" : "Agregar Colaborador"}
      </button>
    </form>
  );
};

export default CollaboratorForm;
