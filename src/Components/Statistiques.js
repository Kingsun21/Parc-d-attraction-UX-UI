import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import { Line } from "react-chartjs-2";
class Statistiques extends Component {

  constructor(props) {
    super(props);
  }


  render() {
    let lineOrBarData = {
      labels: ["Jan.", "Fév.", "Mars", "Avr.", "Mai", "Juin", "Jui.", "Août", "Sep.", "Nov.", "Dec."],
      datasets: [
        {
          data: [24, 25, 27, 25, 32, 36, 47, 43, 29, 26, 23, 33],
          backgroundColor: 'rgba(0,123,255,0.2)',
          label: "Visiteurs(k)/mois"
        }
      ]
    };
    return(
      <div>
        <h1>Nombres de visiteurs par mois (en milliers)</h1>
        <br/>
        <Line data={lineOrBarData} id="graph"/>
      </div>
    );
  }

}

export default Statistiques;
