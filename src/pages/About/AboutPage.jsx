import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Sobre Nosotros</h1>
        <p className="text-lg text-gray-600">
          Bienvenidos a nuestra tienda en línea, donde la pasión por los videojuegos se encuentra con la comodidad y la confiabilidad. En GamaGame, ofrecemos una amplia gama de juegos físicos para diversas plataformas.
        </p>
      </div>

      {/* Sección de Misión */}
      <section className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestra Misión</h2>
        <p className="text-lg text-gray-600">
          En GamaGame, nuestra misión es proporcionar a nuestros clientes una experiencia única de compra de videojuegos, brindando una amplia selección de títulos, atención personalizada y envíos rápidos, todo desde la comodidad de su hogar.
        </p>
      </section>

      {/* Sección de Visión */}
      <section className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestra Visión</h2>
        <p className="text-lg text-gray-600">
          Nuestra visión es convertirnos en la tienda de videojuegos líder en el mercado, ofreciendo a los jugadores una plataforma confiable y accesible para adquirir los mejores títulos, siempre con un enfoque en la satisfacción del cliente.
        </p>
      </section>

      {/* Sección de Valores */}
      <section className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestros Valores</h2>
        <ul className="text-lg text-gray-600 list-disc pl-5 space-y-2">
          <li><strong>Compromiso:</strong> Nos comprometemos a ofrecer la mejor experiencia de compra a nuestros usuarios, con atención al detalle en cada paso del proceso.</li>
          <li><strong>Innovación:</strong> Buscamos siempre estar a la vanguardia en cuanto a títulos, plataformas y tendencias del mercado de videojuegos.</li>
          <li><strong>Confianza:</strong> Brindamos un servicio seguro, confiable y transparente para que nuestros clientes siempre se sientan respaldados.</li>
          <li><strong>Pasión:</strong> La pasión por los videojuegos nos mueve a ofrecer lo mejor en cada aspecto de nuestra tienda.</li>
        </ul>
      </section>

      {/* Sección de Historia (opcional) */}
      <section className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestra Historia</h2>
        <p className="text-lg text-gray-600">
          GamaGame nació con el objetivo de ofrecer a los gamers una plataforma completa, accesible y confiable para adquirir sus videojuegos favoritos. Desde nuestros inicios, hemos trabajado incansablemente para expandir nuestra oferta, garantizar una excelente atención al cliente y mantenernos al día con las últimas tendencias del mundo gamer.
        </p>
      </section>

      {/* Sección de Contacto (llamada a la acción) */}
      <section className="text-center mt-12">
        <p className="text-lg text-gray-600 mb-4">¿Tienes preguntas o comentarios? No dudes en ponerte en contacto con nosotros.</p>
        <a
          href="/contact"
          className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition duration-300"
        >
          Contáctanos
        </a>
      </section>
    </div>
  );
};

export default AboutPage;
