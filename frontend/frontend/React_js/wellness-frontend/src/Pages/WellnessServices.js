import React, { useState, useEffect } from "react";
import {
  getWellnessServices,
  createWellnessService,
  updateWellnessService,
  deleteWellnessService,
} from "../services/Api";
import { Card, Form, Button, Table, Spinner, Collapse, Alert } from "react-bootstrap";

const WellnessServices = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    serviceName: "",
    description: "",
    duration: "",
    fee: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showServices, setShowServices] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setError("");
    try {
      const response = await getWellnessServices();
      setServices(response.data);
    } catch {
      setError("Failed to load services.");
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.serviceName || !form.description || !form.duration || !form.fee) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    const payload = {
      name: form.serviceName,
      description: form.description,
      duration: form.duration,
      fee: form.fee,
    };
    try {
      if (editId) {
        await updateWellnessService(editId, payload);
        setSuccess("Service updated successfully.");
        setEditId(null);
      } else {
        await createWellnessService(payload);
        setSuccess("Service created successfully.");
      }
      setForm({ serviceName: "", description: "", duration: "", fee: "" });
      fetchServices();
    } catch {
      setError("Failed to save service.");
    }
    setLoading(false);
  }

  function handleEdit(service) {
    setEditId(service.id);
    setForm({
      serviceName: service.name || "",
      description: service.description || "",
      duration: service.duration || "",
      fee: service.fee || "",
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await deleteWellnessService(id);
      if (editId === id) setEditId(null);
      setSuccess("Service deleted successfully.");
      fetchServices();
    } catch {
      setError("Failed to delete service.");
    }
    setLoading(false);
  }

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
      {/* overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.25)",
          zIndex: 0,
        }}
      ></div>

      {/* card container */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "900px" }}>
        <Card className="border-0 rounded-4 shadow-lg" style={{ background: "rgba(255,255,255,0.95)" }}>
          <Card.Body>
            {/* Header */}
            <div className="text-center mb-4">
              <h2 className="fw-bold text-success">Wellness Services</h2>
              <p className="text-muted">Manage all your wellness programs here</p>
            </div>

            {/* Alerts */}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            {/* Form */}
            <Form onSubmit={handleSubmit} className="mb-4">
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="serviceName"
                  placeholder="Service Name"
                  value={form.serviceName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="duration"
                  placeholder="Duration (e.g., 5 days, 2 weeks)"
                  value={form.duration}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  step="0.01"
                  name="fee"
                  placeholder="Fee (e.g., 100.00)"
                  value={form.fee}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button
                type="submit"
                className="w-100 rounded-3 fw-bold"
                style={{
                  background: editId
                    ? "linear-gradient(135deg, #ffb347, #ffcc33)"
                    : "linear-gradient(135deg, #43cea2, #185a9d)",
                  color: "#fff",
                  border: "none",
                }}
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" className="me-2" /> : editId ? "Update Service" : "Create Service"}
                {loading ? "Saving..." : ""}
              </Button>
            </Form>

            {/* Toggle Table */}
            <div className="text-center mb-3">
              <Button
                variant={showServices ? "secondary" : "success"}
                onClick={() => setShowServices(prev => !prev)}
              >
                {showServices ? "Hide Services" : "View Services"}
              </Button>
            </div>

            {/* Table */}
            <Collapse in={showServices}>
              <div>
                <Table bordered hover responsive className="mt-3 shadow-sm">
                  <thead style={{ background: "#20c997", color: "white" }}>
                    <tr>
                      <th>ID</th>
                      <th>Service Name</th>
                      <th>Description</th>
                      <th>Duration</th>
                      <th>Fee</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center p-4">
                          No wellness services found.
                        </td>
                      </tr>
                    ) : (
                      services.map(service => (
                        <tr key={service.id}>
                          <td>{service.id}</td>
                          <td>{service.name}</td>
                          <td>{service.description}</td>
                          <td>{service.duration}</td>
                          <td>{service.fee}</td>
                          <td>
                            <Button size="sm" variant="warning" className="me-2" onClick={() => handleEdit(service)} disabled={loading}>
                              Edit
                            </Button>
                            <Button size="sm" variant="danger" onClick={() => handleDelete(service.id)} disabled={loading}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </div>
            </Collapse>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default WellnessServices;
