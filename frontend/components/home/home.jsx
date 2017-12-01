import React from 'react';
import NotesContainer from '../notes/notes_container';
import NavSidebarContainer from '../nav/nav_sidebar_container';
import EditorContainer from '../editor/editor_container';
import NotebooksContainer from '../notebooks/notebooks_container';
import { sortBy, filter } from 'underscore';

class Home extends React.Component  {
  constructor (props)  {
    super(props);
  }

  componentDidMount() {
    // fetches notes then sets active note to first note in list.
    console.log('home did mount');
    this.props.setLoadingState(true);
    this.props.fetchNotes();
    this.props.fetchNotebooks();
    //add logic for rerouting base on path
  }

  debug() {

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
    //
    if (newProps.state.entities.notes !== null && newProps.state.entities.notebooks !== null) {
      if (('ordered' in newProps.state.entities.notes) && ('ordered' in newProps.state.entities.notebooks)) {
        //
        console.log('wtf');
        if (this.props.state.ui.loading)  {
          this.props.setLoadingState(false);
        }
        let redirect;
        // Home view

        if (this.props.match.path === '/home/' || this.props.match.path === '/home/notes/' || newProps.match.path === '/home/notes/') {
          //add logic to check for current notebook
          const notesList = newProps.state.entities.notes.ordered.updated_at_desc;
          //
          if (notesList.length === 0) {
            redirect = '/home/notes/';
          }
          else  {
            redirect = `/home/notes/${notesList[0]}`;
          }
          // if ((redirect !== this.props.match.url) && (redirect !== newProps.match.url)) {
          //   this.props.history.push(redirect);
          // }
          //
          if ((newProps.match.url === '/home/notes/' && redirect !== newProps.match.url) || ((redirect !== this.props.match.url) && (redirect !== newProps.match.url))) {
            this.props.history.push(redirect);
          }
        }
        else if (newProps.match.path === '/home/notebooks/:notebookId') {
          //
          let notebook_id = newProps.match.params.notebookId;
          //

          debugger;
          console.log('fjkahsfjdhasj');
          // let notebookNotes = this.props.state.entities.notes.by_id.filter((note) => note.notebook_id === notebook_id);
          let notebookNotes = Object.keys(this.props.state.entities.notes.by_id).map((id) => this.props.state.entities.notes.by_id[id]);
          notebookNotes = notebookNotes.filter((note) => note.notebook_id === parseInt(notebook_id));
          notebookNotes = sortBy(notebookNotes, (note) => (
            this.props.state.entities.notes.ordered.updated_at_desc.indexOf(note.id))
          );
          let orderedNotebookNotes = notebookNotes[0];
          debugger;
          this.props.history.push(orderedNotebookNotes ? `/home/notebooks/${notebook_id}/notes/${orderedNotebookNotes.id}` : `/home/notebooks/${notebook_id}/notes/`);
        }
      }


      //need to handle all loading in here.....
      //
    }
  }

  render()  {
    // check for loaded data, set in compoenent did mount
    if (!this.props.state.ui.loading)  {
      console.log('notes loaded, rendering home view');
      // this two lines need to be change to accout for switching notebooks
      // let notesToBePassed = this.props.state.entities.notes;
      let notesToBePassed = [];
      let currentNotebook;
      //logic for notesToBePassed

      if (this.props.match.path.includes('/home/notebooks/:notebookId'))  {
        //
        console.log('omg');
        // Object.values(test.find((notebook) => Object.keys(notebook)[0] === '6')) === undefined
        if (this.props.state.entities.notes.by_id !== undefined)  {

          console.log('fdklsajflk');
          notesToBePassed = Object.values(this.props.state.entities.notes.by_id).filter((note) => note.notebook_id === parseInt(this.props.match.params.notebookId));
          // https://stackoverflow.com/questions/13304543/javascript-sort-array-based-on-another-array
          notesToBePassed = sortBy(notesToBePassed, (note) => (
            this.props.state.entities.notes.ordered.updated_at_desc.indexOf(note.id))
          );
          debugger;
          console.log('lkdsjflksajflk');



        }
        //set current notebook
        currentNotebook= this.props.state.entities.notebooks.by_id[this.props.match.params.notebookId];
        // dont render on this pass?
      }
      else if (this.props.match.path === '/home/notes/:noteId')  {
        notesToBePassed = this.props.state.entities.notes.ordered.updated_at_desc.map((id) => this.props.state.entities.notes.by_id[id]); // returns list of objects (notes) that belong to the user
      }

      //
      // }

      // logic for note to be passed to editor
      let noteToBePassedById;
      console.log('NOT LIKE THIS');
      // //debugger;
      // //debugger;
      //debugger;
      // if ((('noteId' in this.props.match.params) && (this.props.match.params['noteId'] !== 'new') && (('by_id' in this.props.state.entities.notes) && parseInt(this.props.match.params.noteId) in this.props.state.entities.notes.by_id))) {
      //   noteToBePassedById = this.props.state.entities.notes.by_id[this.props.match.params['noteId']];
      // }
      // else  {
      //   if ((this.props.match.path === '/home/notebooks/:notebookId/notes') || (this.props.match.path === '/home/notebooks/:notebookId'))  {
      //     let noteId = Object.values(this.props.state.entities.notebooks.ordered.created_at_desc.find((notebook_pair) => Object.keys(notebook_pair)[0] === this.props.match.params.notebookId))[0][0];
      //     debugger;
      //     console.log('flkdjsflksdj');
      //     noteToBePassedById = this.props.state.entities.notes.by_id[noteId];
      //   }
      //   else  {
      //     noteToBePassedById = {body: '', title: '', notebook_id: 'notebookId' in this.props.match.params ? this.props.match.params.notebookId : this.props.state.session.currentUser.default_notebook};
      //   }
      // }
      // debugger;
      let noteId;
      let notebookId;
      if ('noteId' in this.props.match.params)  {
        noteId = this.props.match.params.noteId;
      }
      if ('notebookId' in this.props.match.params)  {
        notebookId = this.props.match.params.notebookId;
      }
      // logic for no notebook
      if (notebookId === undefined && (noteId !== undefined && noteId !== 'new')) {
        noteToBePassedById = this.props.state.entities.notes.by_id[noteId];
      }//logic for notebook with active note
      else if (noteId === 'new')  {
        noteToBePassedById = {body: '', title: '', notebook_id: 'notebookId' in this.props.match.params ? this.props.match.params.notebookId : this.props.state.session.currentUser.default_notebook};
      }
      else if ((notebookId !== undefined) && (noteId !== undefined))  {
        //check if note is in notebook
        // gets notebook array of notes
        let notebookArray = Object.values(this.props.state.entities.notebooks.ordered.created_at_desc.find((notebookObject) => Object.keys(notebookObject)[0] === this.props.match.params.notebookId))[0];
        if(notebookArray.includes(parseInt(noteId)))  {
          noteToBePassedById = this.props.state.entities.notes.by_id[noteId];
        }
        else if (notebookArray.length > 0)  {
          this.props.history.push(`/home/notebooks/${notebookId}/notes/${notesToBePassed[0].id}`);
        }
      }
      let notebooksToBePassed = this.props.state.entities.notebooks;
      //
      //
      return (
        <div className = 'main-view'>
          <NavSidebarContainer />
          <div className = 'notes-sidebar'>
            <NotesContainer currentNotebook={currentNotebook} notes={notesToBePassed} />
          </div>
          <div className = 'editor-main'>
            <EditorContainer note={noteToBePassedById} placeholder={'Drag files here or just start typing...'}/>
          </div>
          <div className = 'notebooks-sidebar'>
            <NotebooksContainer notebooks={notebooksToBePassed} />
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
