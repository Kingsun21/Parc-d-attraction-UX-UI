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
      newItem1: "",
      newItem2: "",
      newItem3: "",
      newItem4: "",
      newItem5: "",
      list: []
    };
  }

  updateInput(key, value) {
    this.setState({ [key]: value });

    localStorage.setItem(key, value);
  }

  addItem() {
    const newValue = {
      id: 1 + Math.random(),
      value1: this.state.newItem1.slice(),
      value2: this.state.newItem2.slice(),
      value3: this.state.newItem3.slice(),
      value4: this.state.newItem4.slice(),
      value5: this.state.newItem5.slice()
    };

    // copie de la liste actuelle
    const list = [...this.state.list];

    // ajout du nouvel objet à la liste
    list.push(newValue);

    // update de l'état avec la nouvvelle liste et reset de newItem
    this.setState({
      list,
      newItem1: "",
      newItem2: "",
      newItem3: "",
      newItem4: "",
      newItem5: ""
    });

    // update du cache et convertion en strin JSON pour le cache
    localStorage.setItem("list", JSON.stringify(list));
    localStorage.setItem("newItem1", "");
    localStorage.setItem("newItem2", "");
    localStorage.setItem("newItem3", "");
    localStorage.setItem("newItem4", "");
    localStorage.setItem("newItem5", "");
  }

  deleteItem(id) {
    // copie de la liste actuelle
    const list = [...this.state.list];
    // filtrage de l'id à supprimer
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });

    // update du cache
    localStorage.setItem("list", JSON.stringify(updatedList));
  }

  hydrateStateWithLocalStorage() {
    // pour tout le state
    for (let key in this.state) {
      // si la clé existe en cache
      if (localStorage.hasOwnProperty(key)) {
        // on la récupère
        let value = localStorage.getItem(key);

        // on reconvertie dans l'autre sens et on sauvegarde dans le state
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage();
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


        <div style={{textAlign: "left", maxWidth: "auto", margin: "auto"}}>
          <p>Ajouter un objet</p>
          <div class="form-row">
            <div class="col">
              <input type="text" placeholder="Nom" value={this.state.newItem1}
                onChange={e => this.updateInput("newItem1", e.target.value)}/>
            </div>
            <div class="col">
              <input type="text" placeholder="Prénom" value={this.state.newItem2}
                onChange={e => this.updateInput("newItem2", e.target.value)}/>
            </div>
            <div class="col">
              <input type="text" placeholder="Âge" value={this.state.newItem3}
                onChange={e => this.updateInput("newItem3", e.target.value)}/>
            </div>
            <div class="col">
              <input type="text" placeholder="Fonction" value={this.state.newItem4}
                onChange={e => this.updateInput("newItem4", e.target.value)}/>
            </div>
            <div class="col">
              <input type="text" placeholder="Salaire" value={this.state.newItem5}
                onChange={e => this.updateInput("newItem5", e.target.value)}/>
            </div>
            <div class="col">
              <button class="btn btn-primary" onClick={() => this.addItem()}>
                &#43; Ajouter
              </button>
            </div>
          </div>
          <br/>
          <br/>
          <ul class="list-group">
            {this.state.list.map(item => {
              return (
                <li class="list-group-item" style={{width: "auto"}} key={item.id}>
                  {item.value1}
                  &#160;
                  {item.value2}
                  &#160;
                  {item.value3}
                  &#160;
                  {item.value4}
                  &#160;
                  {item.value5}
                  &#160;
                  <button class="btn btn-danger" onClick={() => this.deleteItem(item.id)}>
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
