// src/layout/Layout.jsx
import React from "react";
import "./Layout.css"; // หรือใช้ Tailwind ก็ได้

const Layout = ({ children }) => {
  return (
    <div className="page-wrapper">
      {children}
    </div>
  );
};

export default Layout;
