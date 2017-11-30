import React from 'react';
import Note from './note';
import shortid from 'shortid';
import pluralize from 'pluralize';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { createSlideToggle } from '../../util/css_util';

class Notes extends React.Component  {
  constructor (props)  {
    super(props);
    // console.log("IN NOTES CONSTRUCTOR");
    // console.log(props);
    const boundSlideToggle = createSlideToggle.bind(this);
    this.renderNotebookEditModal = this.renderNotebookEditModal.bind(this);
    this.noteScrollerToggle = boundSlideToggle('notesScrollerClass', 'notes-scroller').bind(this);
    // console.log('in notes constructor');
  }

  componentDidMount() {
    this.noteScrollerToggle();
  }

  componentWillReceiveProps(newProps) {
   console.log('notes getting new props');
  //  debugger;
    // if ('by_id' in newProps.notes)  {
    //   if ((!newProps.notes.by_id['new']) && (this.props.match.params.noteId !== newProps.match.params.noteId)) {
    //     console.log('notes setting new props');
    //     this.setState(newProps);
    //   }
    // }
  }

  handleDelete(id)  {
    //delete the note, then push
    debugger;
    this.props.destroyNote(id).then((action) =>
      this.props.history.push('/home/notes/' + `${action.notes.ordered.updated_at_desc[0] ? action.notes.ordered.updated_at_desc[0] : ''}`)
    );
  }

  renderHeader()  {
    debugger;
    if (this.props.currentNotebookName) {
      return (
        <div className = 'notes-header-container notebook'>
          <NavLink className='notebook-edit-icon' to={'#'}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABNElEQVR42u1VOw7CMAwtExPnYIE7sHGl9jiwcBBKYWjVdqtUZnY2OgU/yUZRyBcGFixZCrH9HPu5Jsv+8q00TbNt23ZHeu267gHFGXewfQzc9/2SQCoCVD6FD3yTwCloQ8F3BrnR74JAVuM4zqF1Xa9xBxv73BET/XIBp/NhGIaFyxc2+EiSqEqkLQhUSs0M2wmq38FHS3IOEiptsb2cExxtlWjtchNPxj0TV6QOBcXlHLvztQejqECiBeA1OQ7uVpzg6iMYc64wKY5XOhMghu3T7xL4WhRKENWiEMm+BFEkY8RkTMuyXLhINpPAl4DDY8qlyv55+9BsAh/48sdZJa0KBJqVmC8X8OhVYS47Lj3Xlx3O4ElrS/yyMyq5hNY12pK8ri3E73mEJ6j84TChs+wv38gTSLAjRGxKcLsAAAAASUVORK5CYII=" width="24" height="24" />
          </NavLink>
          <div className = 'notes-header notebook'>
            <h2 className = 'notes-header-notebook'>{this.props.currentNotebookName}</h2>
          </div>
        </div>
      );
    }
    else  {
      return(
        <div className = 'notes-header-container'>
          <div className = 'notes-header'>
            <h2 className = 'notes-header-text'>NOTES</h2>
          </div>
        </div>
      );
    }
  }
  renderNoteCards() {
    // debugger;
    return(
      this.props.notes.map((note) => (
        <div key={shortid.generate()} >
          <Button onClick = {() => this.handleDelete(note.id)} />
          <Note match={this.props.match}note={note}/>
        </div>
      ))
    );
  }

  renderNotebookEditModal() {

  }

  render()  {
    console.log('in notes render');
    // console.log(this.props.selected, 'THIS SHOULD BE A BOOL');
    // console.log(this.props);
    if (!this.props.notes)  {
      return null;
    }
    // debugger;
    let noteCount = this.props.notes.length;
    return (
      <div className ={this.state.notesScrollerClass}>
        {this.renderNotebookEditModal()}
        {this.renderHeader()}
        <div className = 'notes-subheader'>
          <p className = 'notes-count'>{noteCount} {pluralize('note', noteCount)}</p>
        </div>
        <div className = 'notes-height-wrapper'>
          <div className = 'notes-background'>
            <div className = 'notes-view'>
              <div className = 'notes-container'>
                <ol>
                  {this.renderNoteCards()}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Notes;
