import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Container, Row, Col, Card, Button } from "react-bootstrap";

// Hero Data with Real Images
const heroData = [
  {
    title: "Book Your Appointments Online",
    description: "Schedule visits with doctors anytime, anywhere.",
    image:
      "https://images.pexels.com/photos/305568/pexels-photo-305568.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Manage Patient Records",
    description: "Easily track patient history, prescriptions, and treatments.",
    image:
      "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    title: "Explore Wellness Programs",
    description: "Access wellness services for holistic health care.",
    image:
      "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

// Feature Images
const featureImages = {
  appointment:
    "https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=600",
  patients: "https://cdn-icons-png.flaticon.com/512/4320/4320357.png",
  providers:
    "https://images.pexels.com/photos/7680745/pexels-photo-7680745.jpeg?auto=compress&cs=tinysrgb&w=600",
  wellness:
    "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=600",
  enrollments: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  payments: "https://cdn-icons-png.flaticon.com/512/633/633611.png",
};

const Welcome = () => {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "linear-gradient(135deg, #2c3e50, #34495e)", // ✅ dark theme
        color: "#fdfdfd",
      }}
    >
      {/* Custom Header */}
      <header
        style={{
          background: "linear-gradient(135deg, #2c3e50, #34495e)",
          color: "white",
          padding: "15px 20px",
          textAlign: "center",
          fontSize: "1.4rem",
          fontWeight: "bold",
          boxShadow: "0 4px 6px rgba(0,0,0,0.4)",
        }}
      >
        Life Care Hospital
      </header>

      {/* Hero Carousel */}
      <Carousel fade className="mb-5">
        {heroData.map((slide, index) => (
          <Carousel.Item key={index} interval={5000}>
            <div
              className="d-flex flex-column align-items-center justify-content-center text-center"
              style={{
                height: "70vh",
                background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), 
                             url('${slide.image}') center/cover`,
                color: "white",
              }}
            >
              <h2 className="fw-bold">{slide.title}</h2>
              <p className="lead">{slide.description}</p>
              <Button
                as={Link}
                to="/appointments"
                variant="light"
                className="mt-3 px-4 py-2 fw-semibold"
              >
                Get Started
              </Button>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Feature Section */}
      <Container className="pb-5">
        <h2 className="text-center mb-5 fw-bold text-light">Our Features</h2>
        <Row className="g-4">
          {/* Cards */}
          {[
            {
              title: "Book Appointment",
              text: "Schedule visits with doctors quickly and securely.",
              img: featureImages.appointment,
              link: "/appointments",
              btn: "Get Started",
            },
            {
              title: "Patients",
              text: "Manage patient records, prescriptions, and history.",
              img: featureImages.patients,
              link: "/patients",
              btn: "Manage",
            },
            {
              title: "Providers",
              text: "Doctors and wellness providers at your fingertips.",
              img: featureImages.providers,
              link: "/providers",
              btn: "View",
            },
            {
              title: "Wellness Services",
              text: "Explore yoga, meditation, and health programs.",
              img: featureImages.wellness,
              link: "/wellness",
              btn: "Explore",
            },
            {
              title: "Enrollments",
              text: "Join wellness and healthcare programs easily.",
              img: featureImages.enrollments,
              link: "/enrollments",
              btn: "Enroll",
            },
            {
              title: "Payments",
              text: "Securely manage transactions for services and bookings.",
              img: featureImages.payments,
              link: "/payments",
              btn: "Pay Now",
            },
          ].map((feature, idx) => (
            <Col md={4} key={idx}>
              <Card className="shadow border-0 h-100 text-center hover-card">
                <Card.Img
                  variant="top"
                  src={feature.img}
                  style={{
                    height: "180px",
                    objectFit:
                      idx === 1 || idx === 4 || idx === 5
                        ? "contain"
                        : "cover",
                    borderRadius: "10px",
                    padding: idx === 1 || idx === 4 || idx === 5 ? "20px" : "0",
                  }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold">{feature.title}</Card.Title>
                  <Card.Text>{feature.text}</Card.Text>
                  <Button as={Link} to={feature.link} variant="primary">
                    {feature.btn}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Footer */}
      <footer
        style={{
          background: "linear-gradient(135deg, #2c3e50, #34495e)",
          color: "#ddd",
          padding: "20px",
          marginTop: "50px",
          textAlign: "center",
        }}
      >
        <h5>Life Care Hospital</h5>
        <p>
          Vanasthalipuram, Hyderabad, India <br />
          +91 98764 32109 | info@lifecare.com
        </p>
        <p className="mb-0">© 2025 Life Care Hospital. All rights reserved.</p>
      </footer>

      <style>{`
        .hover-card {
          transition: all 0.3s ease-in-out;
        }
        .hover-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 20px rgba(0,123,255,0.4);
        }
      `}</style>
    </div>
  );
};

export default Welcome;
