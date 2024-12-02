import React from "react";

const PriceStock = ({ price, setPrice, stock, setStock }) => (
  <div className="flex space-x-4">
    <div>
      <label htmlFor="price" className="block text-sm font-medium text-gray-600">
        Precio (USD)
      </label>
      <input
        type="number"
        id="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Escribe el precio"
        className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>
    <div>
      <label htmlFor="stock" className="block text-sm font-medium text-gray-600">
        Stock
      </label>
      <input
        type="number"
        id="stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="Cantidad en inventario"
        className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
    </div>
  </div>
);

export default PriceStock;
