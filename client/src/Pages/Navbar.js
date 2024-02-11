import React from "react";

const Navbar = (props) => {
  const propValue = props.prop;

  return (
    <nav style={styles.navbar}>
      <div style={styles.navbarBrand}>AgriNet</div>
      <ul style={styles.navbarNav}>
        <li style={styles.navItem}>
          <a style={styles.navLink} href="#">
            Home
          </a>
        </li>
        <li style={styles.navItem}>
          <a style={styles.navLink} href="#">
            About
          </a>
        </li>
        <li style={styles.navItem}>
          <a style={styles.navLink} href="#">
            Contact Us
          </a>
        </li>
        <li>
          <a style={styles.navLink} href="#">
            {propValue}
          </a>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#f8f9fa",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
  },
  navbarBrand: {
    fontWeight: "bold",
    fontSize: "24px",
  },
  navbarNav: {
    display: "flex",
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  navItem: {
    marginLeft: "20px",
  },
  navLink: {
    color: "#333",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default Navbar;
