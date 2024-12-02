import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore"; // Para obtener datos de Firestore
import EditUser from "../../components/User/EditUser";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null); // Estado para los datos del usuario
  const [loading, setLoading] = useState(true); // Estado para indicar si está cargando

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser; // Usuario actual
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.error("No se encontró el usuario.");
          }
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      } finally {
        setLoading(false); // Termina de cargar
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (!userData) {
    return <div className="text-center">No se encontraron datos del usuario.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Perfil de Usuario</h1>

      {/* Mostrar información del usuario */}
      <div className="bg-white shadow rounded-lg p-6">
        <p><strong>Nombre:</strong> {userData.firstName}</p>
        <p><strong>Apellidos:</strong> {userData.lastName}</p>
        <p><strong>Correo Electrónico:</strong> {userData.email}</p>
        <p><strong>Teléfono:</strong> {userData.phone}</p>
        <p><strong>Edad:</strong> {userData.age}</p>
        <p><strong>Descripción:</strong> {userData.description || "Sin descripción"}</p>
      </div>

      {/* Botón para editar datos */}
      <div className="mt-6">
        <EditUser userData={userData} />
      </div>
    </div>
  );
};

export default ProfilePage;
