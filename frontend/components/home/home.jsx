import React from 'react';
import NotesContainer from '../notes/notes_container';
import NavSidebarContainer from '../nav/nav_sidebar_container';
import EditorContainer from '../editor/editor_container';
import NotebooksContainer from '../notebooks/notebooks_container';

class Home extends React.Component  {
  constructor (props)  {
    super(props);
  }

  componentDidMount() {
    // fetches notes then sets active note to first note in list.
    console.log('home did mount');
    this.props.setLoadingState(true);
    this.props.fetchNotes().then(() => this.props.fetchNotebooks());
  }

  debug() {
    debugger;
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
    // debugger;
    if (newProps.state.entities.notes !== null) {
      // debugger;
      if (('ordered' in newProps.state.entities.notes)) {
        // debugger;
        if (this.props.state.ui.loading)  {
          this.props.setLoadingState(false);
        }
        let redirect = this.props.match.path;
        if (this.props.match.path === '/home/') {
          //add logic to check for current notebook
          const notesList = newProps.state.entities.notes.ordered.updated_at_desc;
          debugger;
          if (notesList.length === 0) {
            redirect += 'notes/';
          }
          else  {
            redirect += `notes/${notesList[0]}`;
          }
          if ((redirect !== this.props.match.url) && (redirect !== newProps.match.url)) {
            this.props.history.push(redirect);
          }
        }
      }
      //need to handle all loading in here.....
      // debugger;
    }
  }

  render()  {
    // check for loaded data, set in compoenent did mount
    if (!this.props.state.ui.loading)  {
      console.log('notes loaded, rendering home view');
      // this two lines need to be change to accout for switching notebooks
      let notesToBePassed = this.props.state.entities.notes;
      let noteToBePassedById;
      debugger;
      if (('noteId' in this.props.match.params) && (this.props.match.params['noteId'] !== 'new') && ('by_id' in this.props.state.entities.notes)) {
        noteToBePassedById = this.props.state.entities.notes.by_id[this.props.match.params['noteId']];
      }
      else  {
        noteToBePassedById = {body: '', id: 'new'};
      }
      // this two lines need to be change to accout for switching notebooks
      let notebooksToBePassed = this.props.state.entities.notebooks;
      // debugger;
      return (
        <div className = 'main-view'>
          <NavSidebarContainer />
          <div className = 'notes-sidebar'>
            <NotesContainer notes={notesToBePassed} />
          </div>
          <div className = 'editor-main'>
            <EditorContainer note={noteToBePassedById} placeholder={'Drag files here or just start typing...'}/>
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
