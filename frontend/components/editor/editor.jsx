import React from 'react';
import ReactQuill from 'react-quill';
import shortid from 'shortid';
import { DropdownButton, MenuItem, Button } from 'react-bootstrap';
import { isEqual } from 'underscore';
import merge from 'lodash/merge';

// import striptags from 'striptags';

class Editor extends React.Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleNotebookChange = this.handleNotebookChange.bind(this);
    // this.state = this.props.note ? { currentNoteTags: [], title: this.props.note.title, editorHtml: this.props.note.body, id: this.props.note.id, notebook_id: this.props.note.notebook_id} : {title: '', editorHtml: '', notebook_id: this.props.match.params.notebookId};
    this.buildRedirect = this.buildRedirect.bind(this);
    this.renderTagRea = this.renderTagArea.bind(this);
    this.addNewTag = this.addNewTag.bind(this);
    this.autoSaveTimeoutId = null;
    // logic for setting initial state of editor
    // if (this.)
    // debugger;
    // let currentNote = this.props.notes[this.props.match.params.noteId];
    // debugger;
    // this.state = {currentNoteTags: [], title: currentNote.title, editorHtml: currentNote.body, id: currentNote.id, notebook_id: currentNote.notebook_id};
    this.state = {editorHtml: this.props.match.params.noteId ? this.props.notes[this.props.match.params.noteId].body :''};
  }

  componentDidMount() {
    // this.props.getAllTagsForNote(parseInt(this.props.match.params.noteId));
  }

  stripTags(html) {
    return html.replace(/(<([^>]+)>)/ig,' ').replace(/\s{2,}/gi, ' ').trim();
  }

  buildRedirect(action) {

    if ('notebookId' in this.props.match.params)  { //lol
      return `/home/notebooks/${this.props.match.params.notebookId}/notes/${action.notes.ordered.created_at_desc[0]}`;
    }
    else  {
      debugger;
      return `/home/notes/${action.notes.ordered.created_at_desc[0]}`;
    }
    return action;
  }

  handleSave(editorState)  {

    const { title, editorHtml, id, notebook_id } = editorState;
    if (!id || id === 'new') {
      debugger;
      this.props.createNotes({
        body: editorHtml,
        title: title,
        bodypreview: this.stripTags(editorHtml).substring(0, 200),
        notebook_id: notebook_id
      }).then((action) => this.buildRedirect(action)).then((redirect) => this.props.history.push(redirect));
    }
    else  {
      this.props.saveNotes({
        body: editorHtml,
        title: title,
        bodypreview: this.stripTags(editorHtml).substring(0, 200),
        id: id,
        notebook_id: notebook_id
      }).then((redirect) => this.props.history.push(redirect));
    }
  }

  handleChange (html) {
    //
    clearTimeout(this.autoSaveTimeoutId);
    this.setState({editorHtml: html});
    if (this.props.match.params.noteId === 'new') {
      this.autoSaveTimeoutId = setTimeout(() => this.handleSave(this.state), 1000);
    }
    else if (this.props.notes[this.props.match.params.noteId].body !== this.state.editorHtml) {
      this.autoSaveTimeoutId = setTimeout(() => this.handleSave(this.state), 1000);
    }
  }


  componentWillReceiveProps(newProps) {
    debugger;
    if ((this.props.match.params.noteId !== newProps.match.params.noteId) && newProps.match.params.noteId !== undefined) {
      console.log('in new note!');
      let noteId = newProps.match.params.noteId;
      let editorBody;
      let notebookId;
      let title;
      let tags;
      if ('notes' in newProps && Number.isInteger(parseInt(noteId))) {
        debugger;
        editorBody = newProps.notes[noteId].body;
        notebookId = newProps.notes[noteId].notebook_id;
        title = newProps.notes[noteId].title;
      }
      else  {
        editorBody = '';
        title = '';
        noteId = 'new';
        notebookId = 'notebookId' in this.props.match.params ? this.props.match.params.notebookId : this.props.defaultNotebookId;//default notebook;
      }
      debugger;
      this.setState({editorHtml: editorBody, title: title, id: noteId, notebook_id: notebookId});
    }
    // ((newProps.note.id !== 'new') ? this.props.getAllTagsForNote(newProps.note.id) : null)();
    //

    // if ((newProps.note !== undefined) && (this.props.note !== undefined))  {
    //   if ((newProps.note.id !== this.props.note.id) && (newProps.note.id !== 'new')) {

    //     this.props.getAllTagsForNote(newProps.note.id);
    //   }
    // }


    // // debugger;
    // console.log('sfadjlksa');
    // if (!isEqual(this.props.note, newProps.note) || !isEqual(this.props.currentNoteTags, newProps.currentNoteTags))  {
    //   // this.handleSave(this.state);
    //   // causes double save
    //   debugger;
    //   // if (!isEqual(this.props.currentNoteTags, newProps.currentNoteTags)) {
    //   //   this.setState({currentNoteTags: newProps.currentNoteTags});
    //   // }

    //   let editorBody;
    //   let noteId;
    //   let notebookId;
    //   let title;
    //   let tags;

    //   console.log('sfadjlksa');
    //   if (newProps.match.params.noteId === 'new' || newProps.note === undefined) {
    //     editorBody = '';
    //     title = '';
    //     noteId = 'new';
    //     // //
    //     notebookId = 'notebookId' in this.props.match.params ? this.props.match.params.notebookId : this.props.defaultNotebookId;//default notebook;
    //   }
    //   else  {
    //     editorBody = newProps.note.body;
    //     noteId = newProps.note['id'];
    //     notebookId = newProps.note.notebook_id;
    //     title = newProps.note.title;
    //     this.props.getAllTagsForNote(noteId);

    //   }


      // this.setState({editorHtml: editorBody,title: title, id: noteId, notebook_id: notebookId});
    // }
  }
  debug(tags)  {

  }

  handleNotebookChange(newNotebook)  {
    this.handleSave(merge({}, this.state, newNotebook ));
  }

  renderNotebookDropdown()  {
    debugger;
    let currentNotebook;
    if (this.props.match.params.notebookId) {

    }
    return(
      <div className = 'notebookDropdown'>
        <DropdownButton className='reactnotebookdropdown' title={this.props.notebooksById[this.props.match.params.noteId !== 'new' ? this.props.notes ? this.props.notes[this.props.match.params.noteId] ? this.props.notes[this.props.match.params.noteId].notebook_id: this.props.defaultNotebookId : this.props.defaultNotebookId : this.props.defaultNotebookId].title} id="bg-nested-dropdown">
          <MenuItem key={shortid()} onClick={null}>Create A New Notebook</MenuItem>
          {this.props.notebooks.map((notebook_pair) => <MenuItem key={shortid()} onClick={() => this.handleNotebookChange({notebook_id: Object.keys(notebook_pair)[0]})}> {this.props.notebooksById[Object.keys(notebook_pair)[0]].title}</MenuItem> )}
        </DropdownButton>
      </div>
    );
  }

  renderTagArea() {

    if (this.props.currentNoteTags !== undefined && this.state.id !== undefined)  {
      return (
        <div className = 'tags-above-editor'>
        <div className = 'tags-icon'>
        <i className="fa fa-tags" aria-hidden="true"></i>
        </div>
          {this.props.currentNoteTags ? Object.values(this.props.currentNoteTags).map((tag) => <li> <Button onClick={null} > <p key={shortid()}>{tag.name}</p> </Button> </li>) : null}
          <form className = 'tag-input-form' onSubmit={(e) => this.addNewTag(e)}>
            <input className = 'tag-div' ref='newtagname' type='text' placeholder='+' />
          </form>
        </div>
      );
    }
    else  {
      return (
        <div className = 'tags-above-editor'>
          <div className = 'tags-icon'>
            <i className="fa fa-tags" aria-hidden="true"></i>
          </div>
        </div>
      );
    }
  }

  addNewTag(e) {
    e.preventDefault();
    this.props.createTagAndAttach({note_id: this.props.note.id, tagName: this.refs.newtagname.value}).then(() => this.props.getAllTagsForNote(this.props.note.id));
    this.refs.newtagname.value = '';
  }

  render () {


    if ('noteId' in this.props.match.params)  {
      // if note/new, default notebook
      // if path

      // {this.renderTagArea()}
      return (
        <div className='editorView'>
          {
            this.renderNotebookDropdown()
          }
          <div className = 'editor-full-screen-button' onClick={null}>
            <i className="fa fa-expand fa-2x" aria-hidden="true"/>
          </div>
          <ReactQuill
            theme={'snow'}
            onChange={this.handleChange}
            value={this.state.editorHtml}
            modules={Editor.modules}
            formats={Editor.formats}
            bounds={'.editor-main'}
            placeholder={this.props.placeholder}
            className={'quill-editor'}
          />


        </div>
      );
    }
    return null;
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'},
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
];

// /*
//  * PropType validation
//  */
// Editor.propTypes = {
//   placeholder: React.PropTypes.string,
// };

export default Editor;
