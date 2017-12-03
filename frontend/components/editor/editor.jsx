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
    this.state = this.props.note ? { currentNoteTags: [], title: this.props.note.title, editorHtml: this.props.note.body, id: this.props.note.id, notebook_id: this.props.note.notebook_id} : {title: '', editorHtml: '', notebook_id: this.props.match.params.notebookId};
    this.buildRedirect = this.buildRedirect.bind(this);
    this.renderTagRea = this.renderTagArea.bind(this);
    this.addNewTag = this.addNewTag.bind(this);
    this.autoSaveTimeoutId = null;
  }

  componentDidMount() {

    this.props.getAllTagsForNote(parseInt(this.props.match.params.noteId));
  }

  stripTags(html) {
    return html.replace(/(<([^>]+)>)/ig,' ').replace(/\s{2,}/gi, ' ').trim();
  }

  buildRedirect(action) {

    if ('notebookId' in this.props.match.params)  { //lol
      return `/home/notebooks/${this.props.match.params.notebookId}/notes/${action.notes.ordered.created_at_desc[0]}}`;
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
      });
    }
  }

  handleChange (html) {
    //
    clearTimeout(this.autoSaveTimeoutId);
    this.setState({editorHtml: html});
    //

    if ((this.props.note ? this.props.note.body : '') !== this.state.editorHtml) {
      this.autoSaveTimeoutId = setTimeout(() => this.handleSave(this.state), 1000);
    }
  }


  componentWillReceiveProps(newProps) {
    // ((newProps.note.id !== 'new') ? this.props.getAllTagsForNote(newProps.note.id) : null)();
    //

    if ((newProps.note !== undefined) && (this.props.note !== undefined))  {
      if ((newProps.note.id !== this.props.note.id) && (newProps.note.id !== 'new')) {

        this.props.getAllTagsForNote(newProps.note.id);
      }
    }


    // debugger;
    console.log('sfadjlksa');
    if (!isEqual(this.props.note, newProps.note) || !isEqual(this.props.currentNoteTags, newProps.currentNoteTags))  {
      // this.handleSave(this.state);
      // causes double save
      debugger;
      if (!isEqual(this.props.currentNoteTags, newProps.currentNoteTags)) {
        this.setState({currentNoteTags: newProps.currentNoteTags});
      }

      let editorBody;
      let noteId;
      let notebookId;
      let title;
      let tags;

      console.log('sfadjlksa');
      if (newProps.match.params.noteId === 'new' || newProps.note === undefined) {
        editorBody = '';
        title = '';
        noteId = 'new';
        // //
        notebookId = 'notebookId' in this.props.match.params ? this.props.match.params.notebookId : this.props.defaultNotebookId;//default notebook;
      }
      else  {
        editorBody = newProps.note.body;
        noteId = newProps.note['id'];
        notebookId = newProps.note.notebook_id;
        title = newProps.note.title;
        this.props.getAllTagsForNote(noteId);

      }


      this.setState({editorHtml: editorBody,title: title, id: noteId, notebook_id: notebookId});
    }
  }
  debug(tags)  {

  }

  handleNotebookChange(newNotebook)  {
    //


    this.handleSave(merge({}, this.state, newNotebook ));
  }

  renderNotebookDropdown()  {
    debugger;
    return(
      <div className = 'notebookDropdown'>
        <DropdownButton className='reactnotebookdropdown' title={this.props.notebooksById[this.props.note ? this.props.note.notebook_id : this.props.match.params.notebookId ? this.props.match.params.notebookId : this.props.defaultNotebookId].title} id="bg-nested-dropdown">
          <MenuItem key={shortid()} onClick={null}>Create A New Notebook</MenuItem>
          {this.props.notebooks.map((notebook_pair) => <MenuItem key={shortid()} onClick={() => this.handleNotebookChange({notebook_id: Object.keys(notebook_pair)[0]})}>{Object.keys(notebook_pair)[0]} {this.props.notebooksById[Object.keys(notebook_pair)[0]].title}</MenuItem> )}
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



    // if note/new, default notebook
    // if path
    // {this.renderNotebookDropdown()}
    return (
      <div className='editorView'>

        <div className = 'editor-full-screen-button' onClick={null}>
          <i className="fa fa-expand fa-2x" aria-hidden="true"/>
        </div>
        {this.renderTagArea()}
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
