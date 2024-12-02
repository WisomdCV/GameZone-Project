import React from "react";

const ProductNameDescriptionImage = ({
  productName,
  setProductName,
  description,
  setDescription,
  images,
  setImages
}) => (
  <div className="space-y-4">
    {/* Nombre del Producto */}
    <div>
      <label htmlFor="productName" className="block text-sm font-medium text-gray-600">
        Nombre del Producto
      </label>
      <input
        type="text"
        id="productName"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="Escribe el nombre del producto"
        className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>

    {/* Descripción */}
    <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-600">
        Descripción
      </label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Escribe una descripción del producto"
        className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>

    {/* Imágenes */}
    <div>
      <label htmlFor="images" className="block text-sm font-medium text-gray-600">
        Imágenes del Producto
      </label>
      <input
        type="file"
        id="images"
        multiple
        onChange={(e) => setImages(Array.from(e.target.files))}
        className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  </div>
);

export default ProductNameDescriptionImage;
