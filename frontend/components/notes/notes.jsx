import React from 'react';
import Note from './note';
import shortid from 'shortid';
import pluralize from 'pluralize';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { createSlideToggle } from '../../util/css_util';
import merge from 'lodash/merge';

class Notes extends React.Component  {
  constructor (props)  {
    super(props);
    // console.log("IN NOTES CONSTRUCTOR");
    // console.log(props);
    const boundSlideToggle = createSlideToggle.bind(this);
    this.noteScrollerToggle = boundSlideToggle('notesScrollerClass', 'notes-scroller').bind(this);
    this.renderNotebookEditModal = this.renderNotebookEditModal.bind(this);
    this.renderNotebookEditModal = this.renderNotebookEditModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNotebookDelete = this.handleNotebookDelete.bind(this);
    this.showNotebookDeleteModal = this.showNotebookDeleteModal.bind(this);
    this.hideNotebookDeleteModal = this.hideNotebookDeleteModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    // console.log('in notes constructor');
  }

  componentDidMount() {
    this.noteScrollerToggle();
    this.setState({notebookEditModal: false, notebookDeleteModal: false});
  }

  handleDelete(id)  {
    //delete the note, then push
    //
    this.props.destroyNote(id).then((action) =>
      this.props.history.push('/home/notes/' + `${action.notes.ordered.updated_at_desc[0] ? action.notes.ordered.updated_at_desc[0] : ''}`)
    );
  }

  renderHeader()  {
    //lol
    const _infoIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABNElEQVR42u1VOw7CMAwtExPnYIE7sHGl9jiwcBBKYWjVdqtUZnY2OgU/yUZRyBcGFixZCrH9HPu5Jsv+8q00TbNt23ZHeu267gHFGXewfQzc9/2SQCoCVD6FD3yTwCloQ8F3BrnR74JAVuM4zqF1Xa9xBxv73BET/XIBp/NhGIaFyxc2+EiSqEqkLQhUSs0M2wmq38FHS3IOEiptsb2cExxtlWjtchNPxj0TV6QOBcXlHLvztQejqECiBeA1OQ7uVpzg6iMYc64wKY5XOhMghu3T7xL4WhRKENWiEMm+BFEkY8RkTMuyXLhINpPAl4DDY8qlyv55+9BsAh/48sdZJa0KBJqVmC8X8OhVYS47Lj3Xlx3O4ElrS/yyMyq5hNY12pK8ri3E73mEJ6j84TChs+wv38gTSLAjRGxKcLsAAAAASUVORK5CYII=';
    //
    if (this.props.currentNotebook) {
      return (
        <div className = 'notes-header-container notebook'>
          <img className = 'notebook-header-edit-toggle' src={_infoIcon} width="24" height="24" onClick={() => this.toggleModal()}/>
          <div className = 'notes-header notebook'>
            <h2 className = 'notes-header-notebook'>{this.props.currentNotebook.title}</h2>
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
    //
    return(
      this.props.notes.map((note) => (
        <div key={shortid.generate()} >
          <Button onClick = {() => this.handleDelete(note.id)} />
          <Note match={this.props.match}note={note}/>
        </div>
      ))
    );
  }

  toggleModal() {
    this.setState({notebookEditModal: !this.state.notebookEditModal});
  }

  handleSubmit(event)  {
    event.preventDefault();

    this.props.editNotebook({title: this.refs.editnotebookname.value,id: this.props.currentNotebook.id}).then(() => this.toggleModal());
  }

  showNotebookDeleteModal() {
    this.setState({notebookDeleteModal: true});
  }

  hideNotebookDeleteModal() {
    this.setState({notebookDeleteModal: false});
  }

  renderNotebookEditModal() {
    debugger;
    if (this.state.notebookEditModal) {
      return (
        <div className={this.state.notebookEditModal ? 'notebookEditModal active' : 'notebookEditModal'}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAjCAYAAADmOUiuAAACzElEQVR42u1YPWtUURANSlAiGBCrkEZjQG0kFmIaxZ+RH6EQCwubLd3GIlu5vMjCut+fbDakkQiCyEKK3crKX5B04i7GNYnnyLnylDXe+97bW+XB8Jbkzsx5M3PPzL0zM2fP2TP5KRQKl6vV6hokqNfrvVqtdoD3mKLfPUjANVzrDRic32g0GptwPoScWMqQOtSdGrBcLncRTl7A2aGcHsHhe7yf4f2w0+ks5PP5S5Rms7kIeYT/PYd8hBxL55A2aCtRcJVKZQnG+3LCFDpFA/q3ACwPnSPZ6NNmUuDuwOA+DcPBJzhaiWHrPmx8Fsh92k4icgbcFtOXQA3Pw95uCORS5JqDMZPW7Ww2O5tUyWQymQsGJHwMItWkNsSvtHa73bkpsMG8STd9OVOJduvYtuaw7iXWf+fb1k+r1VolG9CXEwWJ5xi9rMNHfVU5jFyCgfVvFMVN6w4hEv5RLBavO5bEF0jasZRuiieHVh2HrUlf9NZjd/ogn2s2IQ+U3qe+AKrjsDwCm8U9AVx1cPBH73UFqLZI3T2bcHMSOSmVSld9AUTtLUr3wMbZWBE8HyFVkQCyQ5k+bw0wlUqd8wUQXWpOut+sU4z3FV8Ay+XygunNLpvkni+A2CQPrDeJoRlw0hNfADn0WtOMIWrIji+AyNY7a6IOtboxR/dpA+Q8qEl7ZH24wuLXcrYxbYCmpOgzyrjFMei2K1HbAkX07nIo0WFq2bWe0trN/f9NvFEAkpw5DGtt2rVuzcg/kIFaFOI+hZhneYyINfLzabfbvw9NkHIS51m1tW1DzPSR5LGzb1OTpwynK6G0xj92hiMZSjc3z4YLBUH3GnRehQaRQezITapJbRxz9UFnO5DHbIvs3axTTkEc1ThPImLrnMy1U83HpRO/+vgrTcviyUmXR8f/2NEj6jhTSdzrN7YmEe0eh03DaapZ/i3gmjjXbz8B/cOTqcbILfgAAAAASUVORK5CYII=" width="40" height="35"/>
          <h2>NOTEBOOK INFO</h2>
          <div className = 'notebookEditModal-seperator'/>
          <h2>Overview</h2>
          <form onSubmit ={this.handleSubmit}>
            <input type="text" ref="editnotebookname" defaultValue={this.props.currentNotebook.title.slice()}/>
            <h2>CREATOR</h2>
            {this.props.defaultNotebook ? null : <a onClick={() => this.showNotebookDeleteModal()}>Delete Notebook</a>}
            <div className = 'notebookEditModalFormButtons'>
              <Button onClick={() => this.toggleModal()}>Cancel</Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      );
    }
  }

  handleNotebookDelete(id)  {
    this.toggleModal();
    this.hideNotebookDeleteModal();
    // this.props.destroyNotebook(id).then((action) =>
    //   this.props.history.push('/home/notes/' + `${action.notes.ordered.updated_at_desc[0] ? action.notes.ordered.updated_at_desc[0] : ''}`)
    // );
    this.props.destroyNotebook(id);
    this.props.history.push('/home/notes/');

  }

  renderNotebookDeleteModal() {

    if (this.state.notebookDeleteModal) {
      return (
        <div className='notebookDeleteModal'>
          <img className="gwt-Image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAjCAYAAADmOUiuAAACbElEQVR42u2XP2gTURzHg5aKQ5dSig5OtlgcstgidnAyWC2YRVPEwUVS0cGpRlwylVQcHEohggGH5nJ3uaQd5CCBgmJTSEDQoYiBDkFMIYKgg0iVxt+Tb8ur3jtyd+8Fhxw8km/uvd/v877vb0Kh3tN7/n3y+XyUyjaVdoeF1Y12E9AL3D5kNwH/JFVVvwfYFUAKWPExz/yWyv8O+DqQm6Zp3kOgJ0FHxrKsRRaLPu9KG27DMG4C8LmEqbOMWDekAZKDVxB0lduo2/T7ig/AF3DwskwHzwPoFdOFQmFPv/QxxOvo7KQ0QE3Twgj6DknCcOGtDwc30bnT0gBzudwJADactEfAT6wtjcJxaYCZTGYAQN/+0l99AH6Hg0dlb9w/qewmk8k+XlOiw53GsG37CDr2Q/rxRiCfWXCaj0MAbPG6wxjHlN1sKGidBc9ms6NumiBGXFbwGADfq3CwxoLruj4BoKqbFsQ4B8ANFYBlFrxYLEYAVHLSVC/iMgqXAGirADSx98UwXDqv6bvBNG3qMZchvg5ATQXgUwDFcbqkkWwWgGn+vcDBO2izJB2QgB4heALAKV4T2AEtAHyIOvMqHHwAh1JIdh/JFtCBBK8FgI8xT+ekAxLYbQCkARx304JOPkOdW9IB6eycgYM63LiGZIaTFgBacPCqCgcvAqCEZBEkK/N6770AcA0r/YIKwLMAqEKPA7DGNNugeS0AfIM6Z1QsklMY4g/QIwCuO2nBItnCaXNSOiCdGMMAaAXo5Bc4OKjCwX4A7vhpT9e0Q9T2l9crmtcbzUcJ/4EbIVUP9XyKEjQDwDUpxrSXnL8BI9Tv3UAALyAAAAAASUVORK5CYII=" width="40" height="35"/>
          <h2>DELETE NOTEBOOK</h2>
          <div className = 'notebookEditModal-seperator'/>
          <h2>Are you sure you want to delete <strong>{this.props.currentNotebook.title}</strong>?</h2>
          <div className = 'notebookDeleteModalButtons'>
            <Button onClick={() => this.hideNotebookDeleteModal()}>Cancel</Button>
            <Button onClick={()=> this.handleNotebookDelete(this.props.currentNotebook.id)} type="button">Delete</Button>
          </div>
        </div>
      );
    }
  }

  render()  {
    console.log('in notes render');
    // console.log(this.props.selected, 'THIS SHOULD BE A BOOL');
    // console.log(this.props);
    if (!this.props.notes)  {
      return null;
    }
    //
    let noteCount = this.props.notes.length;
    return (
      <div className ={this.state.notesScrollerClass}>
        {this.renderNotebookDeleteModal()}
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
