import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <i className="fas fa-cube"></i>
          <span>NetApp</span>
          <span className="blue-text">BlueXP</span>
        </div>
      </div>
      
      <div className="header-center">
        <div className="search-container">
          <i className="fas fa-search"></i>
          <input 
            type="text" 
            placeholder="BlueXP Search" 
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-right">
        <div className="dropdown">
          <button className="dropdown-btn">
            <span>Organization</span>
            <span className="org-name">KeystoneTestQA</span>
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>
        
        <div className="dropdown">
          <button className="dropdown-btn">
            <span>Project</span>
            <span className="project-name">TestQA</span>
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>
        
        <div className="dropdown">
          <button className="dropdown-btn">
            <span>Connector</span>
            <span className="connector-name">N/A</span>
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>
        
        <div className="header-icons">
          <button className="icon-btn">
            <i className="fas fa-bell"></i>
            <span className="notification-badge">10</span>
          </button>
          <button className="icon-btn">
            <i className="fas fa-cog"></i>
          </button>
          <button className="icon-btn">
            <i className="fas fa-question-circle"></i>
          </button>
          <button className="icon-btn">
            <i className="fas fa-user-circle"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;