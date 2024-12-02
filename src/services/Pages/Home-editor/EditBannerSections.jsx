import React, { useState } from "react";
import { storage } from "../../../../firebase"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateHomeContent } from "../../Pages/Home-editor/getHomeContent";  // Importar la función de actualización

const EditBannerSections = ({ formData, setFormData }) => {
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const storageRef = ref(storage, `homeContent/section_${index + 1}/${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        const newFormData = [...formData];
        newFormData[index].image = downloadURL;
        setFormData(newFormData);
        setLoading(false);
        alert("Imagen subida con éxito");
      } catch (error) {
        console.error("Error al subir la imagen: ", error);
        setLoading(false);
      }
    }
  };

  const handleAddSection = () => {
    setFormData([...formData, { image: "" }]); // Agregar sección al banner
  };

  const handleSave = async () => {
    try {
      await updateHomeContent({ sections: formData });
      alert("Contenido del banner actualizado con éxito");
    } catch (error) {
      console.error("Error al guardar los cambios: ", error);
      alert("Hubo un error al guardar los cambios.");
    }
  };

  return (
    <div>
      {/* Secciones del Banner */}
      {formData.map((section, index) => (
        <div key={index} className="my-6 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-xl font-semibold text-gray-700">Sección del Banner {index + 1}</h2>
          <label className="block text-gray-600 mt-4">Seleccionar Imagen</label>
          <input
            type="file"
            onChange={(e) => handleImageUpload(e, index)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          />
          {loading && <p className="text-yellow-500 mt-2">Subiendo imagen...</p>}
        </div>
      ))}

      <button
        onClick={handleAddSection}
        className="bg-green-600 text-white px-6 py-3 rounded-md mt-6 hover:bg-green-700 transition"
      >
        Agregar Sección del Banner
      </button>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-6 py-3 rounded-md mt-6 hover:bg-blue-700 transition"
      >
        Guardar Cambios
      </button>
    </div>
  );
};

export default EditBannerSections;
