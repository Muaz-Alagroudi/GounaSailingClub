import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookingForm.scss"; // Updated for new styles
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookingForm() {
  const boatId = useParams(); // Get boatId from URL
  const [isPopupOpen, setIsPopupOpen] = useState(true); // Popup state
  const [boatName, setBoatName] = useState("");
  const [fullDay, setFullDay] = useState(false);
  const navigate = useNavigate();
  const [slotNum, setSlotNum] = useState(0);
  const [slots, setSlots] = useState({
    slot1: false,
    slot2: false,
    slot3: false,
  });

  const destinations = ["Bayoud", "Shedwan", "Tawila", "Gaysoum"];
  const validDestinations = (boat) => {
    if (boat === 'Baboshka' || boat === 'Hayasu'){
      return destinations;
    } else {
      return [destinations[0]];
    }
  };

  const [formData, setFormData] = useState({
    bookedBy: "",
    email: "",
    number: "",
    destination: "",
    date: "",
    slot1: false,
    slot2: false,
    slot3: false,
    code: "",
    status: "accepted",
    dropOff: false,
    money: 0,
  });

  useEffect(() => {
    let cost = 0; // Initialize price

    if (formData.destination.toLowerCase() === 'bayoud') {
        if (boatName.toLowerCase() === 'skaya') {
            if (slotNum === 1) {
                cost = 8000;
            } else if (slotNum === 2) {
                cost = 12000;
            } else if (slotNum === 3) {
                cost = 15000;
            } console.log(cost);
        } else if (boatName.toLowerCase() === 'baboshka') {
            if (slotNum === 1) {
                cost = 8000;
            } else if (slotNum === 2) {
                cost = 12000;
            } else if (slotNum === 3) {
                cost = 15000;
            }
        } else if (boatName.toLowerCase() === 'sealine' || boatName.toLowerCase() === 'mayar') {
            if (slotNum === 1) {
                cost = 4500;
            } else if (slotNum === 2) {
                cost = 8000;
            } else if (slotNum === 3) {
                cost = 11000;
            }
        } else if (boatName.toLowerCase() === 'hayasu') {
            if (slotNum === 1) {
                cost = 8000;
            } else if (slotNum === 2) {
                cost = 12000;
            } else if (slotNum === 3) {
                cost = 15000;
            }
        }
    } else if (formData.destination.toLowerCase() === 'shedwan') {
        if (boatName.toLowerCase() === 'baboshka') {
            cost = 16000;
        } else if (boatName.toLowerCase() === 'hayasu') {
            cost = 16000;
        }
    } else if (formData.destination.toLowerCase() === 'tawila') {
        if (boatName.toLowerCase() === 'baboshka') {
            cost = 18000;
        } else if (boatName.toLowerCase() === 'hayasu') {
            cost = 18000;
        }
    } else if (formData.destination.toLowerCase() === 'gaysoum') {
        if (boatName.toLowerCase() === 'baboshka') {
            cost = 20000;
        } else if (boatName === 'Hayasu') {
            cost = 20000;
        }
    }
    
    // Drop-off pricing for Shedwan, Tawila, and Gaysoum
    if (formData.destination.toLowerCase() === 'shedwan' && formData.dropOff === true) {
        if (boatName.toLowerCase() === 'baboshka' || boatName.toLowerCase() === 'hayasu') {
            cost = 10000;
        }
    } else if (formData.destination.toLowerCase() === 'tawila' && formData.dropOff === true) {
        if (boatName.toLowerCase() === 'baboshka') {
            cost = 12000;
        } else if (boatName.toLowerCase() === 'hayasu') {
            cost = 12000;
        }
    } else if (formData.destination.toLowerCase() === 'gaysoum' && formData.dropOff === true) {
        if (boatName.toLowerCase() === 'baboshka') {
            cost = 14000;
        } else if (boatName.toLowerCase() === 'hayasu') {
            cost = 14000;
        }
    }

    setFormData((prev)=>({
      ...prev,
      money: cost
    }));
    
  }, [formData, slots]);

  useEffect(() => {
    const numSlots =
      Number(formData.slot1) + Number(formData.slot2) + Number(formData.slot3);
    setSlotNum(numSlots);
  }, [formData.slot1, formData.slot2, formData.slot3]);

  useEffect(() => {
    const fetchBoatName = async () => {
      try {
        const response = await axios.get(
          `http://${process.env.REACT_APP_BACKEND}/api/boats/${boatId.id}`
        );
        setBoatName(response.data.name);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBoatName();
  }, [boatId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Reset slots when new date or destination is selected
    setFormData((prev) => ({
      ...prev,
      slot1: false,
      slot2: false,
      slot3: false,
    }));

    const newDate = name === "date" ? value : formData.date;
    const newDestination =
      name === "destination" ? value : formData.destination;

    if (!newDate) return;

    try {
      const slotData = await axios.get(
        `http://${process.env.REACT_APP_BACKEND}/api/booking/available/${boatId.id}/${newDate}`
      );

      if (
        (!slotData.data.slot1 ||
          !slotData.data.slot2 ||
          !slotData.data.slot3) &&
        newDestination !== "Bayoud"
      ) {
        setFullDay(false);
        setSlots({ slot1: false, slot2: false, slot3: false });
      } else {
        setFullDay(true);
        setSlots(slotData.data);
        setFormData((prev)=>({
          ...prev,
          slot1: true,
          slot2: true,
          slot3: true,
        }))
      }
    } catch (error) {
      toast.error("Failed to load spots, please refresh the page");
    }
  };

  const isFormValid = () => {
    return (
      (formData.bookedBy &&
        formData.email &&
        formData.number &&
        formData.destination &&
        formData.date &&
        (formData.slot1 || formData.slot2 || formData.slot3)) ||
      (fullDay && formData.date && formData.destination !== "Bayoud")
    );
  };

  // Paymob API integration
  const getAuthToken = async () => {
    try {
      const response = await axios.post(
        "https://accept.paymob.com/api/auth/tokens",
        {
          api_key: process.env.REACT_APP_PAYMOB_API,
        }
      );
      return response.data.token;
    } catch (error) {
      console.error("Error getting token:", error);
    }
  };

  const createOrder = async (authToken, price) => {
    try {
      const response = await axios.post(
        "https://accept.paymob.com/api/ecommerce/orders",
        {
          auth_token: authToken,
          delivery_needed: "false",
          amount_cents: price,
          currency: "EGP",
          items: [
            {
              name: formData.destination,
              amount_cents: price,
              quantity: 1,
            },
          ],
        }
      );
      return response.data.id;
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const createPaymentKey = async (authToken, orderId, price) => {
    const integrationID = process.env.REACT_APP_PAYMOB_ID;
    console.log("integration ID : ", integrationID);
    try {
      const response = await axios.post(
        "https://accept.paymob.com/api/acceptance/payment_keys",
        {
          auth_token: authToken,
          amount_cents: price,
          order_id: orderId,
          billing_data: {
            street: "NA",
            building: "NA",
            floor: "NA",
            apartment: "NA",
            city: "NA",
            first_name: formData.bookedBy,
            last_name: "NA",
            email: formData.email,
            phone_number: formData.number,
            country: "EG",
          },
          currency: "EGP",
          integration_id: process.env.REACT_APP_PAYMOB_ID,
        }
      );
      return response.data.token;
    } catch (error) {
      console.error("Error creating payment key:", error);
    }
  };

  const handleCheckout = async () => {
    const authToken = await getAuthToken();
    console.log("Auth token :", authToken);
    const price = ((formData.money * 100) * 0.25); // Get price based on destination
    console.log("price: ", price);

    const orderId = await createOrder(authToken, price);
    console.log("order id: ", orderId);

    const paymentKey = await createPaymentKey(authToken, orderId, price);
    console.log("payment key: ", paymentKey);

    // Redirect user to Paymob iframe
    window.location.href = `https://accept.paymob.com/api/acceptance/iframes/875130?payment_token=${paymentKey}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please complete the form.");
      return;
    }

    try {
      // const addBookings = await axios.post('http://process.env.REACT_APP_BACKEND/api/booking', formData);
      await handleCheckout(); // Trigger Paymob checkout
    } catch (error) {
      toast.error("Checkout failed");
      console.error(error);
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

        <h1>Book {boatName ? boatName : ""}</h1>
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
            Code (optional):
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
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
            Destination:
            <select
              name="destination"
              value={formData.destination}
              onChange={handleDateChange}
              required
            >
              <option value="">Select a destination</option>
              {validDestinations(boatName).map((destination) => (
                <option key={destination} value={destination}>
                  {destination}
                </option>
              ))}
            </select>
          </label>

          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleDateChange}
              required
            />
          </label>

          {formData.destination === "Bayoud" ? (
            <>
              <label>
                9:00 am - 12:00 pm:
                <input
                  type="checkbox"
                  name="slot1"
                  checked={formData.slot1}
                  onChange={handleChange}
                  disabled={!slots.slot1}
                />
              </label>

              <label>
                12:00 pm - 3:00 pm:
                <input
                  type="checkbox"
                  name="slot2"
                  checked={formData.slot2}
                  onChange={handleChange}
                  disabled={!slots.slot2}
                />
              </label>

              <label>
                3:00 pm - 6:00 pm:
                <input
                  type="checkbox"
                  name="slot3"
                  checked={formData.slot3}
                  onChange={handleChange}
                  disabled={!slots.slot3}
                />
              </label>
            </>
          ) : (
            <>
              <div className="full-day">
                <h3>{formData.date? fullDay? 'Full day trip available': 'Full day trip unavailable for this date' : 'Please select a date'}</h3>
                <br></br>

                <div>
                Drop-off only
                <input
                  type="checkbox"
                  name="dropOff"
                  checked={formData.dropOff}
                  onChange={(e) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      dropOff: !formData.dropOff,
                    }));
                  }}
                ></input>

                </div>
                  

              </div>
            </>
          )}
          <p>price {formData.money} </p>
          <p>deposit {formData.money * 0.25} </p>
          {/* <p>slots {slotNum} </p>
          <p>destination {formData.destination} </p>
          <p>dropoff {formData.dropOff? 'yes': 'no'} </p> */}
          <button
            type="submit"
            className="submit-button"
            disabled={!isFormValid()}
          >
            Proceed to Pay
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
