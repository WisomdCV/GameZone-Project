import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom"; // Importa el hook de navegación
import { doc, getDoc } from "firebase/firestore"; // Para obtener los datos del usuario desde Firestore
import { db } from "../../../firebase"; // Asegúrate de tener la configuración de Firebase correctamente importada

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Inicializa el hook de navegación

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Iniciar sesión con Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      
      // Obtener el usuario autenticado
      const user = auth.currentUser;
      
      if (user) {
        // Obtener los datos del usuario desde Firestore
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        
        if (docSnap.exists()) {
          const userData = docSnap.data();
          
          // Verificar si el rol es "admin"
          if (userData.role === "admin") {
            // Redirigir a la página de administración
            navigate("/admin"); // Asegúrate de tener esta ruta configurada
          } else {
            // Redirigir al home o a la página principal
            navigate("/");
          }
        } else {
          console.log("No se encontraron datos para este usuario.");
        }
      }
      
      onClose(); // Cierra el modal después del login

    } catch (error) {
      setError("Credenciales inválidas. Inténtalo de nuevo.");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/registro"); // Redirige a la página de registro
    onClose(); // Cierra el modal al redirigir
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded p-6 w-96 shadow-lg">
        <h2 className="text-2xl font-normal mb-4 text-gray-800">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border w-full mb-4 p-2 rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border w-full mb-4 p-2 rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-4 flex justify-between">
          <button
            className="text-blue-500 hover:underline"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="text-blue-500 hover:underline"
            onClick={handleRegisterRedirect}
          >
            ¿No tienes cuenta? Regístrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
