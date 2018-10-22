import React, {Component} from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';

class VerticalNavbar extends Component {

  displayNavbar() {
      let navbar = this.props.tabs.map((item, index) => {
        return(
          <NavItem key = { index }>
            <NavLink href="#" onClick={() => this.props.toggle(parseInt(index)+1)} >{item}</NavLink>
          </NavItem>
        );
      });
      return(<Nav pills vertical className="VerticalNavbar">{navbar}</Nav>) ;
  }

  render() {
    return (
      <div>
        {this.displayNavbar()}
      </div>
    )
  }
}

export default VerticalNavbar;
