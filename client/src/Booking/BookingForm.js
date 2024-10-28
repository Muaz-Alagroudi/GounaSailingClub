import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookingForm.scss"; // Updated for new styles
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BookingForm() {
  const boatId = useParams(); // Get boatId from URL
  const [isPopupOpen, setIsPopupOpen] = useState(true); // Popup state
  const [boatName, setBoatName] = useState("");
  const [fullDay, setFullDay] = useState(false);
  const navigate = useNavigate();
  const [slots, setSlots] = useState({
    slot1: false,
    slot2: false,
    slot3: false,
  });
  
  const destinations = [
    "Bayoud",
    "Shedwan",
    "Tawila",
    "Gaysoum",
    "Ashrafi",
    "Goubal",
  ];

  // Pricing logic for different destinations
  const destinationPrices = {
    Bayoud: 100000, // Price in cents (50.00 EGP)
    Shedwan: 100000,
    Tawila: 100000,
    Gaysoum: 100000,
    Ashrafi: 100000,
    Goubal: 100000,
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
    status: 'accepted'
  });

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
      }
    } catch (error) {
      toast.error('Failed to load spots, please refresh the page');
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
      const response = await axios.post('https://accept.paymob.com/api/auth/tokens', {
        api_key: process.env.REACT_APP_PAYMOB_API,
      });
      return response.data.token;
    } catch (error) {
      console.error("Error getting token:", error);
    }
  };

  const createOrder = async (authToken, price) => {
    try {
      const response = await axios.post('https://accept.paymob.com/api/ecommerce/orders', {
        auth_token: authToken,
        delivery_needed: "false",
        amount_cents: price,
        currency: "EGP",
        items: [{
          name: formData.destination,
          amount_cents: price,
          quantity: 1,
        }],
      });
      return response.data.id;
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const createPaymentKey = async (authToken, orderId, price) => {
    const integrationID = process.env.REACT_APP_PAYMOB_ID;
    console.log("integration ID : ", integrationID);
    try {
      const response = await axios.post('https://accept.paymob.com/api/acceptance/payment_keys', {
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
          country: 'EG',
        },
        currency: 'EGP',
        integration_id: process.env.REACT_APP_PAYMOB_ID,
      });
      return response.data.token;
    } catch (error) {
      console.error("Error creating payment key:", error);
    }
  };

  

  const handleCheckout = async () => {
    const authToken = await getAuthToken();
    console.log("Auth token :", authToken);
    const price = destinationPrices[formData.destination];  // Get price based on destination
    console.log("price: ", price);

    const orderId = await createOrder(authToken, price);
    console.log("order id: ", orderId);

    const paymentKey = await createPaymentKey(authToken, orderId, price);
    console.log("payment key: ", paymentKey)

    // Redirect user to Paymob iframe
    window.location.href = `https://accept.paymob.com/api/acceptance/iframes/875130?payment_token=${paymentKey}`;
  };

  const AddBooking = async (formData) => {
    const bookingData = {
      ...formData,
      boatId: boatId.id,
      boatName: boatName,
    };
    console.log(bookingData);

    try {
      await axios.post(`http://${process.env.REACT_APP_BACKEND}/api/booking`, bookingData);
      // notifySuccess('Booking Successful');

      setIsPopupOpen(false);
    } catch (error) {
      // notifyFailure('Booking Failed');
      console.log(error);
    } finally {
      navigate(-1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast.error('Please complete the form.');
      return;
    }

    try {
      await handleCheckout();  // Trigger Paymob checkout
    } catch (error) {
      toast.error('Checkout failed');
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

        <h1>Book {boatName ? boatName : ''}</h1>
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
              {destinations.map((destination) => (
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
                Full Day Booking (for destinations other than Bayoud):
                <input
                  type="checkbox"
                  name="fullDay"
                  checked={fullDay}
                  onChange={(e) => {
                    setFullDay(e.target.checked);
                    setFormData((prevData) => ({
                      ...prevData,
                      slot1: e.target.checked,
                      slot2: e.target.checked,
                      slot3: e.target.checked,
                    }));
                  }}
                />
              </div>
            </>
          )}

          <button type="submit" className="submit-button" disabled={!isFormValid()}>
            Proceed to Pay
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
