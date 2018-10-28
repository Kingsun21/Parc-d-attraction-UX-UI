import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import moment from 'moment';
import localization from "moment/locale/fr";

class Batiments extends Component {

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
      listB: []
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
    const listB = [...this.state.listB];

    // ajout du nouvel objet à la liste
    listB.push(newValue);

    // update de l'état avec la nouvvelle liste et reset de newItem
    this.setState({
      listB,
      newItem1: "",
      newItem2: "",
      newItem3: "",
      newItem4: "",
      newItem5: ""
    });

    // update du cache et convertion en strin JSON pour le cache
    localStorage.setItem("listB", JSON.stringify(listB));
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
    const listB = [...this.state.listB];

    for (var i=0; i < listB.length; i++) {
      if (listB[i].id == this.state.idupdate)
      {
        buffer = i;
      }
    }
    listB[buffer] = newValue;

    this.setState({
      listB,
      newItem1: "",
      newItem2: "",
      newItem3: "",
      newItem4: "",
      newItem5: ""
    });
    localStorage.setItem("listB", JSON.stringify(listB));
    localStorage.setItem("newItem1", "");
    localStorage.setItem("newItem2", "");
    localStorage.setItem("newItem3", "");
    localStorage.setItem("newItem4", "");
    localStorage.setItem("newItem5", "");

    this.toggle2();
  }

  deleteItem(id) {
    // copie de la liste actuelle
    const listB = [...this.state.listB];
    // filtrage de l'id à supprimer
    const updatedList = listB.filter(item => item.id !== id);

    this.setState({ listB: updatedList });

    // update du cache
    localStorage.setItem("listB", JSON.stringify(updatedList));
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

  toggle2() {
    this.setState({
      modal2: !this.state.modal2
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
          <ModalHeader toggle={this.toggle}>Ajouter un bâtiment</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="nomB">Nom du bâtiment</Label>
                <Input type="text" name="nom" id="nomB" placeholder="Nom du bâtiment" value={this.state.newItem1} onChange={e => this.updateInput("newItem1", e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="date">{"Date d'installation"}</Label>
                <Input type="date" name="date" id="date" placeholder="Date" value={this.state.newItem2} onChange={e => this.updateInput("newItem2", e.target.value)}/>
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
    let tableau = this.state.listB.map(item => {
      return (
        <tr>
          <td scope="row">{item.value1}</td>
          <td>{moment(item.value2).locale("fr", localization).format("ll")}</td>
          <td><Button color="primary" onClick={() => this.modif(item.id)}>
            Modifier
          </Button></td>
          <td><button class="btn btn-danger" onClick={() => this.suppr(item.id)}>
            Supprimer
          </button></td>
        </tr>
      );
    });

    return (
      <Table striped>
        <thead>
          <tr>
            <th>Nom du bâtiment</th>
            <th>{"Date d'installation"}</th>
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
        {this.tableau()}
      </div>
    );
  }


  render() {
    return(
      <div>
        {this.formulaire()}
        <div>
      <Modal isOpen={this.state.modal2} toggle={this.toggle2}>
        <ModalHeader toggle={this.toggle2}>Modifier un bâtiment</ModalHeader>
        <ModalBody>
        <Form>
          <FormGroup>
            <Label for="nomB">Nom du bâtiment</Label>
            <Input type="text" name="nom" id="nomB" placeholder="Nom du bâtiment" value={this.state.newItem1} onChange={e => this.updateInput("newItem1", e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="date">{"Date d'installation"}</Label>
            <Input type="date" name="date" id="date" placeholder="Date" value={this.state.newItem2} onChange={e => this.updateInput("newItem2", e.target.value)}/>
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

export default Batiments;
