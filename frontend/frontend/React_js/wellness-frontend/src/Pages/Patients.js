import React, { useState, useEffect } from "react";
import {
  registerPatient,
  loginPatient,
  getPatientById,
  updatePatientProfile,
  getHealthRecords,
  updateHealthRecords,
} from "../services/Api";
import "bootstrap/dist/css/bootstrap.min.css";

const styles = {
  root: {
    minHeight: "100vh",
    backgroundImage: `url("https://images.pexels.com/photos/4226122/pexels-photo-4226122.jpeg?auto=compress&cs=tinysrgb&w=1920")`, // ✅ hospital background
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  cardSplit: {
    display: "flex",
    width: "860px",
    borderRadius: "14px",
    background: "rgba(255, 255, 255, 0.9)", // ✅ glass effect card
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    overflow: "hidden",
    backdropFilter: "blur(10px)",
  },
  sideLeft: {
    width: "40%",
    background: "linear-gradient(135deg, #2c3e50, #34495e)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2.5rem 1.5rem",
    color: "#fff",
    textAlign: "center",
  },
  helloText: { fontWeight: "700", fontSize: "2rem", marginBottom: "1rem" },
  leftSubtext: {
    fontSize: "1rem",
    fontWeight: "500",
    maxWidth: "250px",
  },
  sideRight: {
    width: "60%",
    padding: "2.5rem",
    display: "flex",
    flexDirection: "column",
  },
  logoRow: { marginBottom: "1rem" },
  logoText: {
    fontWeight: "700",
    color: "#2c3e50",
    fontSize: "1.7rem",
  },
  hospitalText: { fontWeight: "500", fontSize: "1.1rem", color: "#555" },
  tabContainer: {
    display: "flex",
    marginBottom: "1.5rem",
    borderBottom: "2px solid #eee",
  },
  tab: {
    flex: 1,
    padding: "10px 0",
    cursor: "pointer",
    fontWeight: "500",
    color: "#666",
    borderBottom: "3px solid transparent",
    textAlign: "center",
    transition: "all 0.3s ease",
  },
  tabActive: {
    fontWeight: "700",
    color: "#2c3e50",
    borderBottom: "3px solid #2c3e50",
  },
  input: {
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    backgroundColor: "#f9fbfc",
    padding: "10px 12px",
    fontSize: "1rem",
    marginBottom: "1rem",
    outline: "none",
  },
  textarea: {
    width: "100%",
    minHeight: "100px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    backgroundColor: "#f9fbfc",
    padding: "10px 12px",
    fontSize: "1rem",
    marginBottom: "1rem",
    outline: "none",
  },
  button: {
    width: "60%",
    alignSelf: "center",
    borderRadius: "8px",
    border: "none",
    padding: "10px 0",
    fontWeight: "600",
    fontSize: "1rem",
    background: "#2c3e50",
    color: "#fff",
    cursor: "pointer",
    marginTop: "0.8rem",
    transition: "all 0.3s ease",
  },
  buttonGray: {
    background: "#bdc3c7",
    color: "#333",
  },
  alertMessage: {
    marginBottom: "1rem",
    fontWeight: "600",
    color: "#e74c3c",
    fontSize: "0.9rem",
    textAlign: "center",
  },
  viewBox: {
    marginTop: "2rem",
    padding: "2rem",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.85)", // ✅ subtle card inside profile
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    backdropFilter: "blur(8px)",
  },
  viewHeading: {
    fontSize: "1.3rem",
    fontWeight: "700",
    marginBottom: "1rem",
    color: "#2c3e50",
    borderBottom: "2px solid #2c3e50",
    paddingBottom: "0.5rem",
  },
  recordText: { marginBottom: "0.5rem", fontSize: "1rem", color: "#333" },
};

const Patients = () => {
  const [activeTab, setActiveTab] = useState("register");
  const [patientId, setPatientId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("jwt_token") || "");
  const [patient, setPatient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    password: "",
  });
  const [healthRecords, setHealthRecords] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (token && patientId) fetchPatient();
  }, [token, patientId]);

  const fetchPatient = async () => {
    try {
      const resPatient = await getPatientById(patientId, token);
      setPatient(resPatient.data);
      const resRecords = await getHealthRecords(patientId, token);
      setHealthRecords(resRecords.data.records);
    } catch {
      setErrorMessage("Failed to fetch patient data.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerPatient(patient);
      setPatientId(res.data.id);
      setActiveTab("login");
      alert("✅ Registered successfully! Please login.");
    } catch {
      setErrorMessage("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginPatient({
        email: patient.email,
        password: patient.password,
      });
      const jwtToken = res.data.token;
      localStorage.setItem("jwt_token", jwtToken);
      setToken(jwtToken);
      setPatientId(res.data.patientId);
      alert("🎉 Login successful!");
    } catch {
      setErrorMessage("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const res = await updatePatientProfile(patientId, patient, token);
      setPatient(res.data);
      alert("Profile updated!");
      setEditMode(false);
    } catch {
      setErrorMessage("Profile update failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateHealthRecords = async () => {
    setLoading(true);
    try {
      const res = await updateHealthRecords(patientId, healthRecords, token);
      setHealthRecords(res.data.healthRecords);
      alert("Health records updated!");
      setEditMode(false);
    } catch {
      setErrorMessage("Failed to update health records.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.cardSplit}>
        {/* Left Section */}
        <div style={styles.sideLeft}>
          <div style={styles.helloText}>Welcome to LifeCare</div>
          <div style={styles.leftSubtext}>
            A smarter way to manage your health records and personal info.
          </div>
        </div>

        {/* Right Section */}
        <div style={styles.sideRight}>
          <div style={styles.logoRow}>
            <div style={styles.logoText}>LifeCare</div>
            <div style={styles.hospitalText}>Patient Portal</div>
          </div>

          {/* Tabs */}
          <div style={styles.tabContainer}>
            <div
              style={{
                ...styles.tab,
                ...(activeTab === "register" ? styles.tabActive : {}),
              }}
              onClick={() => setActiveTab("register")}
            >
              Register
            </div>
            <div
              style={{
                ...styles.tab,
                ...(activeTab === "login" ? styles.tabActive : {}),
              }}
              onClick={() => setActiveTab("login")}
            >
              Login
            </div>
          </div>

          {errorMessage && (
            <div style={styles.alertMessage}>{errorMessage}</div>
          )}

          {/* Register Form */}
          {activeTab === "register" && (
            <form onSubmit={handleRegister}>
              <input
                style={styles.input}
                placeholder="Full Name"
                value={patient.name}
                onChange={(e) =>
                  setPatient({ ...patient, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                style={styles.input}
                placeholder="Email"
                value={patient.email}
                onChange={(e) =>
                  setPatient({ ...patient, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                style={styles.input}
                placeholder="Password"
                value={patient.password}
                onChange={(e) =>
                  setPatient({ ...patient, password: e.target.value })
                }
                required
              />
              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          )}

          {/* Login Form */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin}>
              <input
                type="email"
                style={styles.input}
                placeholder="Email"
                value={patient.email}
                onChange={(e) =>
                  setPatient({ ...patient, email: e.target.value })
                }
                required
              />
              <input
                type="password"
                style={styles.input}
                placeholder="Password"
                value={patient.password}
                onChange={(e) =>
                  setPatient({ ...patient, password: e.target.value })
                }
                required
              />
              <button type="submit" style={styles.button} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          )}

          {/* Profile + Health Records */}
          {token && patientId && (
            <div style={styles.viewBox}>
              <h3 style={styles.viewHeading}>My Profile</h3>

              {!editMode ? (
                <>
                  <p style={styles.recordText}>
                    <strong>Name:</strong> {patient.name}
                  </p>
                  <p style={styles.recordText}>
                    <strong>Email:</strong> {patient.email}
                  </p>
                  <p style={styles.recordText}>
                    <strong>Phone:</strong> {patient.phone}
                  </p>
                  <p style={styles.recordText}>
                    <strong>Address:</strong> {patient.address}
                  </p>
                  <p style={styles.recordText}>
                    <strong>DOB:</strong> {patient.dob}
                  </p>
                  <p style={styles.recordText}>
                    <strong>Health Records:</strong> {healthRecords}
                  </p>
                  <button
                    onClick={() => setEditMode(true)}
                    style={styles.button}
                  >
                    Edit Details
                  </button>
                </>
              ) : (
                <>
                  <input
                    style={styles.input}
                    placeholder="Name"
                    value={patient.name}
                    onChange={(e) =>
                      setPatient({ ...patient, name: e.target.value })
                    }
                  />
                  <input
                    style={styles.input}
                    placeholder="Phone"
                    value={patient.phone}
                    onChange={(e) =>
                      setPatient({ ...patient, phone: e.target.value })
                    }
                  />
                  <input
                    style={styles.input}
                    placeholder="Address"
                    value={patient.address}
                    onChange={(e) =>
                      setPatient({ ...patient, address: e.target.value })
                    }
                  />
                  <input
                    type="date"
                    style={styles.input}
                    value={patient.dob}
                    onChange={(e) =>
                      setPatient({ ...patient, dob: e.target.value })
                    }
                  />
                  <textarea
                    style={styles.textarea}
                    value={healthRecords}
                    onChange={(e) => setHealthRecords(e.target.value)}
                  />
                  <button
                    onClick={handleUpdateProfile}
                    style={styles.button}
                    disabled={loading}
                  >
                    Save Profile
                  </button>
                  <button
                    onClick={handleUpdateHealthRecords}
                    style={styles.button}
                    disabled={loading}
                  >
                    Save Health Records
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    style={{ ...styles.button, ...styles.buttonGray }}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Patients;
