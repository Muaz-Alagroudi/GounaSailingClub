import React, { useState, useEffect } from "react";
import NavBar from "../Nav_Footer/NavBar";
import Footer from "../Nav_Footer/Footer";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import "./Booking.scss"; // Use SCSS for styling

function Booking() {
  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_BACKEND}/api/boats`);
        setBoats(response.data);
        console.log(response.data);
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
        <section className="hero">
          <h1>Available Boats</h1>
          <p>Explore our boats for your perfect adventure.</p>
        </section> 

        <div className="boat-gallery">
          {loading ? (
            <p>Loading...</p>
          ) : (
            boats
              .filter((boat) => boat.status === 'available')
              .map((boat) => (
                <Link key={boat._id} to={`/booking/${boat._id}`} className="boat-link">
                  <div className="boat-card">
                    <img src={`http://${process.env.REACT_APP_BACKEND}/images/boats/${boat.images[0]}`} alt={boat.name} className="boat-image" />
                    <div className="boat-info">
                      <h3>{boat.name}</h3>
                      <p>Type: {boat.type}</p>
                      <p>Capacity: {boat.capacity} people</p>
                    </div>
                  </div>
                </Link>
              ))
          )}
        </div>

        <div className="classes">
          <h2>Sailing Classes</h2>
          <Link to="/booking/booking-class">
            <div className="boat-card">
              <img
                src={`http://${process.env.REACT_APP_BACKEND}/images/ActivitiesWebpComp/beach-bg.webp`}
                alt="Sailing Class"
                className="boat-image"
              />
              <div className="boat-info">
                <h3>Book a Sailing Class</h3>
                <p>Suitable for all ages</p>
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
