import React, { useState, useEffect } from "react";
import { getHomeContent } from "../../services/Pages/Home-editor/getHomeContent";

const Banner = ({ homeContent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (homeContent && homeContent.sections.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          (prevIndex + 1) % homeContent.sections.length
        );
      }, 8000); // Cambiar cada 8 segundos

      return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
    }
  }, [homeContent]);

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % homeContent.sections.length
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + homeContent.sections.length) %
        homeContent.sections.length
    );
  };

  return (
    <div className="relative mb-12">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {homeContent.sections.map((section, index) => (
            <section
              key={index}
              className="w-full flex-shrink-0 h-[500px] bg-cover bg-center relative"
              style={{ backgroundImage: `url(${section.image})` }}
            ></section>
          ))}
        </div>
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-70 px-4 py-2 rounded-full hover:bg-opacity-90 transition"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-gray-800 bg-opacity-70 px-4 py-2 rounded-full hover:bg-opacity-90 transition"
      >
        &#8594;
      </button>

      {/* Indicadores dinámicos */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {homeContent.sections.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition ${
              currentIndex === index
                ? "bg-white scale-110"
                : "bg-gray-500 hover:bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
