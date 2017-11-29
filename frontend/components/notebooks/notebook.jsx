import React from 'react';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import pluralize from 'pluralize';

class Notebook extends React.Component  {
  constructor (props)  {
    super(props);
    console.log(this.props);
  }

  render()  {
    const { notebook, noteCount } = this.props;
    console.log(noteCount, '(*$@)($*#@)($*@)#(*');
    return (
      <NavLink to={`/home/notebooks/${notebook.id}`}>
        <div> {notebook.title} </div>
        <div className = 'no-select'> {noteCount} {pluralize('note', noteCount)} </div>
      </NavLink>
    );
  }
}

export default Notebook;
// {/* <div> {notebook.notecount} </div> */}
