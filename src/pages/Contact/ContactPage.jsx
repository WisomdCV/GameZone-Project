import React, { useState, useEffect } from "react";
import { db } from "../../../firebase"; // Importa tu configuración de Firebase
import { collection, getDocs } from "firebase/firestore";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [collaborators, setCollaborators] = useState([]); // Para almacenar los datos de colaboradores

  // Manejador de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus("");

    // Validación básica
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus("Por favor, complete todos los campos.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulación de envío de mensaje
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula un delay de envío

      setFormStatus("¡Mensaje enviado con éxito!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      setFormStatus("Hubo un error al enviar el mensaje. Inténtalo nuevamente.");
    }
    setIsSubmitting(false);
  };

  // Función para obtener datos de colaboradores desde Firebase
  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const collaboratorsCollection = collection(db, "collaborators"); // Colección 'collaborators'
        const querySnapshot = await getDocs(collaboratorsCollection);
        const collaboratorsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setCollaborators(collaboratorsData);
      } catch (error) {
        console.error("Error al obtener colaboradores:", error);
      }
    };

    fetchCollaborators();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4">
      <div className="container mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Página de Contacto</h1>
        <p className="text-lg text-gray-600 mb-8">
          Si tienes alguna pregunta o necesitas más información, por favor, completa el siguiente formulario y nos pondremos en contacto contigo a la brevedad.
        </p>
      </div>

      {/* Formulario de contacto */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 mb-2">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
          </div>
          <div className="flex flex-col mt-6">
            <label htmlFor="subject" className="text-gray-700 mb-2">Asunto</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
          </div>
          <div className="flex flex-col mt-6">
            <label htmlFor="message" className="text-gray-700 mb-2">Mensaje</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            ></textarea>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 focus:outline-none"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </div>
        </form>
        {formStatus && (
          <div className="mt-4 text-center text-sm font-medium text-gray-800">
            <p>{formStatus}</p>
          </div>
        )}
      </div>

      {/* Mostrar colaboradores */}
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Colaboradores</h2>
        {collaborators.length === 0 ? (
          <p className="text-gray-600">No hay colaboradores registrados aún.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collaborators.map((collaborator) => (
              <div key={collaborator.id} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={collaborator.imageUrl || "https://via.placeholder.com/150"}
                  alt={collaborator.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">{collaborator.name}</h3>
                <p className="text-gray-600">{collaborator.position}</p>
                <p className="text-gray-600 text-sm mt-2">{collaborator.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
