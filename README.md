# HealthCare-and-wellness-Management-System


This project is a Capstone Project for Wipro Training, designed to provide a seamless Health Care and Wellness Service platform for patients, doctors, and administrators.

#Project Overview

The system provides:

Patient registration, authentication, and profile management
Appointment booking and tracking
Doctor management and availability
Secure authentication using JWT tokens
Full integration between Backend (Spring Boot) and Frontend (React.js)

#Technology Stack

Frontend: React.js, Bootstrap, Axios, React Router (developed in VS Code)
Backend: Spring Boot (Java 17, developed in Eclipse IDE), Spring Data JPA, REST APIs
Database: MySQL (H2 used for testing)
API Testing: Postman/Swagger (for CRUD operations)
Security: Spring Security with JWT Authentication
Build Tool: Maven


#Execution Flow
##User Authentication:

Patients and doctors log in using their credentials.
A JWT token is generated after successful login.
All future API requests use this token for secure access.

##Data Flow & Connections:

Frontend communicates with Backend using REST APIs.
Backend interacts with MySQL to store and retrieve data.
JWT token ensures only authorized users can access sensitive data.
##Appointment & Health Records:

Patients can book appointments with available doctors.
Doctors can manage appointments.
Health records are linked to patient profiles securely.

 #Backend (Spring Boot in Eclipse)
