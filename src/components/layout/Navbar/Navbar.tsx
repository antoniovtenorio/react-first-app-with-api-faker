import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../../imagens/logotipo/logotipo.png"
const Navbar = () => {
    return (
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="/">
       <img src={logo} width="112" height="28" />
    </a>

    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
      <a href="/" className="navbar-item">
        Home
      </a>

      <a href="/documentation" className="navbar-item">
        Documentação
      </a>

      <div className="navbar-item has-dropdown is-hoverable">
      <Link to="/clientes" className="navbar-link">Clientes</Link>

        <div className="navbar-dropdown">
          <Link to="/dashboard" className="navbar-item">Dashboard</Link>
          
          <hr className="navbar-divider" />
          <Link to="/" className="navbar-item">Observação</Link>
        </div>
      </div>
    </div>

    {/* <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <a className="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a className="button is-light">
            Log in
          </a>
        </div>
      </div>
    </div> */}
  </div>
</nav>
    )
}

export default Navbar
