import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Table } from 'reactstrap';

class Personnel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.state = {
      newItem1: "",
      newItem2: "",
      newItem3: "",
      newItem4: "",
      newItem5: "",
      listP: []
    };

    this.toggle = this.toggle.bind(this);
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
    const listP = [...this.state.listP];

    // ajout du nouvel objet à la liste
    listP.push(newValue);

    // update de l'état avec la nouvvelle liste et reset de newItem
    this.setState({
      listP,
      newItem1: "",
      newItem2: "",
      newItem3: "",
      newItem4: "",
      newItem5: ""
    });

    // update du cache et convertion en strin JSON pour le cache
    localStorage.setItem("listP", JSON.stringify(listP));
    localStorage.setItem("newItem1", "");
    localStorage.setItem("newItem2", "");
    localStorage.setItem("newItem3", "");
    localStorage.setItem("newItem4", "");
    localStorage.setItem("newItem5", "");

    this.toggle();
  }

  deleteItem(id) {
    // copie de la liste actuelle
    const listP = [...this.state.listP];
    // filtrage de l'id à supprimer
    const updatedList = listP.filter(item => item.id !== id);

    this.setState({ listP: updatedList });

    // update du cache
    localStorage.setItem("listP", JSON.stringify(updatedList));
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

  formulaire() {
    return(
      <div>
        <br/>
        <Button color="success" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <br/>
        <br/>
        <br/>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Ajouter un Employé</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="nomP">Nom de l'employé</Label>
                <Input type="text" name="nom" id="nomB" placeholder="Nom" value={this.state.newItem1} onChange={e => this.updateInput("newItem1", e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="prenomP">{"Prénom de l'employé"}</Label>
                <Input type="text" name="prenom" id="prenomP" placeholder="Prénom" value={this.state.newItem2} onChange={e => this.updateInput("newItem2", e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="ageP">{"Âge de l'employé"}</Label>
                <Input type="number" name="age" id="ageP" placeholder="Âge" value={this.state.newItem3} onChange={e => this.updateInput("newItem3", e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="fonctionP">{"Fonction de l'employé"}</Label>
                <Input type="text" name="fonction" id="fonctionP" placeholder="Fonction" value={this.state.newItem4} onChange={e => this.updateInput("newItem4", e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="salaireP">{"Salaire de l'employé"}</Label>
                <Input type="number" name="date" id="date" placeholder="Salaire" value={this.state.newItem5} onChange={e => this.updateInput("newItem5", e.target.value)}/>
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

tableau() {
    let tableau = this.state.listP.map(item => {
      return (
        <tr>
          <td scope="row">{item.value1}</td>
          <td>{item.value2}</td>
          <td>{item.value3}</td>
          <td>{item.value4}</td>
          <td>{item.value5}€</td>
          <td><button class="btn btn-danger" onClick={() => this.deleteItem(item.id)}>
            Supprimer
          </button></td>
        </tr>
      );
    });

    return (
      <Table striped>
        <thead>
          <tr>
            <th>Nom de l'employé</th>
            <th>Prénom de l'employé</th>
            <th>Âge de l'employé</th>
            <th>Fonction de l'employé</th>
            <th>Salaire de l'employé</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableau}
        </tbody>
      </Table>
    );
}


  render() {
    return(
      <div>
        {this.formulaire()}
        {this.tableau()}
      </div>
    );
  }

}

export default Personnel;
