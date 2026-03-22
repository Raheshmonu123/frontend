import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const nav = useNavigate();
  const cards = [
    { title: "Create New ID Card", route: "/create-card", color: "primary" },
    { title: "View Saved ID Cards", route: "/saved-cards", color: "success" },
    { title: "Templates", route: "/templates", color: "info" },
  ];

  return (
    <div className="container mt-5">
      <h2>Dashboard</h2>
      <div className="row gy-3 mt-3">
        {cards.map((item) => (
          <div key={item.title} className="col-md-4">
            <div className={`card border-${item.color} h-100`} style={{ backgroundColor: "#4264c8" }}>
              <div className="card-body d-flex flex-column" style={{ minHeight: "200px" }}>
                <h5 className="card-title">{item.title}</h5>
                <button className={`btn btn-${item.color} mt-auto`} onClick={() => nav(item.route)}>
                  Open
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
