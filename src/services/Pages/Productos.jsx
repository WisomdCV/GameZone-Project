import React from "react";
import AddProduct from "./Products/AddProduct";
import ProductList from "./Products/ProductList";

const Productos = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <AddProduct />
      </div>
      <ProductList />
    </div>
  );
};

export default Productos;
