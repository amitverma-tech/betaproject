import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SplashScreen.css";

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <div className="logo-container">
        <div className="logo">
          <img src="/CompanyLogo.png" alt="logo" />
        </div>
        <h1 style={{color:"black"}}>
          Essential Aquatech <span className="tm">™</span>
        </h1>
      </div>
      <div className="loading">Loading...</div>
    </div>
  );
}

export default SplashScreen;
