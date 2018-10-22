import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
#oui je vais un test

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
  DropdownItem,
  TabContent,
  TabPane,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Container,} from 'reactstrap';
import { Media } from 'reactstrap';
import classnames from 'classnames';
import Attractions from './Components/Attractions.js';
import Batiments from './Components/Batiments.js';
import Maintenance from './Components/Maintenance.js';
import Personnel from './Components/Personnel.js';
import Statistiques from './Components/Statistiques.js';
#oui je vais un test

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div>
        <div id="sidebar">
        <Col>
          <Row sm="3">
            <Media>
              <Media left href="/">
                <Media object src="/starfpark.png" alt="logo" />
              </Media>
            </Media>
          </Row>
          <Row sm="3" id="titre">
            <h1>Starf Park</h1>
            <h2><br/>Logiciel de gestion</h2>
          </Row>
        </Col>
        </div>
          <div id="corps">
            <Nav tabs id="tabs">
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Attractions
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Bâtiments
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
                  Maintenance
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '4' })}
                  onClick={() => { this.toggle('4'); }}
                >
                  Personnel
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '5' })}
                  onClick={() => { this.toggle('5'); }}
                >
                  Statistiques
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <h4>Tab 1 Contents</h4>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Batiments buttonLabel="Ajouter un bâtiment" classname=""/>
            </TabPane>
          </TabContent>
        </div>
      </div>
    );
  }
}

export default App;
