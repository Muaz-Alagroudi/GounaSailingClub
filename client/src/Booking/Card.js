// BoatCard.js
import React, { useState } from "react";
import "./Card.scss"; // Create a separate SCSS file for styling

function BoatCard({ boat, onClick }) {
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  const handleImageLoad = () => {
    setIsLoading(false); // Set loading to false when the image has loaded
  };

  return (
    <div className="boat-card" onClick={onClick}>
      {isLoading && (
        <div className="loading">
          <div className="loader"></div>
        </div>
      )}{" "}
      {/* Loader text or spinner */}
      <img
        src={`http://localhost:4000/images/boats/${boat.images[0]}`}
        alt={boat.name}
        className="boat-image"
        onLoad={handleImageLoad} // Event handler for image load
        style={{ display: isLoading ? "none" : "block" }} // Hide the image until it loads
      />
      <div className="boat-info">
        <h3>{boat.name}</h3>
        <p>Type: {boat.type}</p>
        <p>Capacity: {boat.capacity} people</p>
      </div>
    </div>
  );
}

export default BoatCard;
