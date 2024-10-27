import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./VenueCard.scss"; // Link to your SCSS file

const VenueCard = ({ venue, index }) => {
  const cardClass = index % 2 === 0 ? "venue-card even" : "venue-card odd";

  return (
    <div className={cardClass}>
      <div className="img-container">
        <img
          src={venue.image}
          alt={venue.name}
          className="venue-image"
          loading="lazy"
        />
      </div>
      <div className="info">
        <p className="description">{venue.description}</p>
        <div className="link">
          <Link
            to={venue.instagramLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-instagram"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

VenueCard.propTypes = {
  venue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    instagramLink: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired, // Pass the index to determine odd/even class
};

export default VenueCard;
