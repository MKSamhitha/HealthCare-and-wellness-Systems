import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/Api";
import hospital from "../images/hospital.jpg";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "PATIENT" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await registerUser(form);
      alert("🎉 Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage: `url(${hospital})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        padding: "40px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.35)",
          zIndex: 0,
        }}
      ></div>

      <div style={{ position: "relative", zIndex: 1 }} className="col-md-7 col-lg-5">
        <div className="card border-0 rounded-4 p-5 shadow-lg" style={{ background: "rgba(255,255,255,0.95)" }}>
          <div className="text-center mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2966/2966489.png"
              alt="Register Icon"
              style={{ width: "70px" }}
              className="mb-3"
            />
            <h2 className="fw-bold text-success">Join LifeCare Today</h2>
            <p className="text-muted small">
              Create an account to manage your health, appointments, and wellness services.
            </p>
          </div>

          {error && <div className="alert alert-danger text-center py-2 rounded-3">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control rounded-3 shadow-sm"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control rounded-3 shadow-sm"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control rounded-3 shadow-sm"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="role" className="form-label fw-semibold">Select Role</label>
              <select
                id="role"
                name="role"
                className="form-select rounded-3 shadow-sm"
                value={form.role}
                onChange={handleChange}
                required
              >
                <option value="PATIENT">Patient</option>
                <option value="DOCTOR">Doctor</option>
                <option value="WELLNESS_PROVIDER">Wellness Provider</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn w-100 rounded-3 py-2 fw-bold shadow-sm"
              style={{ background: "linear-gradient(135deg, #43cea2, #185a9d)", color: "#fff", border: "none" }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">
              Already have an account?{" "}
              <a href="/login" className="text-success fw-semibold">Login</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
