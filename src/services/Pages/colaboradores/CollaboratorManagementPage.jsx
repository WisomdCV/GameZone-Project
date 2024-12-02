import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import CollaboratorForm from "./CollaboratorForm"; // Importar el nuevo componente
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; 

const CollaboratorManagementPage = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [collaboratorToEdit, setCollaboratorToEdit] = useState(null); // Para editar un colaborador

  // Función para obtener los colaboradores desde Firestore
  const fetchCollaborators = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "collaborators"));
      const collaboratorsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCollaborators(collaboratorsList);
      setLoadingList(false);
    } catch (err) {
      setLoadingList(false);
      alert("Error al obtener los colaboradores: " + err.message);
    }
  };

  useEffect(() => {
    fetchCollaborators();
  }, []);

  // Función para agregar o actualizar un colaborador
  const handleAddOrUpdateCollaborator = async (collaboratorData) => {
    try {
      if (isEditing) {
        // Actualizar un colaborador existente
        const collaboratorRef = doc(db, "collaborators", collaboratorToEdit.id);
        await updateDoc(collaboratorRef, collaboratorData);
        alert("Colaborador actualizado correctamente");
      } else {
        // Agregar un nuevo colaborador
        await addDoc(collection(db, "collaborators"), collaboratorData);
        alert("Colaborador agregado correctamente");
      }

      setIsEditing(false);
      setCollaboratorToEdit(null); // Restablecer los valores
      fetchCollaborators(); // Refrescar la lista de colaboradores
    } catch (error) {
      alert("Error al guardar el colaborador: " + error.message);
    }
  };

  // Función para establecer el colaborador a editar
  const handleEdit = (collaborator) => {
    setIsEditing(true);
    setCollaboratorToEdit(collaborator); // Establecer el colaborador a editar
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
        alert("Error al eliminar colaborador");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Agregar y Gestionar Colaboradores</h2>

      {/* Formulario de agregar o editar colaborador */}
      <CollaboratorForm
        isEditing={isEditing}
        collaboratorData={collaboratorToEdit || {}}
        onSubmit={handleAddOrUpdateCollaborator}
        loading={false} // Aquí puedes usar un estado de loading si fuera necesario
      />
      
      <h3 className="text-xl font-bold mb-4">Lista de Colaboradores</h3>
      
      {loadingList ? (
        <p>Cargando colaboradores...</p>
      ) : (
        <div className="space-y-4">
          {collaborators.length === 0 ? (
            <p>No hay colaboradores registrados.</p>
          ) : (
            collaborators.map((collaborator) => (
              <div key={collaborator.id} className="p-4 bg-white shadow-md rounded-md">
                <h4 className="font-bold">{collaborator.name}</h4>
                <p>{collaborator.position}</p>
                <p>{collaborator.description}</p>
                <p>{collaborator.email}</p>
                {collaborator.imageUrl && (
                  <img src={collaborator.imageUrl} alt={collaborator.name} className="w-16 h-16 rounded-full" />
                )}
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEdit(collaborator)} // Al hacer click en "Editar" se carga el colaborador en el formulario
                    className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(collaborator.id)} // Eliminar colaborador
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

export default CollaboratorManagementPage;
