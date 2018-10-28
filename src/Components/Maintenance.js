import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Table, Jumbotron, Container } from 'reactstrap';
import moment from 'moment';
import localization from "moment/locale/fr";

class Maintenance extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalSuppr : false,
      id: ""
    };
    this.state = {
      newItem1: "",
      newItem2: "",
      newItem3: "",
      newItem4: "",
      newItem5: "",
      listM: []
    };

    this.toggle = this.toggle.bind(this);
    this.toggleSuppr = this.toggleSuppr.bind(this);
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
    const listM = [...this.state.listM];

    // ajout du nouvel objet à la liste
    listM.push(newValue);

    // update de l'état avec la nouvvelle liste et reset de newItem
    this.setState({
      listM,
      newItem1: "",
      newItem2: "",
      newItem3: "",
      newItem4: "",
      newItem5: ""
    });

    // update du cache et convertion en strin JSON pour le cache
    localStorage.setItem("listM", JSON.stringify(listM));
    localStorage.setItem("newItem1", "");
    localStorage.setItem("newItem2", "");
    localStorage.setItem("newItem3", "");
    localStorage.setItem("newItem4", "");
    localStorage.setItem("newItem5", "");

    this.toggle();
  }

  deleteItem(id) {
    // copie de la liste actuelle
    const listM = [...this.state.listM];
    // filtrage de l'id à supprimer
    const updatedList = listM.filter(item => item.id !== id);

    this.setState({ listM: updatedList });

    // update du cache
    localStorage.setItem("listM", JSON.stringify(updatedList));
    this.toggleSuppr();
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

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleSuppr() {
    this.setState({
      modalSuppr: !this.state.modalSuppr
    });
  }

  formulaire() {
    return(
      <div>
        <br/>
        <Button color="success" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <br/>
        <br/>
        <br/>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Ajouter une maintenance</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="date">Date de la maintenance</Label>
                <Input type="date" name="date" id="date" placeholder="Date" value={this.state.newItem1} onChange={e => this.updateInput("newItem1", e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="batiment">Bâtiment en maintenance</Label>
                <Input type="text" name="batiment" id="batiment" placeholder="Bâtiment en maintenance" value={this.state.newItem2} onChange={e => this.updateInput("newItem2", e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="tech">Technicien associé</Label>
                <Input type="text" name="tech" id="tech" placeholder="Technicien associé" value={this.state.newItem3} onChange={e => this.updateInput("newItem3", e.target.value)}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.addItem()}>Ajouter</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Annuler</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  suppr(id){
    this.toggleSuppr();
    this.setState({
      id: id
    });
  }

tableau() {
    let tableau = this.state.listM.map(item => {
      return (
        <tr>
          <td scope="row">{moment(item.value1).locale("fr", localization).format("ll")}</td>
          <td>{item.value2}</td>
          <td>{item.value3}</td>
          <td><Button color="primary" onClick={() => this.suppr(item.id)}>
            Supprimer
          </Button></td>
        </tr>
      );
    });

    return (
      <Table striped>
        <thead>
          <tr>
            <th>Date de la maintenance</th>
            <th>Bâtiment maintenu</th>
            <th>Technicien associé</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableau}
        </tbody>
      </Table>
    );
}

dernierDate() {
  let list = localStorage.getItem("listM");
    try {
      list = JSON.parse(list);
    } catch (e) {
    }
  try{
    return(<div id="oui">{moment(list[list.length-1].value1).format("ll")}</div>);
  } catch(e){

  }
}

avantDernierDate() {
  let list = localStorage.getItem("listM");
    try {
      list = JSON.parse(list);
    } catch (e) {
    }
  try{
    return(<div id="oui">{moment(list[list.length-2].value1).format("ll")}</div>);
  } catch(e){

  }
}

dernierTech() {
  let list = localStorage.getItem("listM");
    try {
      list = JSON.parse(list);
    } catch (e) {
    }
  try{
    return(<div id="oui">{list[list.length-1].value3}</div>);
  } catch(e){

  }
}

dernierBat() {
  let list = localStorage.getItem("listM");
    try {
      list = JSON.parse(list);
    } catch (e) {
    }
  try{
    return(<div id="oui">{list[list.length-1].value2}</div>);
  } catch(e){

  }
}

jumbotron(){
  return (
      <div>
        <Jumbotron fluid>
          <Container fluid>
            <h1 className="display-6">Date de la prochaine maintenance : {this.dernierDate()}</h1>
            <p className="lead">Bâtiment maintenu : {this.dernierBat()}Technicien associé : {this.dernierTech()}Dernière maintenance : {this.avantDernierDate()}</p>
          </Container>
        </Jumbotron>
      </div>
  );
}


  render() {
    return(
      <div>
        {this.formulaire()}
        <div>
          <Modal isOpen={this.state.modalSuppr} toggle={this.toggleSuppr} className={this.props.className}>
            <ModalBody>
              <p>Voulez-vous supprimer cet élément ?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={() => this.deleteItem(this.state.id)}>Supprimer</Button>{' '}
              <Button color="secondary" onClick={this.toggleSuppr}>Annuler</Button>
            </ModalFooter>
          </Modal>
        </div>
        {this.jumbotron()}
        <br/>
        <h2>Historique des maintenances :</h2>
        <br />
        {this.tableau()}
      </div>
    );
  }

}

export default Maintenance;
