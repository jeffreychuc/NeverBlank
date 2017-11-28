import React from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class Notebook extends React.Component  {
  constructor (props)  {
    super(props);
    console.log(this.props);
  }

  render()  {
    const { notebook } = this.props;
    return (
      <NavLink to={`/home/notebooks/${notebook.id}`}>
        <div> {notebook.title} </div>
      </NavLink>
    );
  }
}

export default Notebook;
