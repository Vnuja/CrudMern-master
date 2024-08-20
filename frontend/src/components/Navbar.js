import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-dark shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold text-success" href="/" style={{ marginTop: '10px', marginLeft: '15px' }}>
            Crystal Elegance Manage System
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
  
        </div>
      </nav>
    );
  }
}
