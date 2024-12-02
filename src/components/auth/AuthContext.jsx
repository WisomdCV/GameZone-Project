import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../../../firebase"; // Asegúrate de tener Firebase configurado
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Crea el contexto de autenticación
const AuthContext = createContext();

// Hook customizado para acceder al contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Usuario autenticado
  const [userRole, setUserRole] = useState(null); // Rol del usuario (admin, usuario, etc.)
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  // Cargar los datos del usuario cuando el estado de autenticación cambie
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser); // Establecer el usuario autenticado
        const userData = await getUserData(authUser.uid);
        setUserRole(userData?.role); // Establecer el rol del usuario (admin, etc.)
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false); // Terminamos de cargar
    });
    return () => unsubscribe(); // Limpiar el suscriptor cuando el componente se desmonte
  }, []);

  // Función para obtener los datos del usuario desde Firestore
  const getUserData = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      return userDoc.exists() ? userDoc.data() : null;
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
      return null;
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, getUserData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
