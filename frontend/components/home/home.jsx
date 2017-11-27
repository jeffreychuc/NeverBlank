import React from 'react';
import NotesContainer from '../notes/notes_container';
import NavSidebarContainer from '../nav/nav_sidebar_container';
import EditorContainer from '../editor/editor_container';

class Home extends React.Component  {
  constructor (props)  {
    super(props);
  }

  componentDidMount() {
    // fetches notes then sets active note to first note in list.
    console.log('home did mount');
    this.props.fetchNotes().then(() => this.getRedirect()).then((redirect) => this.props.history.push(redirect));
  }

  getRedirect() {
    const notesList = this.props.state.entities.notes.ordered.updated_at_desc;
    if (notesList.length === 0) {
      return ('/home/notes/');
    }
    else  {
      return (`/home/notes/${notesList[0]}`);
    }
  }

  componentWillReceiveProps(newProps) {
    console.log('new props in home yo');
    //do i need to set state here?
    // debugger;
  }

  render()  {
    // check for loaded notes and pushed path
    // debugger;
    if (this.props.state.entities.notes)  {
      console.log('notes loaded, rendering home view');
      // console.log(this.props.state.entities.notes);
      let notesToBePassed;
      let notesToBePassedByID;
      if (this.props.match.params.noteId) {
        notesToBePassed = this.props.state.entities.notes;
        notesToBePassedByID = notesToBePassed.by_id;
      }
      else  {
        notesToBePassed = null;
        notesToBePassedByID = null;
      }
      return (
        <div className = 'main-view'>
          <NavSidebarContainer />
          <div className = 'notes-sidebar'>
            <NotesContainer notes={notesToBePassed} />
          </div>
          <div className = 'editor-main'>
            <EditorContainer notes={notesToBePassedByID} placeholder={'Drag files here or just start typing...'}/>
          </div>
        </div>
      );
    }
    else  {
      console.log('notes still loading, skipping render');
      return null;
    }
  }
}

export default Home;

// {/* <Button className='logout' onClick={this.handleLogout.bind(this)} block>Logout</Button> */}
