import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {
  getProviders,
  createProvider,
  updateProvider,
  deleteProvider,
} from "../services/Api";

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    password: "",
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState(null);
  const [showProviders, setShowProviders] = useState(false);

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    const res = await getProviders();
    setProviders(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (editId) {
        await updateProvider(editId, form);
        setEditId(null);
      } else {
        await createProvider(form);
      }
      setForm({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        password: "",
      });
      fetchProviders();
    } catch (err) {
      setError(err.response?.data || "Submission failed. Please try again.");
    }
  };

  const handleEdit = (provider) => {
    setEditId(provider.id);
    setForm({
      name: provider.name || "",
      email: provider.email || "",
      phone: provider.phone || "",
      specialization: provider.specialization || "",
      password: "",
    });
  };

  const handleDelete = async (id) => {
    await deleteProvider(id);
    fetchProviders();
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
      <div className="col-md-10 col-lg-8">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Manage Providers</h2>
        </div>

        {/* Form Card */}
        <Card
          className="border-0 rounded-4 shadow-lg mb-4"
          style={{ background: "rgba(255, 255, 255, 0.95)" }}
        >
          <Card.Body>
            <Card.Title className="mb-3 fw-semibold">
              {editId ? "Update Provider" : "Add New Provider"}
            </Card.Title>
            <Form onSubmit={handleSubmit} className="row g-3">
              <Form.Group className="col-md-6">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="rounded-3 shadow-sm"
                />
              </Form.Group>
              <Form.Group className="col-md-6">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="rounded-3 shadow-sm"
                />
              </Form.Group>
              <Form.Group className="col-md-6">
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="rounded-3 shadow-sm"
                />
              </Form.Group>
              <Form.Group className="col-md-6">
                <Form.Control
                  type="text"
                  name="specialization"
                  placeholder="Specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  required
                  className="rounded-3 shadow-sm"
                />
              </Form.Group>
              <Form.Group className="col-md-12">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required={!editId}
                  className="rounded-3 shadow-sm"
                />
              </Form.Group>
              <div className="d-grid">
                <Button
                  type="submit"
                  className="rounded-3 fw-bold shadow-sm"
                  style={{
                    background: editId
                      ? "linear-gradient(135deg, #ffb347, #ffcc33)"
                      : "linear-gradient(135deg, #43cea2, #185a9d)",
                    color: "#fff",
                    border: "none",
                  }}
                >
                  {editId ? "Update Provider" : "Add Provider"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        {/* Toggle Providers */}
        <div className="text-center mb-3">
          <Button
            variant={showProviders ? "secondary" : "info"}
            className="fw-semibold shadow-sm"
            onClick={() => setShowProviders((prev) => !prev)}
          >
            {showProviders ? "Hide Providers ▲" : "View Providers ▼"}
          </Button>
        </div>

        {/* Providers Table */}
        {showProviders && (
          <Card
            className="border-0 rounded-4 shadow-lg"
            style={{ background: "rgba(255, 255, 255, 0.95)" }}
          >
            <Card.Body>
              <Table responsive hover bordered className="align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Specialization</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {providers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No providers found.
                      </td>
                    </tr>
                  ) : (
                    providers.map((p) => (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td className="fw-semibold">{p.name}</td>
                        <td>{p.email}</td>
                        <td>{p.phone}</td>
                        <td>
                          <span className="badge bg-success">
                            {p.specialization}
                          </span>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            variant="outline-warning"
                            className="me-2"
                            onClick={() => handleEdit(p)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleDelete(p.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}

        {error && (
          <div className="text-danger mt-3 text-center fw-semibold">{error}</div>
        )}
      </div>
    </div>
  );
};

export default Providers;
