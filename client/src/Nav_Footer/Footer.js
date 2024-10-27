import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>© 2024 El Gouna Sailing Club. All rights reserved.</p>
        <div style={styles.links}>
          <a href="#!" style={styles.link}>Privacy Policy</a>
          <a href="#!" style={styles.link}>Terms of Service</a>
          <a href="#!" style={styles.link}>Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#021526",
    color: "#fff",
    padding: "20px 0",
    textAlign: "center",
    marginTop: "auto",  // Ensure the footer is pushed to the bottom of the content
    bottom: "0"
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "0 20px",
  },
  text: {
    margin: "0 0 10px",
  },
  links: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
  },
};

export default Footer;
