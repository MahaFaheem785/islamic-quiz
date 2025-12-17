import { useState } from "react";
import "../App.css";

export default function Navbar({ title, menuItems, onMenuClick }) {
  const [active, setActive] = useState(menuItems[0] || "");
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-logo"><span>{title}</span></div>
      <div className="hamburger" onClick={() => setOpen(!open)}>☰</div>
      <ul className={`nav-links ${open ? "open" : ""}`}>
        {menuItems.map((item) => (
          <li key={item} className={active === item ? "active" : ""} onClick={() => { setActive(item); setOpen(false); if(onMenuClick) onMenuClick(item); }}>
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}
