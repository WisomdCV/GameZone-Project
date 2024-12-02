import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";

const HomePageAdmin = () => {
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists() && docSnap.data().role === "admin") {
            setLoading(false); // Una vez verificado, deja de cargar
          } else {
            navigate("/"); // Redirigir a la página principal si no es admin
          }
        } else {
          navigate("/login"); // Redirigir al login si no está autenticado
        }
      } catch (error) {
        console.error("Error verificando el rol de admin:", error);
        navigate("/login"); // Redirigir al login en caso de error
      }
    };
    
    checkAdminRole();
  }, [navigate]);

  if (loading) {
    return <div>Cargando...</div>; // Puedes mostrar un spinner o algún indicador de carga
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bienvenido al Panel de Administración</h1>
      <p>Aquí podrás gestionar todos los aspectos de la tienda, como productos, usuarios, etc.</p>
    </div>
  );
};

export default HomePageAdmin;

