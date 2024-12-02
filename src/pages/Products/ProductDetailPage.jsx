import React from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams(); // Captura el ID del producto desde la URL

  return <div>Product Detail Page for Product ID: {id}</div>;
};

export default ProductDetailPage;
