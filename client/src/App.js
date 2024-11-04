import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddBoat from "./admin/AddBoat.js";
import Dashboard from "./admin/DashBoard.js";
import Protect from "./admin/Protect.js";

import Home from "./Home/Home.js";
import Booking from "./Booking/Booking.js";
import BookingNew from "./Booking/BookingNew.js";

import Login from "./login/Login.js";
import BookingForm from "./Booking/BookingForm.js";
import CBookingForm from "./Booking/CBookingForm.js";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Activities from "./Home/Activities.js";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/admin", element: <Protect><Dashboard /></Protect> , children: [{ path: "book", element: <BookingForm /> }]},
  { path: "/addBoat", element: <AddBoat /> },
  { path: "/activities", element: <Activities /> },
  { path: "/protect", element: <Protect /> },

  {
    path: "/booking",
    element: <Booking />,
    children: [{path: "booking-class", element: <CBookingForm />},{ path: ":id", element: <BookingForm /> }],
  },
  {
    path: "/login", element: <Login />,
  },
  {
    path: "/test", element: <BookingNew />,
  }
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer
/>

    </div>
  );
}

export default App;
