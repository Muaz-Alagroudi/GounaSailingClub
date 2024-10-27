const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const boatRoute = require("./routes/boatRoute");
const bookingRoute = require("./routes/bookingRoute");
const classRoute = require("./routes/classRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const paymobRoute = require("./routes/paymobRoute");

const cookieParser = require("cookie-parser");


const app = express();
const PORT = 4000;

// Middleware
// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',  // Allow your frontend app's origin
  credentials: true,  // Allow credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());


// Routes
app.use('/api/boats', boatRoute);
app.use('/api/booking', bookingRoute);
app.use('/api/booking-class', classRoute);
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/paymob', paymobRoute);





const mongoString =
  "mongodb+srv://mualagroudi:Fyj17P3LCkZqfl05@gscdb.1vzfg.mongodb.net/?retryWrites=true&w=majority&appName=GSCDB";

mongoose.connect(mongoString).then(
  () => console.log("Mongo connection established"),
  app.listen(PORT, () => console.log("Listening on port " + PORT))
).catch(e => console.log('[Error] '+ e.message));
