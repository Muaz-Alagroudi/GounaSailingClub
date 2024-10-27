// Modal.js
import React from "react";
import "./Modal.scss";

const Modal = ({ show, onClose, onSubmit, boatName }) => {
  if (!show) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    const { date, slot1, slot2, slot3 } = event.target.elements;
    onSubmit({
      boatName,
      date: date.value,
      slot1: slot1.checked,
      slot2: slot2.checked,
      slot3: slot3.checked,
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Book {boatName}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Date:
            <input type="date" name="date" required />
          </label>
          <label>
            Slot 1: 9:00 AM to 12:00 PM
            <input type="checkbox" name="slot1" />
          </label>
          <label>
            Slot 2: 12:00 PM to 3:00 PM
            <input type="checkbox" name="slot2" />
          </label>
          <label>
            Slot 3: 3:00 PM to 6:00 PM
            <input type="checkbox" name="slot3" />
          </label>
          <button type="submit">Book</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
