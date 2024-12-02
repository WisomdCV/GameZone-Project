import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase"; // Asegúrate de importar tu configuración de Firebase
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import CollaboratorForm from "./CollaboratorForm"; // Asegúrate de importar tu formulario

const EditCollaborator = () => {
  const { id } = useParams(); // Obtener el id desde la URL
  const [collaborator, setCollaborator] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener los datos del colaborador
  const fetchCollaborator = async () => {
    try {
      const collaboratorRef = doc(db, "collaborators", id);
      const docSnap = await getDoc(collaboratorRef);
      if (docSnap.exists()) {
        setCollaborator({ id: docSnap.id, ...docSnap.data() });
      } else {
        setError("Colaborador no encontrado.");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Error al obtener los datos del colaborador: " + err.message);
    }
  };

  useEffect(() => {
    fetchCollaborator();
  }, [id]);

  const handleSubmit = (updatedCollaborator) => {
    // Aquí iría la lógica para actualizar el colaborador en Firebase
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <CollaboratorForm
          isEditing={true}
          collaboratorData={collaborator}
          onSubmit={handleSubmit}
          loading={loading}
        />
      )}
    </div>
  );
};

export default EditCollaborator;
