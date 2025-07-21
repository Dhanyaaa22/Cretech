import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const navItems = [
    { icon: 'fa-home', active: false },
    { icon: 'fa-layer-group', active: false },
    { icon: 'fa-heart', active: false },
    { icon: 'fa-heart', active: false },
    { icon: 'fa-plus-circle', active: false },
    { icon: 'fa-cog', active: false },
    { icon: 'fa-info-circle', active: false }
  ];

  return (
    <nav className="sidebar">
      {navItems.map((item, index) => (
        <div 
          key={index} 
          className={`nav-item ${item.active ? 'active' : ''}`}
        >
          <i className={`fas ${item.icon}`}></i>
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;