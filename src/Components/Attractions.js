import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import moment from 'moment';
import localization from "moment/locale/fr";

class Attractions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modal2: false,
      modalSuppr : false,
      idupdate: "",
      id: ""
    };
    this.state = {
      newItem1: "",
      newItem2: "",
      newItem3: "",
      newItem4: "",
      newItem5: "",
      listA: []
    };

    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
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
    const listA = [...this.state.listA];

    // ajout du nouvel objet à la liste
    listA.push(newValue);

    // update de l'état avec la nouvvelle liste et reset de newItem
    this.setState({
      listA,
      newItem1: "",
      newItem2: "",
      newItem3: "",
      newItem4: "",
      newItem5: ""
    });

    // update du cache et convertion en strin JSON pour le cache
    localStorage.setItem("listA", JSON.stringify(listA));
    localStorage.setItem("newItem1", "");
    localStorage.setItem("newItem2", "");
    localStorage.setItem("newItem3", "");
    localStorage.setItem("newItem4", "");
    localStorage.setItem("newItem5", "");

    this.toggle();
  }

  updateItem() {
    var buffer = 0;
    const newValue = {
      id: this.state.idupdate,
      value1: this.state.newItem1.slice(),
      value2: this.state.newItem2.slice(),
      value3: this.state.newItem3.slice(),
      value4: this.state.newItem4.slice(),
      value5: this.state.newItem5.slice()
    };
    const listA = [...this.state.listA];

    for (var i=0; i < listA.length; i++) {
      if (listA[i].id == this.state.idupdate)
      {
        buffer = i;
      }
    }
    listA[buffer] = newValue;

    this.setState({
      listA,
      newItem1: "",
      newItem2: "",
      newItem3: "",
      newItem4: "",
      newItem5: ""
    });
    localStorage.setItem("listA", JSON.stringify(listA));
    localStorage.setItem("newItem1", "");
    localStorage.setItem("newItem2", "");
    localStorage.setItem("newItem3", "");
    localStorage.setItem("newItem4", "");
    localStorage.setItem("newItem5", "");

    this.toggle2();
  }

  deleteItem(id) {
    // copie de la liste actuelle
    const listA = [...this.state.listA];
    // filtrage de l'id à supprimer
    const updatedList = listA.filter(item => item.id !== id);

    this.setState({ listA: updatedList });

    // update du cache
    localStorage.setItem("listA", JSON.stringify(updatedList));
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

  toggle2() {
    this.setState({
      modal2: !this.state.modal2
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
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Ajouter une attraction</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="nomB">{"Nom de l'attraction"}</Label>
                <Input type="text" name="nom" id="nomB" placeholder="Nom de l'attraction" value={this.state.newItem1} onChange={e => this.updateInput("newItem1", e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="date">{"Date d'installation"}</Label>
                <Input type="date" name="date" id="date" placeholder="Date" value={this.state.newItem2} onChange={e => this.updateInput("newItem2", e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <Label for="prix">{"Prix de l'entrée (€)"}</Label>
                <Input type="number" name="prix" id="prix" placeholder="Prix d'entrée" value={this.state.newItem3} onChange={e => this.updateInput("newItem3", e.target.value)}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => this.addItem()}>Ajouter</Button>{' '}
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

modif(id){
    this.toggle2();
    this.setState({
      idupdate: id
    });
}

tableau() {
    let tableau = this.state.listA.map(item => {
      return (
        <tr>
          <td scope="row">{item.value1}</td>
          <td>{moment(item.value2).locale("fr", localization).format("ll")}</td>
          <td>{item.value3}€</td>
          <td><Button color="primary" onClick={() => this.modif(item.id)}>
            Modifier
          </Button></td>
          <td><Button color="danger" onClick={() => this.suppr(item.id)}>
            Supprimer
          </Button></td>
        </tr>
      );
    });

    return (
      <Table striped>
        <thead>
          <tr>
            <th>{"Nom de l'attraction"}</th>
            <th>{"Date d'installation"}</th>
            <th>{"Prix de l'entrée"}</th>
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
        <div>
          <Modal isOpen={this.state.modalSuppr} toggle={this.toggleSuppr}>
            <ModalBody>
              <p>Voulez-vous supprimer cet élément ?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={() => this.deleteItem(this.state.id)}>Supprimer</Button>{' '}
              <Button color="secondary" onClick={this.toggleSuppr}>Annuler</Button>
            </ModalFooter>
          </Modal>
        </div>
        {this.tableau()}
      </div>
    );
  };

  render() {
    return(
      <div>
        {this.formulaire()}
        <div>
      <Modal isOpen={this.state.modal2} toggle={this.toggle2}>
        <ModalHeader toggle={this.toggle2}>Modifier une attraction</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="nomB">{"Nom de l'attraction"}</Label>
              <Input type="text" name="nom" id="nomB" placeholder="Nom de l'attraction" value={this.state.newItem1} onChange={e => this.updateInput("newItem1", e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="date">{"Date d'installation"}</Label>
              <Input type="date" name="date" id="date" placeholder="Date" value={this.state.newItem2} onChange={e => this.updateInput("newItem2", e.target.value)}/>
            </FormGroup>
            <FormGroup>
              <Label for="prix">{"Prix de l'entrée (€)"}</Label>
              <Input type="number" name="prix" id="prix" placeholder="Prix d'entrée" value={this.state.newItem3} onChange={e => this.updateInput("newItem3", e.target.value)}/>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.updateItem()}>Modifier</Button>{' '}
          <Button color="secondary" onClick={this.toggle2}>Annuler</Button>
        </ModalFooter>
      </Modal>
        {this.tableau()}
        </div>
      </div>
    );
  }

}

export default Attractions;
