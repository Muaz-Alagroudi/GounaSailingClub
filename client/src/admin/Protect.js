import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Protect.css";

function Protect({ children }) {
  axios.defaults.withCredentials = true;
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAuth();
  }, []);

  const getAuth = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/auth");
      console.log(response.status);
      setIsAuthenticated(true);

    } catch (error) {

      navigate("/login");
    }
  };

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <div className="loading">
          <div className="loader"></div>
        </div>
      )}
    </>
  );
}

export default Protect;
