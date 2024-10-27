import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookingForm.scss";
import {toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function BookingForm() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const navigate = useNavigate();
  const notifySuccess = (message) => toast.success(message, {
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
  const notifyFailure = (message) => toast.error(message, {
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

  const [formData, setFormData] = useState({
    bookedBy: "",
    email: "",
    number: "",
    date: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isFormValid = () => {
      return (
        formData.bookedBy &&
        formData.email &&
        formData.number &&
        formData.age &&
        formData.date
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      ...formData
    };

    try {
      await axios.post("http://localhost:4000/api/booking-class", bookingData);
      notifySuccess('Booking Successful')

      setIsPopupOpen(false);
    } catch (error) {

      notifyFailure('Booking Failed')
    } finally {
      navigate(-1);
    }
  };

  const handleClose = () => {
    setIsPopupOpen(false);
    navigate(-1);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      setIsPopupOpen(false);
      navigate(-1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        setIsPopupOpen(false);
        navigate(-1);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  if (!isPopupOpen) return null;

  return (
    <div className="popup-overlay" onClick={handleOutsideClick}>
      <div className="popup-content">
        <button className="close-button" onClick={handleClose}>
          &times;
        </button>
            <h1>Book a Class</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="bookedBy"
                  value={formData.bookedBy}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Number:
                <input
                  type="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Age:
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </label>

              {isFormValid() && (
                <button type="submit" className="submit-button">
                  Submit Booking
                </button>
              )}
            </form>
      </div>
    </div>
  );
}

export default BookingForm;
