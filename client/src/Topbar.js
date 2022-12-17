import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./Topbar.css";

// const topbarStyle = {
//   position: "fixed",
//   top: 0,
//   width: "100%",
//   zIndex: 1,
//   backgroundColor: "#333",
//   boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
//   display: "flex",
//   justifyContent: "space-around",
//   backgroundColor: "#555",
//   padding: "10px 20px",
//   border: "none",
//   fontColor: "white"
// }

const Topbar = () => (
  <div class="topbar">
  <Link to="/"><button class="home-button">Home</button></Link>
  <div>
  <Link to="/createpost/"><button class="create-post-button">Create post</button></Link>
  <Link to="/enteraccount/"><button class="login-button">Log in or Register</button></Link>
  </div>
</div>
  
);

export default Topbar;