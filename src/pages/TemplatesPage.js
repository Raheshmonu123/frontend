import React from "react";
import { useNavigate } from "react-router-dom";

const TemplatesPage = () => {
  const nav = useNavigate();
  const templates = [
    { id: "template1", title: "Modern Blue", color: "#3f51b5", description: "Cool modern gradient" },
    { id: "template2", title: "Green Classic", color: "#2e7d32", description: "Trusted corporate style" },
    { id: "template3", title: "Dark Minimal", color: "#424242", description: "Sleek dark UI" },
  ];

  return (
    <div className="container py-4">
      <h3>Templates</h3>
      <div className="row gy-3 mt-2">
        {templates.map((t) => (
          <div className="col-md-4" key={t.id}>
            <div className="card" style={{ borderColor: t.color }}>
              <div className="card-body">
                <h5>{t.title}</h5>
                <p>{t.description}</p>
                <button className="btn btn-outline-primary" onClick={() => nav("/create-card")}>Use Template</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;
