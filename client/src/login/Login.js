import React, { useState, useEffect } from "react";
import logo from "../media/logos/logo-color.png";
import axios from "axios";
import {useNavigate } from "react-router-dom";

import "./Login.scss";


function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const login = await axios.post(
        "http://localhost:4000/api/user/login",
        formData
        , { withCredentials: true }
      );
      navigate('/admin')
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div className="login">
      <div className="login-form">
        <div className="title">
          <img src={logo} alt="Logo" />
          <h2>Log in</h2>
        </div>
        <label>
          email
          <div className="input-div">
            <input
              type="text"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </label>
        <label>
          password
          <div className="input-div">
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </label>
        <button type="submit" className="login-button" onClick={handleSubmit}>
          Log In
        </button>
      </div>
    </div>
  );
}

export default Login;
