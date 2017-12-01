import React from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import pluralize from 'pluralize';

class Notebook extends React.Component  {
  constructor (props)  {
    super(props);
   

  }

  render()  {
    const { notebook, noteCount } = this.props;
    return (
      <div onClick={() => this.props.toggle(true)}>
        <NavLink to={`/home/notebooks/${notebook.id}`} >
          <div className = 'notebookCardTitle no-select'> {notebook.title} </div>
          <div className = 'notebookCardNoteCount no-select'> {noteCount} {pluralize('note', noteCount)} </div>
        </NavLink>
      </div>
    );
  }
}

export default Notebook;

