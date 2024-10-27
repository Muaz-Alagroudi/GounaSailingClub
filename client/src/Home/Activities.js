import React from "react";
import "./Activities.scss";
// import catamaran from "../media/images/activities/Catamaran.jpg";
// import bahia from "../media/images/activities/Bahia.jpg";
// import boatExcursion from "../media/images/activities/BoatExcursions.jpg";
// import coastalRowing from "../media/images/activities/CoastalRowing.jpg";
// import eFoil from "../media/images/activities/E-Foiling.jpg";
// import fitnessHub from "../media/images/activities/FitnessHub.jpg";
// import kayaking from "../media/images/activities/Kayaking.jpg";
// import lazer from "../media/images/activities/Lazer.jpg";
// import optimist from "../media/images/activities/Optimist.jpg";
// import pedalo from "../media/images/activities/Pedalo.jpg";
// import seaCruiser from "../media/images/activities/SeaCruiser.jpg";
// import SUP from "../media/images/activities/SUP.jpg";
// import taxiBoat from "../media/images/activities2/TaxiBoat.jpg";

const activities = [
  {
    name: "E-FOILING",
    description:
      "Known as the eFoil, short for electric-powered hydrofoil surfboard, this Back-to-the-Future-looking invention glides silently across the water at speeds up to 25 mph as you balance on top. You won't need a boat.",
    price: 100,
    image: "E-Foiling",
  },

  {
    name: "SEA CRUISER",
    description:
      "A Multihull Electric Watercraft that is suitable for all ages.",
    price: 100,
    image: "SeaCruiser",
  },
  {
    name: "THE OPTIMIST",
    description:
      "The most popular sailboat in the world. It is traditionally used as a trainer for sailors under 14 years of age who weigh less than 110 pounds. It is a single-handed boat with a rig that is 3.3 square meters.",
    price: 100,
    image: "Optimist",
  },
  // {
  //   name: "THE BAHIA",
  //   description: "Designed with stability, safety, and performance in mind. It was created for leisure and ease of use, but not at the expense of performance. Stability and sturdy hull design make it easy to motor or row. The Bahia comes with a single-line reefable mainsail for added sailing comfort in a breeze.",
  //   price: 100,
  //   image: 'Bahia'
  // },
  {
    name: "ROWING",
    description:
      "Uses wider hulls with a levelled off stern to allow water to flow out of the boat. It usually takes place on open water and does not shy away from waves and wind (unlike its flat-water counterpart).",
    price: 100,
    image: "CoastalRowing",
  },
  {
    name: "PEDALO",
    description:
      "A pedalo or paddle boat is a small human-powered watercraft propelled by the action of pedals turning a paddle wheel.",
    price: 100,
    image: "Pedalo",
  },

  {
    name: "KAYAKING",
    description:
      "Kayaking is a watersport that involves sitting in a small watercraft, propelling yourself through the water with a double-sided paddle.",
    price: 100,
    image: "Kayaking",
  },
  {
    name: "SUP (Stand-Up Paddleboarding)",
    description:
      "SUP stands for stand-up paddleboarding. It's like a cross between canoeing and surfing. SUPs can be used on the sea for surfing or touring, or on inland waterways such as canals, rivers, or lakes. You can even do yoga on them.",
    price: 100,
    image: "SUP",
  },
  {
    name: "THE LASER",
    description:
      "The Laser is a challenging boat that rewards athleticism, subtle steering and trimming techniques, as well as tactical excellence. It is a single-handed Olympic class boat, also sailed at club, national, and international levels.",
    price: 100,
    image: "Lazer",
  },
];

function Activities() {
  return (
    <div className="activity-container">
      {activities.map((activity) => (
        <div className="activity" key={activity.name}>
          <div className="image-container">
            <img
              src={`http://localhost:4000/images/activitiesWebpComp/${activity.image}.webp`}
              alt={activity.name}
              loading="lazy"
            ></img>
          </div>
          <h2>{activity.name}</h2>
          <p>{activity.description}</p>
          <p>
            <strong>{activity.price}</strong>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Activities;
