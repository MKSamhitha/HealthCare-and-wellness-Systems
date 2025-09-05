import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment,
} from "../services/Api";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({
    patientName: "",
    amount: "",
    paymentDate: "",
    status: "Pending",
  });
  const [editId, setEditId] = useState(null);
  const [showPayments, setShowPayments] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const res = await getPayments();
    setPayments(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updatePayment(editId, form);
      setEditId(null);
    } else {
      await createPayment(form);
    }
    setForm({ patientName: "", amount: "", paymentDate: "", status: "Pending" });
    fetchPayments();
  };

  const handleEdit = (payment) => {
    setEditId(payment.id);
    setForm({
      patientName: payment.patientName,
      amount: payment.amount,
      paymentDate: payment.paymentDate,
      status: payment.status,
    });
  };

  const handleDelete = async (id) => {
    await deletePayment(id);
    fetchPayments();
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        padding: "40px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div style={{
        position: "absolute",
        top:0,
        left:0,
        width:"100%",
        height:"100%",
        backgroundColor:"rgba(0,0,0,0.25)",
        zIndex:0
      }}></div>

      <div style={{ position: "relative", zIndex: 1 }} className="col-md-10 col-lg-8">
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Payments</h2>
        </div>

        <Card className="border-0 rounded-4 shadow-lg mb-4" style={{ background: "rgba(255,255,255,0.95)" }}>
          <Card.Body>
            <Card.Title className="mb-3 fw-semibold">
              {editId ? "Update Payment" : "Add Payment"}
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
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  value={form.amount}
                  onChange={handleChange}
                  required
                  className="rounded-3 shadow-sm"
                />
              </Form.Group>
              <Form.Group className="col-md-6">
                <Form.Control
                  type="date"
                  name="paymentDate"
                  value={form.paymentDate}
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
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
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
                  {editId ? "Update Payment" : "Add Payment"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        <div className="text-center mb-3">
          <Button
            variant={showPayments ? "secondary" : "info"}
            className="fw-semibold shadow-sm"
            onClick={() => setShowPayments((prev) => !prev)}
          >
            {showPayments ? "Hide Payments ▲" : "View Payments ▼"}
          </Button>
        </div>

        {showPayments && (
          <Card className="border-0 rounded-4 shadow-lg" style={{ background: "rgba(255,255,255,0.95)" }}>
            <Card.Body>
              <Table responsive hover bordered className="align-middle">
                <thead className="table-success">
                  <tr>
                    <th>#</th>
                    <th>Patient</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No payments found.
                      </td>
                    </tr>
                  ) : (
                    payments.map((p) => (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td className="fw-semibold">{p.patientName}</td>
                        <td>₹{p.amount}</td>
                        <td>{p.paymentDate}</td>
                        <td>
                          <span className={`badge ${p.status === "Completed" ? "bg-success" : "bg-warning text-dark"}`}>
                            {p.status}
                          </span>
                        </td>
                        <td>
                          <Button size="sm" variant="outline-warning" className="me-2" onClick={() => handleEdit(p)}>Edit</Button>
                          <Button size="sm" variant="outline-danger" onClick={() => handleDelete(p.id)}>Delete</Button>
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

export default Payments;
