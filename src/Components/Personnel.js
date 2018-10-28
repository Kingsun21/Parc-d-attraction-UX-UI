import React, {Component} from 'react';
import { Card, CardImg, CardText, CardColumns, CardDeck, CardBody, CardTitle, CardSubtitle, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Table } from 'reactstrap';

class Personnel extends Component {

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
      listP: []
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
    const listP = [...this.state.listP];

    for (var i=0; i < listP.length; i++) {
      if (listP[i].id == this.state.idupdate)
      {
        buffer = i;
      }
    }
    listP[buffer] = newValue;

    this.setState({
      listP,
      newItem1: "",
      newItem2: "",
      newItem3: "",
      newItem4: "",
      newItem5: ""
    });
    localStorage.setItem("listP", JSON.stringify(listP));
    localStorage.setItem("newItem1", "");
    localStorage.setItem("newItem2", "");
    localStorage.setItem("newItem3", "");
    localStorage.setItem("newItem4", "");
    localStorage.setItem("newItem5", "");

    this.toggle2();
  }

  deleteItem(id) {
    // copie de la liste actuelle
    const listP = [...this.state.listP];
    // filtrage de l'id à supprimer
    const updatedList = listP.filter(item => item.id !== id);

    this.setState({ listP: updatedList });

    // update du cache
    localStorage.setItem("listP", JSON.stringify(updatedList));
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
          <ModalHeader toggle={this.toggle}>Ajouter un Employé</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="nomP">{"Nom de l'employé"}</Label>
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
                <Label for="salaireP">{"Salaire de l'employé (k€)"}</Label>
                <Input type="number" name="date" id="date" placeholder="Salaire" value={this.state.newItem5} onChange={e => this.updateInput("newItem5", e.target.value)}/>
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
    let tableau = this.state.listP.map(item => {
      return (
            <Card style={{width: "90%", padding: "0 20px"}}>
              <CardImg top src="data:image/jpeg;base64,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" alt="Card image cap" />
              <CardBody>
                <CardTitle>{item.value1} {item.value2}</CardTitle>
                <CardSubtitle>{item.value4} ({item.value5}k€/mois)</CardSubtitle>
                <CardText>{item.value2} {item.value1} a {item.value3} ans.</CardText>
                <label for="importerImage">Importer une image</label>
                <input type="file" class="form-control-file" id="importerImage1" />
                <br/>

                <button class="btn btn-primary" onClick={() => this.modif(item.id)}>
                  Modifier
                </button>
                &#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;
                <button class="btn btn-danger" onClick={() => this.suppr(item.id)}>
                  Supprimer
                </button>
              </CardBody>
            </Card>
      );
    });

    return (
      <CardColumns>{tableau}</CardColumns>
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
            <Label for="nomP">{"Nom de l'employé"}</Label>
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
            <Label for="salaireP">{"Salaire de l'employé (k€)"}</Label>
            <Input type="number" name="date" id="date" placeholder="Salaire" value={this.state.newItem5} onChange={e => this.updateInput("newItem5", e.target.value)}/>
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

export default Personnel;
