import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./Topbar.css";

const topbarStyle = {
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 1,
  backgroundColor: "#333",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  display: "flex",
  justifyContent: "space-around",
  backgroundColor: "#555",
  padding: "10px 20px",
  border: "none",
  fontColor: "white"
}

const Topbar = () => (
  <Navbar bg="dark" variant="dark" fixed="top" style={topbarStyle}>
    <Navbar.Brand href="/">My React App</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/createpost">Create Post</Nav.Link>
      <Nav.Link href="/enteraccount">Log in or Register</Nav.Link>
    </Nav>
  </Navbar>
);

export default Topbar;