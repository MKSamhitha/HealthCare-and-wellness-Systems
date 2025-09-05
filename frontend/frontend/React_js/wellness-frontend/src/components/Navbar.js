import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

const NavBar = () => {
  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? "fw-semibold text-primary bg-white rounded px-3 py-2 shadow-sm"
      : "text-dark px-3 py-2";

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="shadow-sm"
      style={{
        background: "linear-gradient(90deg, #f0f4f8, #e8f0f5)", // soft hospital tone
        backdropFilter: "blur(8px)",
      }}
    >
      <Container>
        {/* Brand Name */}
        <Navbar.Brand
          as={NavLink}
          to="/"
          end
          className="me-5 fw-bold fs-4 text-primary text-decoration-none"
          style={{ letterSpacing: "1px" }}
        >
          LifeCare Hospitals
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav>
            <Nav.Link as={NavLink} to="/patients" end className={getNavLinkClass}>
              Patients
            </Nav.Link>

            <Nav.Link as={NavLink} to="/providers" end className={getNavLinkClass}>
              Providers
            </Nav.Link>

            <Nav.Link as={NavLink} to="/appointments" className={getNavLinkClass}>
              Appointments
            </Nav.Link>

            <NavDropdown title="Services & Enrollments" id="services-enrollments-dropdown">
              <NavDropdown.Item as={NavLink} to="/wellness">
                Wellness Services
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/enrollments">
                Enrollments
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/payments" className={getNavLinkClass}>
              Payments
            </Nav.Link>
          </Nav>

          {/* Right-side links */}
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/login" className={getNavLinkClass}>
              Login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/register" className={getNavLinkClass}>
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
