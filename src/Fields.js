import React from 'react';
import './Fields.css'

const MENU = [
  "Financing", "IT", "Food", "Medical",
  "Nature", "Country", "Exercise", "Expert",
  "Monsters"
]

const RadioMenu = (props) => {
  return (
    <div className="Menu">
      <input type="radio" id={props.field} name="Fields"
        onClick={() => props.changeMenu(props.field)} />
      <label htmlFor={props.field}>{props.field}</label>
    </div>
  );
}

class Fields extends React.Component {
  createList(list) {
    const listElement = [];
    for (let i = 0; i < list.length; i++) {
      listElement.push(
        <RadioMenu
          field={MENU[i]}
          changeMenu={this.props.changeMenu}
        />
      );
    }
    return (
      <div>
        {listElement}
      </div>
    );
  }

  render() {
    return (
      <div className="listFieldsMenu">
        <p className="Fields">Fields Menu</p>
        {this.createList(MENU)}
      </div>
    );
  }
}

export default Fields;
