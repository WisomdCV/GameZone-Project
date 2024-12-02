import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase"; // Asegúrate de importar tu configuración de Firebase
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CollaboratorsList = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Función para obtener los colaboradores de Firebase
  const fetchCollaborators = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "collaborators"));
      const collaboratorsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCollaborators(collaboratorsList);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Error al obtener los colaboradores: " + err.message);
    }
  };

  // Función para eliminar un colaborador
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este colaborador?")) {
      try {
        const collaboratorRef = doc(db, "collaborators", id);
        await deleteDoc(collaboratorRef);
        setCollaborators(collaborators.filter(collaborator => collaborator.id !== id));
        alert("Colaborador eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar colaborador: ", error);
        alert("Error al eliminar colaborador");
      }
    }
  };

  // Función para redirigir a la página de edición
  const handleEdit = (id) => {
    navigate(`/edit-collaborator/${id}`);
  };

  // Cargar los colaboradores cuando el componente se monta
  useEffect(() => {
    fetchCollaborators();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Lista de Colaboradores</h2>
      {error && <p className="text-red-600">{error}</p>}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="space-y-4">
          {collaborators.length === 0 ? (
            <p>No hay colaboradores registrados.</p>
          ) : (
            collaborators.map((collaborator) => (
              <div key={collaborator.id} className="p-4 bg-white shadow-md rounded-md">
                <h3 className="font-bold">{collaborator.name}</h3>
                <p>{collaborator.position}</p>
                <p>{collaborator.description}</p>
                <p>{collaborator.email}</p>
                {collaborator.imageUrl && (
                  <img src={collaborator.imageUrl} alt={collaborator.name} className="w-16 h-16 rounded-full" />
                )}
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEdit(collaborator.id)}
                    className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(collaborator.id)}
                    className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CollaboratorsList;
