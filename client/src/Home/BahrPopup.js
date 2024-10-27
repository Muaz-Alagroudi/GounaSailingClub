import React, { useState, useEffect } from "react";
import elBahr from "../media/logos/elBa7r-logo.png";
import { Link } from "react-router-dom";
import "./Bahr.scss";

const ElBahrPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  // Trigger the pop-up after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Function to close the pop-up
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {showPopup ? (
        <div className="popup" onClick={()=>setShowPopup(false)}>
          <div className="popup-content">
            <span className="close-btn" onClick={handleClosePopup}>
              &times;
            </span>
            <div className="test-bahr">
              <div className="img-container">
                <img src={elBahr} alt="El Bahr" />
              </div>
              <div className="info" >
                <h2>Dine at El Bahr and enjoy our special dishes!</h2>

                <p className="seaweed">Fish the way it should be!</p>
                <div className="links">
                  <Link className="ig" to="#">
                    <i className="fa-brands fa-instagram"></i>
                  </Link>
                  <Link className="fb" to="#">
                    <i className="fa-brands fa-facebook"></i>
                  </Link>
                  <Link className="tk" to="#">
                    <i className="fa-brands fa-tiktok"></i>
                  </Link>
                  <Link to="#">
                    <i className="fa-solid fa-location-dot"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="closed"> 
          <img src={elBahr} onClick={() => {setShowPopup(true)}}></img>
        </div>
      )}
    </div>
  );
};

export default ElBahrPopup;
