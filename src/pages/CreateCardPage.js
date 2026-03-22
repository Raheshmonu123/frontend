import React, { useState, useRef } from "react";
import CardPreview from "../components/CardPreview";
import api from "../services/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const initialData = {
  fullName: "",
  idNumber: "",
  role: "",
  organization: "",
  department: "",
  expiryDate: "",
  contactInfo: "",
};

const CreateCardPage = () => {
  const [form, setForm] = useState(initialData);
  const [images, setImages] = useState({ profile: null, logo: null });
  const [color, setColor] = useState("#2867b2");
  const [template, setTemplate] = useState("template1");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const previewRef = useRef();

  const handleChange = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleFile = (key) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImages((prev) => ({ ...prev, [key]: url }));
  };

  const validate = () => {
    const errs = {};
    Object.keys(initialData).forEach((k) => { if (!form[k].trim()) errs[k] = "Required"; });
    if (!images.profile) errs.profile = "Profile photo is required";
    if (!images.logo) errs.logo = "Logo is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    try {
      await api.createCard({
        ...form,
        cardColor: color,
        template,
        profileUrl: images.profile,
        logoUrl: images.logo,
      });
      setSuccess("ID Card saved successfully");
      setForm(initialData);
      setImages({ profile: null, logo: null });
      setErrors({});
    } catch (err) {
      setSuccess("Save failed: " + (err.response?.data?.message || err.message));
    }
  };

  const exportPNG = async () => {
    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const link = document.createElement("a");
    link.download = "idcard.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const exportPDF = async () => {
    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "landscape" });
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("idcard.pdf");
  };

  return (
    <div className="container py-4">
      <h3>Create ID Card</h3>
      {success && <div className="alert alert-success">{success}</div>}
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              {Object.keys(initialData).map((key) => (
                <div className="mb-3" key={key}>
                  <label className="form-label">{key.replace(/([A-Z])/g, " $1")}</label>
                  <input
                    type={key === "expiryDate" ? "date" : "text"}
                    className={`form-control ${errors[key] ? "is-invalid" : ""}`}
                    value={form[key]}
                    onChange={handleChange(key)}
                  />
                  {errors[key] && <div className="invalid-feedback">{errors[key]}</div>}
                </div>
              ))}
              <div className="mb-3">
                <label className="form-label">Profile Photo</label>
                <input type="file" accept="image/*" className={`form-control ${errors.profile ? "is-invalid" : ""}`} onChange={handleFile("profile")} />
                {errors.profile && <div className="invalid-feedback">{errors.profile}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Company Logo</label>
                <input type="file" accept="image/*" className={`form-control ${errors.logo ? "is-invalid" : ""}`} onChange={handleFile("logo")} />
                {errors.logo && <div className="invalid-feedback">{errors.logo}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Card Color</label>
                <input type="color" className="form-control form-control-color w-50" value={color} onChange={(e) => setColor(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">Template</label>
                <select value={template} className="form-select" onChange={(e) => setTemplate(e.target.value)}>
                  <option value="template1">Modern</option>
                  <option value="template2">Classic</option>
                  <option value="template3">Corporate</option>
                </select>
              </div>
              <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
              <button className="btn btn-primary me-2" onClick={exportPNG}>Export PNG</button>
              <button className="btn btn-secondary" onClick={exportPDF}>Export PDF</button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <CardPreview ref={previewRef} data={form} images={images} color={color} template={template} />
        </div>
      </div>
    </div>
  );
};

export default CreateCardPage;
