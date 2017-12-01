import React from 'react';
import NotesContainer from '../notes/notes_container';
import NavSidebarContainer from '../nav/nav_sidebar_container';
import EditorContainer from '../editor/editor_container';
import NotebooksContainer from '../notebooks/notebooks_container';
import TagsContainer from '../tags/tags_container';
import { sortBy, filter, isEmpty } from 'underscore';

class Home extends React.Component  {
  constructor (props)  {
    super(props);
  }

  componentDidMount() {
    // fetches notes then sets active note to first note in list.
   
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
        else if ((newProps.match.path === '/home/notebooks/:notebookId') && ('notes' in this.props.state.entities) && (this.props.state.entities.notes !== null)) {
          if (!this.props.state.ui.loading) {
            let notebook_id = newProps.match.params.notebookId;
            //
            if (this.props.state.entities.notes.ordered.updated_at_desc.length !== 0) {
            //
             
              debugger;
              // let notebookNotes = this.props.state.entities.notes.by_id.filter((note) => note.notebook_id === notebook_id);
              let notebookNotes = Object.keys(this.props.state.entities.notes.by_id).map((id) => this.props.state.entities.notes.by_id[id]);
              notebookNotes = notebookNotes.filter((note) => note.notebook_id === parseInt(notebook_id));
              notebookNotes = sortBy(notebookNotes, (note) => (
                this.props.state.entities.notes.ordered.updated_at_desc.indexOf(note.id))
              );
              let orderedNotebookNotes = notebookNotes[0];
              //
              this.props.history.push(orderedNotebookNotes ? `/home/notebooks/${notebook_id}/notes/${orderedNotebookNotes.id}` : `/home/notebooks/${notebook_id}/notes/`);
            }
          }
        }
      }


      //need to handle all loading in here.....
      //
    }
  }

  render()  {
    // check for loaded data, set in compoenent did mount
    if (!this.props.state.ui.loading)  {
     
      // this two lines need to be change to accout for switching notebooks
      // let notesToBePassed = this.props.state.entities.notes;
      let notesToBePassed = [];
      let currentNotebook;
      //logic for notesToBePassed

      if (this.props.match.path.includes('/home/notebooks/:notebookId'))  {
        //
       
        // Object.values(test.find((notebook) => Object.keys(notebook)[0] === '6')) === undefined
        if (this.props.state.entities.notes.by_id !== undefined)  {

         
          notesToBePassed = Object.values(this.props.state.entities.notes.by_id).filter((note) => note.notebook_id === parseInt(this.props.match.params.notebookId));
          // https://stackoverflow.com/questions/13304543/javascript-sort-array-based-on-another-array
          notesToBePassed = sortBy(notesToBePassed, (note) => (
            this.props.state.entities.notes.ordered.updated_at_desc.indexOf(note.id))
          );
          //
         



        }
        //set current notebook
        currentNotebook= this.props.state.entities.notebooks.by_id[this.props.match.params.notebookId];
        // dont render on this pass?
      }
      else if (this.props.match.path === '/home/notes/:noteId')  {
        notesToBePassed = this.props.state.entities.notes.ordered.updated_at_desc.map((id) => this.props.state.entities.notes.by_id[id]); // returns list of objects (notes) that belong to the user
      }

      // logic for note to be passed to editor
      let noteToBePassedById;
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
        debugger;
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
          //
        }
        else if (notebookArray.length > 0)  {
          this.props.history.push(`/home/notebooks/${notebookId}/notes/${notesToBePassed[0].id}`);
          //
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
          <div className = 'tags-sidebar'>
            <TagsContainer />
          </div>
        </div>
      );
    }
    else  {
     
      return null;
    }
  }
}

export default Home;
