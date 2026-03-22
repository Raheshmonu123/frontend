import React, { forwardRef } from "react";

const CardPreview = forwardRef(({ data, images, color, template }, ref) => {
  const templateClass = {
    template1: "border-primary",
    template2: "border-success",
    template3: "border-dark",
  }[template] || "border-primary";

  const style = {
    background: `linear-gradient(145deg, ${color} 0%, #837f7e 100%)`,
    color: "#222",
    border: `3px solid ${color}`,
    minHeight: "360px",
    position: "relative",
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100%" }}>
      <div className="card h-100 shadow-lg" ref={ref} style={{ overflow: "hidden", maxWidth: "400px", width: "100%" }}>
        <div className={`card-body ${templateClass}`} style={style}>
          {/* Header Section */}
          <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-2" style={{ borderColor: color }}>
            <img src={images.logo || "https://via.placeholder.com/80"} alt="logo" style={{ maxWidth: 70, maxHeight: 70 }} />
            <span className="badge bg-light text-dark px-3 py-2">ID CARD</span>
          </div>

          {/* Profile Section */}
          <div className="d-flex flex-column align-items-center text-center mb-4">
            <img src={images.profile || "https://via.placeholder.com/100"} alt="profile" className="rounded-circle mb-3" style={{ width: "90px", height: "90px", objectFit: "cover", border: `3px solid ${color}` }} />
            <h3 className="mb-1 fw-bold">{data.fullName || "Full Name"}</h3>
            <small className="text-muted">{data.role || "Role"}</small>
          </div>

          {/* Details Section */}
          <div className="d-grid gap-2">
            <div className="d-flex justify-content-between px-3 py-2 rounded" style={{ backgroundColor: `${color}15` }}>
              <strong>ID:</strong>
              <span>{data.idNumber || "000000"}</span>
            </div>
            <div className="d-flex justify-content-between px-3 py-2 rounded">
              <strong>Organization:</strong>
              <span>{data.organization || "Organization"}</span>
            </div>
            <div className="d-flex justify-content-between px-3 py-2 rounded" style={{ backgroundColor: `${color}15` }}>
              <strong>Department:</strong>
              <span>{data.department || "Department"}</span>
            </div>
            <div className="d-flex justify-content-between px-3 py-2 rounded">
              <strong>Expiry:</strong>
              <span>{data.expiryDate || "YYYY-MM-DD"}</span>
            </div>
            <div className="d-flex justify-content-between px-3 py-2 rounded" style={{ backgroundColor: `${color}15` }}>
              <strong>Contact:</strong>
              <span>{data.contactInfo || "Contact Info"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CardPreview;
