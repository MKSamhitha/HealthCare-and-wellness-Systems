import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createAppointment, getProviders } from "../services/Api";

const Appointments = () => {
  const [form, setForm] = useState({
    providerId: "",
    date: "",
    time: "",
    notes: "",
  });
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await getProviders();
        setProviders(res.data);
      } catch {
        setError("Failed to load providers.");
      }
    };
    fetchProviders();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await createAppointment(form);
      localStorage.setItem("hc_appointmentId", res.data.id);
      alert("Appointment booked successfully!");
      navigate("/payments"); 
    } catch {
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage: `linear-gradient(
            rgba(220, 227, 234, 0.7), 
            rgba(207, 216, 223, 0.7)
          ), url("https://images.unsplash.com/photo-1586773860418-d37222d8fce3")`, // ✅ hospital consultation bg
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div className="col-md-8 col-lg-6">
        <div
          className="card border-0 rounded-4 p-5 shadow-lg"
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
        >
          <h2 className="text-primary fw-bold mb-4 text-center">
            Book an Appointment
          </h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <select
                name="providerId"
                className="form-select rounded-3 shadow-sm"
                value={form.providerId}
                onChange={handleChange}
                required
              >
                <option value="">Select a Provider</option>
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.specialization}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <input
                type="date"
                name="date"
                className="form-control rounded-3 shadow-sm"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <input
                type="time"
                name="time"
                className="form-control rounded-3 shadow-sm"
                value={form.time}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <textarea
                name="notes"
                className="form-control rounded-3 shadow-sm"
                placeholder="Notes (optional)"
                value={form.notes}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 d-grid">
              <button
                type="submit"
                className="btn w-100 rounded-3 py-2 fw-bold shadow-sm"
                style={{
                  background: "linear-gradient(135deg, #43cea2, #185a9d)",
                  color: "#fff",
                  border: "none",
                }}
                disabled={loading}
              >
                {loading ? "Booking..." : "Book Appointment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
