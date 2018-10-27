import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Table, Jumbotron, Container } from 'reactstrap';

class Maintenance extends Component {

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
      listM: []
    };

    this.toggle = this.toggle.bind(this);
    this.truc = this.truc.bind(this);
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
          <ModalHeader toggle={this.toggle}>Ajouter une attraction</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="nomB">Nom de l'attraction</Label>
                <Input type="text" name="nom" id="nomB" placeholder="Nom de l'attraction" value={this.state.newItem1} onChange={e => this.updateInput("newItem1", e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="date">Date d'installation</Label>
                <Input type="date" name="date" id="date" placeholder="Date" value={this.state.newItem2} onChange={e => this.updateInput("newItem2", e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="prix">Prix de l'entrée (€)</Label>
                <Input type="number" name="prix" id="prix" placeholder="Prix d'entrée" value={this.state.newItem3} onChange={e => this.updateInput("newItem3", e.target.value)}/>
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
    let tableau = this.state.listM.map(item => {
      return (
        <tr>
          <td scope="row">{item.value1}</td>
          <td>{item.value2}</td>
          <td>{item.value3}€</td>
          <td><Button color="primary" onClick={() => this.deleteItem(item.id)}>
            Supprimer
          </Button></td>
        </tr>
      );
    });

    return (
      <Table striped>
        <thead>
          <tr>
            <th>Nom de l'attraction</th>
            <th>Date d'installation</th>
            <th>Prix de l'entrée</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableau}
        </tbody>
      </Table>
    );
}

truc() {
  let list = localStorage.getItem("listM");
    try {
      list = JSON.parse(list);
    } catch (e) {
    }
  if(list != null){
    return (
        <div>
          <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">{list[list.length-1].value1}</h1>
              <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
            </Container>
          </Jumbotron>
        </div>
    );
  }

}


  render() {
    return(
      <div>
        {this.formulaire()}
        {this.truc()}
        {this.tableau()}
      </div>
    );
  }

}

export default Maintenance;
