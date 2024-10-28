import React, { useState, useEffect } from "react";
import NavBar from "../Nav_Footer/NavBar";
import Footer from "../Nav_Footer/Footer";
import axios from "axios";
import Card from "./Card"; // Import the BoatCard component
import "./Booking.scss"; // Use SCSS for styling
import { Link, Outlet } from "react-router-dom";

function Booking() {
  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch boats data when the component mounts
  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_BACKEND}/api/boats`);
        setBoats(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching boats:", err);
        setError("Failed to load boats");
        setLoading(false);
      }
    };

    fetchBoats();
  }, []);

  return (
    <>
      <NavBar />
      <div className="booking-container">
        <div className="Boats">
          <h2>Available Boats</h2>
          <div className="boat-gallery">
            {loading ? (
              <p>loading...</p>
            ) : (
              <>
                {boats.map((boat) => boat.status === 'available'?(
                  <Link key={boat._id} to={`/booking/${boat._id}`}>
                    <Card boat={boat} />
                  </Link>
                ): '')}
              </>
            )}
          </div>
        </div>

        <div className="classes">
          <div className="center">
            <h2>Sailing Classes</h2>
          </div>
          <Link to="/booking/booking-class">
            <div className="boat-card" onClick={() => {}}>
              <img
                src={`http://${process.env.REACT_APP_BACKEND}/images/ActivitiesWebpComp/beach-bg.webp`}
                alt="Sailing Class"
                className="boat-image"
              />
              <div className="boat-info">
                <h3>Book a Sailing Class</h3>
                <p>Suitable for all ages</p>
                {/* <p></p> */}
              </div>
            </div>
          </Link>
        </div>
      </div>
      <Footer />
      <Outlet />
    </>
  );
}

export default Booking;
