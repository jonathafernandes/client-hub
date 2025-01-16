import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

    return (
      <footer className="w-full bg-card p-6 text-center border rounded-sm">
        <p className="text-gray-400 text-xs opacity-75">© {currentYear} Copyright ClientHub</p>
      </footer>
    );
  };
  
  export default Footer;
