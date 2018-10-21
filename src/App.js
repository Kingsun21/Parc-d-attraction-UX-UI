import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, } from 'reactstrap';
import { Media } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <Media>
            <Media left href="/">
              <Media object src="/starfpark.png" alt="logo" />
            </Media>
            <Media body>
              <Media heading>
                Starf Park
              </Media>
              Gestion du parc
            </Media>
          </Media>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/attractions/">Attractions</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/batiments/">Bâtiment</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/maintenance/">Maintenance</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/personnel/">Personnel</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/stats/">Statistiques</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default App;
