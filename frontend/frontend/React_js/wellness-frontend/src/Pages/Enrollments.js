import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {
  getEnrollments,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
} from "../services/Api";

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [form, setForm] = useState({
    patientName: "",
    programName: "",
    enrollmentDate: "",
    status: "Active",
  });
  const [editId, setEditId] = useState(null);
  const [showEnrollments, setShowEnrollments] = useState(false);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    const res = await getEnrollments();
    setEnrollments(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateEnrollment(editId, form);
      setEditId(null);
    } else {
      await createEnrollment(form);
    }
    setForm({ patientName: "", programName: "", enrollmentDate: "", status: "Active" });
    fetchEnrollments();
  };

  const handleEdit = (enrollment) => {
    setEditId(enrollment.id);
    setForm({
      patientName: enrollment.patientName,
      programName: enrollment.programName,
      enrollmentDate: enrollment.enrollmentDate,
      status: enrollment.status,
    });
  };

  const handleDelete = async (id) => {
    await deleteEnrollment(id);
    fetchEnrollments();
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
          <h2 className="fw-bold text-primary">Enrollments</h2>
        </div>

        {/* Enrollment Form */}
        <Card
          className="border-0 rounded-4 shadow-lg mb-4"
          style={{ background: "rgba(255, 255, 255, 0.95)" }}
        >
          <Card.Body>
            <Card.Title className="mb-3 fw-semibold">
              {editId ? "Update Enrollment" : "Add Enrollment"}
            </Card.Title>
            <Form onSubmit={handleSubmit} className="row g-3">
              <Form.Group className="col-md-6">
                <Form.Control
                  type="text"
                  name="patientName"
                  placeholder="Patient Name"
                  value={form.patientName}
                  onChange={handleChange}
                  required
                  className="rounded-3 shadow-sm"
                />
              </Form.Group>
              <Form.Group className="col-md-6">
                <Form.Control
                  type="text"
                  name="programName"
                  placeholder="Program Name"
                  value={form.programName}
                  onChange={handleChange}
                  required
                  className="rounded-3 shadow-sm"
                />
              </Form.Group>
              <Form.Group className="col-md-6">
                <Form.Control
                  type="date"
                  name="enrollmentDate"
                  value={form.enrollmentDate}
                  onChange={handleChange}
                  required
                  className="rounded-3 shadow-sm"
                />
              </Form.Group>
              <Form.Group className="col-md-6">
                <Form.Select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="rounded-3 shadow-sm"
                >
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Select>
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
                  {editId ? "Update Enrollment" : "Add Enrollment"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        {/* Toggle Enrollments */}
        <div className="text-center mb-3">
          <Button
            variant={showEnrollments ? "secondary" : "info"}
            className="fw-semibold shadow-sm"
            onClick={() => setShowEnrollments((prev) => !prev)}
          >
            {showEnrollments ? "Hide Enrollments ▲" : "View Enrollments ▼"}
          </Button>
        </div>

        {/* Enrollments Table */}
        {showEnrollments && (
          <Card
            className="border-0 rounded-4 shadow-lg"
            style={{ background: "rgba(255, 255, 255, 0.95)" }}
          >
            <Card.Body>
              <Table responsive hover bordered className="align-middle">
                <thead className="table-info">
                  <tr>
                    <th>#</th>
                    <th>Patient</th>
                    <th>Program</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No enrollments found.
                      </td>
                    </tr>
                  ) : (
                    enrollments.map((e) => (
                      <tr key={e.id}>
                        <td>{e.id}</td>
                        <td className="fw-semibold">{e.patientName}</td>
                        <td>{e.programName}</td>
                        <td>{e.enrollmentDate}</td>
                        <td>
                          <span
                            className={`badge ${
                              e.status === "Active"
                                ? "bg-success"
                                : e.status === "Completed"
                                ? "bg-primary"
                                : "bg-danger"
                            }`}
                          >
                            {e.status}
                          </span>
                        </td>
                        <td>
                          <Button
                            size="sm"
                            variant="outline-warning"
                            className="me-2"
                            onClick={() => handleEdit(e)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleDelete(e.id)}
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
      </div>
    </div>
  );
};

export default Enrollments;
