import React from "react";
import VenueCard from "./VenueCard";
import Activities from "./Activities";
import "./Home.scss";
import laplancha from "../media/logos/la-plancha-logo.png";
import hybrid from "../media/logos/hybrid-logo.png";
import flySurf from "../media/logos/fly-surf-logo.png";
import logoColor from "../media/logos/logo-color.png";
import BahrPopup from "./BahrPopup";
import vid from "../vid.mp4";
import vid2 from "../vid2.mp4";
import NavBar from "../Nav_Footer/NavBar";
import Footer from "../Nav_Footer/Footer";
import { Link } from "react-router-dom";

const venues = [
  {
    name: "La Plancha",
    image: laplancha,
    instagramLink: "https://instagram.com/venue1",
    description:
      "La Plancha offers a live kitchen daily, with professional chefs cooking\
       your favorite dishes to perfection. Our menu celebrates global cuisines,\
        featuring carefully selected favorites. Enjoy fresh salads, juicy burgers,\
         saucy pastas, and hot oven-baked pizzas.",
  },
  {
    name: "Hybrid",
    image: hybrid,
    instagramLink: "https://instagram.com/venue2",
    description:
      "We offer an exclusive outdoor fitness experience like no other.\
     Facing the beach, Hybrid is both a gym and fitness space offering a sea of fun \
     luxuries to celebrate your body & wellbeing. Yoga, group fitness, movement classes\
      and also customized personal training sessions (for ages & levels). ",
  },
  {
    name: "FlySurf Pro",
    image: flySurf,
    instagramLink: "https://instagram.com/venue2",
    description:
      "A water adrenaline rush or smooth fun are both available at our eFoil center;\
     FlySurfPro. Introducing Fliteboard™ eFoil for the first time at El Gouna! Find freedom and \
     fly over water on the world's most advanced electric foil board.rofessional instructions are\
      provided (mandatory) for your safety",
  },
  // Add more venues as needed
];

const HomePage = () => {
  return (
    <>
      <NavBar />
      <BahrPopup></BahrPopup>
      <div className="homepage">
        {/* Video Section */}
        <div className="video-container">
          <video src={vid2} autoPlay muted loop className="intro-video" />

          <div className="cta-overlay">
            <div className="welcome-text">
              <h2>Book Your Trip Today</h2>
              <div className="links">
                <Link className="book-button" to='/booking'>Book Now</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="welcome">
          <img src={logoColor}></img>
          <div className="welcome-text">
            <h2>Welcome to El Gouna Sailing Club</h2>

            <p>
              Enjoy being our guest to experience a beach day like no other,
              endless water activities & sports, sailing classes for all ages,
              or book your private boat and party at sea.
            </p>
            <div className="links">
              <Link className="ig">
                <i className="fa-brands fa-instagram"></i>
              </Link>
              <Link>
                <i class="fa-solid fa-location-dot"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="book-now">
          <div className="welcome-text">
            <h2>Book Your Trip Today</h2>
            <p>
              Reserve your private boat now and embark on an unforgettable
              adventure!
            </p>
            <div className="links">
              <Link className="book-button" to="/booking">
                Book Now
              </Link>
            </div>
          </div>
        </div>

        <div className="intro">
          <h2>ACTIVITIES</h2>
          {/* <p>Fun times await</p> */}
        </div>

        <Activities />
        <div className="intro">
          <h2>VENUES</h2>
        </div>

        {/* Venue Showcase */}
        <div className="venue-showcase">
          <div className="venue-grid">
            {venues.map((venue, index) => (
              <VenueCard key={index} venue={venue} index={index} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
