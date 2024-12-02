import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase"; // Asegúrate de importar Firestore
import { doc, setDoc } from "firebase/firestore"; // Para trabajar con Firestore

const RegisterModal = ({ onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptNotifications, setAcceptNotifications] = useState(false);
  const [error, setError] = useState("");

  // Validaciones
  const isAgeValid = age >= 16;
  const isPhoneValid = /^\d{9}$/.test(phone);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      setError("Los correos no coinciden.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!isAgeValid) {
      setError("Debes tener al menos 16 años para registrarte.");
      return;
    }
    if (!isPhoneValid) {
      setError("El número de celular debe tener 9 dígitos.");
      return;
    }

    try {
      // Registrar al usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Guardar datos adicionales del usuario en Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        phone,
        age,
        email,
        acceptNotifications,
        description: "", // Descripción inicial vacía
      });

      alert("Usuario registrado correctamente.");
      onClose(); // Cierra el modal después del registro
    } catch (error) {
      setError("Error al registrarse: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded p-6 w-96 shadow-lg">
        <h2 className="text-2xl font-normal mb-4 text-gray-800">Registrarse</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <form onSubmit={handleRegister}>
          {/* Campos del formulario */}
          <input
            type="text"
            placeholder="Nombre"
            className="border w-full mb-4 p-2 rounded text-black"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Apellidos"
            className="border w-full mb-4 p-2 rounded text-black"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Celular (9 dígitos)"
            className="border w-full mb-4 p-2 rounded text-black"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            maxLength={9}
          />
          <input
            type="number"
            placeholder="Edad"
            className="border w-full mb-4 p-2 rounded text-black"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border w-full mb-4 p-2 rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Confirmar correo electrónico"
            className="border w-full mb-4 p-2 rounded text-black"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
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
          <input
            type="password"
            placeholder="Confirmar contraseña"
            className="border w-full mb-4 p-2 rounded text-black"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={acceptNotifications}
              onChange={() => setAcceptNotifications(!acceptNotifications)}
              className="mr-2"
            />
            <span>Acepto recibir notificaciones por correo.</span>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
          >
            Registrarse
          </button>
        </form>
        <button
          className="mt-4 text-blue-500 hover:underline"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default RegisterModal;
