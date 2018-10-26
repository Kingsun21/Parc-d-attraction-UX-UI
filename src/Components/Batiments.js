import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Table } from 'reactstrap';

class Batiments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.state = {
      newItem: "",
      list: []
    };

    this.toggle = this.toggle.bind(this);
  }

  updateInput(key, value) {
    this.setState({ [key]: value });

    localStorage.setItem(key, value);
  }

  addItem() {
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice()
    };

    // copie de la liste actuelle
    const list = [...this.state.list];

    // ajout du nouvel objet à la liste
    list.push(newItem);

    // update de l'état avec la nouvvelle liste et reset de newItem
    this.setState({
      list,
      newItem: ""
    });

    // update du cache et convertion en strin JSON pour le cache
    localStorage.setItem("list", JSON.stringify(list));
    localStorage.setItem("newItem", "");
    this.toggle();
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

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  formulaire() {
    return(
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="nomB">Nom du bâtiment</Label>
                <Input type="text" name="nom" id="nomB" placeholder="Nom du bâtiment" value={this.state.newItem} onChange={e => this.updateInput("newItem", e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="date">{"Date d'installation"}</Label>
                <Input type="date" name="date" id="date" placeholder="Date" />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.addItem()} disabled={!this.state.newItem.length}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

tableau() {
  return(
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>{"Date d'installation"}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
          </tr>
        </tbody>
      </Table>
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


  render() {
    return(
      <div>
        {this.formulaire()}
        {this.tableau()}
      </div>
    );
  }

}

export default Batiments;
