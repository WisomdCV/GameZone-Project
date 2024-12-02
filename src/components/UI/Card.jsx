import React from "react";
import "../../static/UI/Card.css";

const Card = ({ title, description, children, className = "" }) => {
  return (
    <div className={`card ${className}`}>
      <h3 className="card-title">{title}</h3>
      {description && <p className="card-description">{description}</p>}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
