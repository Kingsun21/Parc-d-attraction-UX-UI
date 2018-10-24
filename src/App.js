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

class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
    this.state = {
      newItem: "",
      list: []
    };
  }

  updateInput(key, value) {
      this.setState({ [key]: value });
    }

    addItem() {
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };

    // copy current list of items
   const list = [...this.state.list];

   // add the new item to the list
   list.push(newItem);

   // update state with new list, reset the new item input
   this.setState({
     list,
     newItem: ""
   });
 }

 deleteItem(id) {
   // copy current list of items
   const list = [...this.state.list];
   // filter out the item being deleted
   const updatedList = list.filter(item => item.id !== id);

   this.setState({ list: updatedList });
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


        <div style={{padding: 50, textAlign: "left", maxWidth: 500, margin: "auto"}}>
          <p>Ajouter un objet</p>
          <input type="text" placeholder="Écrire un objet" value={this.state.newItem}
            onChange={e => this.updateInput("newItem", e.target.value)}/>
          <button onClick={() => this.addItem()} disabled={!this.state.newItem.length}>
            &#43; Ajouter
          </button>
          <ul>
            {this.state.list.map(item => {
              return (
                <li key={item.id}>
                  {item.value}
                  <button onClick={() => this.deleteItem(item.id)}>
                    Supprimer
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

      </div>


    );
  }
}

export default App;
