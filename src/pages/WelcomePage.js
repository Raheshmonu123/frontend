import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const nav = useNavigate();
  return (
    <div className="welcome-bg d-flex align-items-center justify-content-center vh-100 text-white">
      <div className="text-center p-5 rounded shadow-lg" style={{ background: "rgba(0,0,0,0.45)" }}>
        <h1>ID Card Generator System</h1>
        <p>Create professional ID cards quickly.</p>
        <button className="btn btn-light mt-3" onClick={() => nav("/login")}>Get Started</button>
      </div>
    </div>
  );
};

export default WelcomePage;
