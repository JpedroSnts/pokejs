import React from "react";

const styles = {
  color: "#fff",
  width: "40px",
  height: "40px",
  textAlign: "center",
  lineHeight: "40px",
  fontSize: "25px",
  backgroundColor: "#10428d",
  position: "fixed",
  bottom: "0",
  right: "0",
  cursor: "pointer",
};

function NavToTop() {
  return (
    <div style={styles}>
      <i
        className="fas fa-arrow-up"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      ></i>
    </div>
  );
}

export default NavToTop;