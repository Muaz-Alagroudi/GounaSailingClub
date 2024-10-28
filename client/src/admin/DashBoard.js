import React, { useState, useEffect } from "react";
import NavBar from "../Nav_Footer/NavBar";
import Footer from "../Nav_Footer/Footer";
import "./DashBoard.scss";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DashBoard() {
  const [bookings, setBookings] = useState([]);
  const [classes, setClasses] = useState([]);
  const [boats, setBoats] = useState([]);
  const [selectedBoat, setSelectedBoat] = useState(null); // For modal
  const [modalOpen, setModalOpen] = useState(false); // Control modal visibility
  const [bookingDate, setBookingDate] = useState(""); // Form state for date
  const [slots, setSlots] = useState({
    slot1: false,
    slot2: false,
    slot3: false,
  });

  useEffect(() => {
    const fetchBoats = async () => {
      try {
        const response = await axios.get(`http://${process.env.REACT_APP_BACKEND}/api/boats`);
        setBoats(response.data);
        // setLoading(false);
      } catch (err) {
        console.error("Error fetching boats:", err);
        // setError("Failed to load boats");
        // setLoading(false);
      }
    };

    fetchBoats();
  }, []);

  const notifySuccess = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: Flip,
    });
  const notifyFailure = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: Flip,
    });

  const slotText = (slot1, slot2, slot3, destination) => {
    var text = "";
    if (slot1 && slot2 && slot3) {
      text += "Full day trip";
      return text;
    } else {
      slot1 ? (text += "9:00 AM to 12:00 PM ") : (text += "");
      slot2 ? (text += "12:00 PM to 3:00 PM ") : (text += "");
      slot3 ? (text += "3:00 PM to 6:00 PM ") : (text += "");
      return text;
    }
  };

  useEffect(() => {
    fetchBoatBookings();
    fetcClassBookings();
  }, []);

  const fetchBoatBookings = async () => {
    const response = await axios.get(`http://${process.env.REACT_APP_BACKEND}/api/booking`);
    setBookings(response.data);
  };

  const fetcClassBookings = async () => {
    const classResponse = await axios.get(
      `http://${process.env.REACT_APP_BACKEND}/api/booking-class`
    );
    setClasses(classResponse.data);
  };

  const handleAccept = async (type, id) => {
    try {
      if (type === "boat") {
        await axios.patch(`http://${process.env.REACT_APP_BACKEND}/api/booking/accept/${id}`);
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === id ? { ...booking, status: "Accepted" } : booking
          )
        );
      } else {
        await axios.patch(
          `http://${process.env.REACT_APP_BACKEND}/api/booking-class/accept/${id}`
        );
        setClasses((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === id ? { ...booking, status: "Accepted" } : booking
          )
        );
      }
      notifySuccess("Booking accepted successfully");
    } catch (error) {
      notifyFailure(error.message);
    }
  };

  const handleDecline = async (type, id) => {
    try {
      if (type === "boat") {
        await axios.patch(`http://${process.env.REACT_APP_BACKEND}/api/booking/reject/${id}`);
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === id ? { ...booking, status: "Rejected" } : booking
          )
        );
      } else {
        await axios.patch(
          `http://${process.env.REACT_APP_BACKEND}/api/booking-class/reject/${id}`
        );
        setClasses((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === id ? { ...booking, status: "Rejected" } : booking
          )
        );
      }
      notifySuccess("Booking rejected successfully");
    } catch (error) {
      notifyFailure(error.message);
    }
  };

  const handleToggle = async (boatId, currentStatus) => {
    const newStatus =
      currentStatus === "available" ? "unavailable" : "available";

    // Optimistically update the state
    setBoats((prevBoats) =>
      prevBoats.map((boat) =>
        boat._id === boatId ? { ...boat, status: newStatus } : boat
      )
    );

    try {
      // Update the server
      await axios.patch(
        `http://${process.env.REACT_APP_BACKEND}/api/boats/${newStatus}/${boatId}`
      );
      notifySuccess(`Boat status updated to ${newStatus}`);
    } catch (error) {
      // If the update fails, revert the change in state
      setBoats((prevBoats) =>
        prevBoats.map((boat) =>
          boat._id === boatId ? { ...boat, status: currentStatus } : boat
        )
      );
      notifyFailure("Failed to update boat status");
    }
  };

  const handleDelete = async (type, id) => {
    try {
      if (type === "boat") {
        await axios.delete(`http://${process.env.REACT_APP_BACKEND}/api/booking/${id}`);
        // Remove deleted booking from state
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== id)
        );
      } else {
        await axios.delete(`http://${process.env.REACT_APP_BACKEND}/api/booking-class/${id}`);
        // Remove deleted booking from state
        setClasses((prevClasses) =>
          prevClasses.filter((booking) => booking._id !== id)
        );
      }
      notifySuccess("Booking deleted successfully");
    } catch (error) {
      notifyFailure(error.message);
    }
  };
  const openModal = (boat) => {
    setSelectedBoat(boat);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBoat(null);
    setBookingDate("");
    setSlots({ slot1: false, slot2: false, slot3: false });
  };
  const maintenance = "maintenance";
  const handleBookBoat = async () => {
    try {
      alert(`${slots.slot1} ${slots.slot2} ${slots.slot3}`);
      await axios.post(`http://${process.env.REACT_APP_BACKEND}/api/booking`, {
        bookedBy: "Admin",
        boatName: selectedBoat.name,
        boatId: selectedBoat._id,
        date: bookingDate,
        slot1: slots.slot1,
        slot2: slots.slot2,
        slot3: slots.slot3,
        status: maintenance,
      });
      notifySuccess("Boat booked successfully");
      closeModal();
    } catch (error) {
      notifyFailure("Failed to book boat");
    }
  };
  return (
    <>
      <NavBar />
      <div className="dashboard-container">
        <h1>Admin Dashboard</h1>
        <h2>Boat Bookings</h2>
        {/* Boat Bookings Section */}
        <div className="booking-section">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <h2>{booking.boatName}</h2>
                <p>
                  <strong>ID:</strong> {booking._id}
                </p>
                <p>
                  <strong>Booked by:</strong> {booking.bookedBy}
                </p>
                <p>
                  <strong>Code :</strong> {booking.code}
                </p>
                <p>
                  <strong>email:</strong> {booking.email}
                </p>
                <p>
                  <strong>number:</strong> {booking.number}
                </p>
                <p>
                  <strong>Destinaion:</strong> {booking.destination}
                </p>
                <p>
                  <strong>Date:</strong> {booking.date}
                </p>
                <p>
                  <strong>Booked at:</strong> {booking.createdAt}
                </p>
                <p>
                  <strong>Slots: </strong>

                  {slotText(
                    booking.slot1,
                    booking.slot2,
                    booking.slot3,
                    booking.destination
                  )}
                </p>
                <p>
                  <strong>Status:</strong> {booking.status}
                </p>
                <button
                  className="accept-btn"
                  onClick={() => handleAccept("boat", booking._id)}
                >
                  Accept
                </button>
                <button
                  className="decline-btn"
                  onClick={() => handleDecline("boat", booking._id)}
                >
                  Decline
                </button>
                <button
                  className="decline-btn"
                  onClick={() => handleDelete("boat", booking._id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <div className="noBooking">
              <p>No boat bookings available</p>
            </div>
          )}
        </div>
        <h2>Sailing Class Bookings</h2>
        {/* Activity Bookings Section */}
        <div className="booking-section">
          {classes.length > 0 ? (
            classes.map((booking) => (
              <div key={booking._id} className="booking-card">
                <p>
                  <strong>ID:</strong> {booking._id}
                </p>
                <p>
                  <strong>Booked by:</strong> {booking.bookedBy}
                </p>
                <p>
                  <strong>email:</strong> {booking.email}
                </p>
                <p>
                  <strong>number:</strong> {booking.number}
                </p>
                <p>
                  <strong>Date:</strong> {booking.date}
                </p>
                <p>
                  <strong>Booked at:</strong> {booking.createdAt}
                </p>
                <p>
                  <strong>Age:</strong> {booking.age}
                </p>
                <p>
                  <strong>Status:</strong> {booking.status}
                </p>

                <button
                  className="accept-btn"
                  onClick={() => handleAccept("class", booking._id)}
                >
                  Accept
                </button>
                <button
                  className="decline-btn"
                  onClick={() => handleDecline("class", booking._id)}
                >
                  Decline
                </button>
                <button
                  className="decline-btn"
                  onClick={() => handleDelete("class", booking._id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <div className="noBooking">
              <p>No class bookings available</p>
            </div>
          )}
        </div>
        {/* <div className="boats">
          {boats.map((boat) => (
            <div className="admin-card" key={boat.id}>
              <img
                src={`http://${process.env.REACT_APP_BACKEND}/images/boats/${boat.images[0]}`}
                alt={boat.name}
              ></img>
              <h2>
                {boat.name}
              </h2>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={boat.status === "available"}
                  onChange={() => handleToggle(boat._id, boat.status)}
                />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div> */}
        <div className="boats">
          {boats.map((boat) => (
            <div className="admin-card" key={boat.id}>
              <img
                src={`http://${process.env.REACT_APP_BACKEND}/images/boats/${boat.images[0]}`}
                alt={boat.name}
              />
              <h2>{boat.name}</h2>
              <div className="switch">
                <input
                  type="checkbox"
                  checked={boat.status === "available"}
                  onChange={() => handleToggle(boat._id, boat.status)}
                />
                <span className="slider"></span>
              </div>
              <button onClick={() => openModal(boat)}>Book</button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Book {selectedBoat?.name}</h2>
              <label>Date:</label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
              />
              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={slots.slot1}
                    onChange={() =>
                      setSlots((prev) => ({ ...prev, slot1: !prev.slot1 }))
                    }
                  />
                  9:00 AM to 12:00 PM
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={slots.slot2}
                    onChange={() =>
                      setSlots((prev) => ({ ...prev, slot2: !prev.slot2 }))
                    }
                  />
                  12:00 PM to 3:00 PM
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={slots.slot3}
                    onChange={() =>
                      setSlots((prev) => ({ ...prev, slot3: !prev.slot3 }))
                    }
                  />
                  3:00 PM to 6:00 PM
                </label>
              </div>
              <div className="modal-actions">
                <button onClick={handleBookBoat}>Confirm Booking</button>
                <button onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default DashBoard;
