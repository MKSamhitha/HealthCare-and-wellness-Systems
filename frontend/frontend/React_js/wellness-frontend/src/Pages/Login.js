import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/Api";
import { useAuth } from "../context/AuthContext";
import hospital from "../images/hospital.jpg";
const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await loginUser(form);
      const token = res.data.token;
      if (!token) throw new Error("No token received");

      localStorage.setItem("hc_token", token);
      login({ token, user: null });
      navigate("/");
    } catch {
      setError("Login failed—please check your email and password.");
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
        <div
          className="card border-0 rounded-4 p-5 shadow-lg"
          style={{ background: "rgba(255,255,255,0.95)" }}
        >
          <div className="text-center mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/942/942748.png"
              alt="Login Icon"
              style={{ width: "70px" }}
              className="mb-3"
            />
            <h2 className="fw-bold text-success">Welcome Back</h2>
            <p className="text-muted small">Login to your LifeCare account</p>
          </div>

          {error && (
            <div className="alert alert-danger text-center py-2 rounded-3">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control rounded-3 shadow-sm"
                placeholder="you@example.com"
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
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

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
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-3">
            <small className="text-muted">
              Don’t have an account?{" "}
              <a href="/register" className="text-success fw-semibold">Register</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
