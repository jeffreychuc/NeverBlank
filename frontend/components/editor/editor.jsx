import React from 'react';
import ReactQuill from 'react-quill';
import shortid from 'shortid';
import { DropdownButton, MenuItem } from 'react-bootstrap';
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
    debugger;
    if ('notebookId' in this.props.match.params)  { //lol
      return `/home/notebooks/${this.props.match.params.notebookId}/notes/${action.notebooks.ordered.created_at_desc[this.props.match.params.notebookId][this.props.match.params.notebookId][action.notebooks.ordered.created_at_desc[this.props.match.params.notebookId][this.props.match.params.notebookId].length-1]}`;
    }
    debugger;
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
      });
    }
  }

  handleChange (html) {
    //
    clearTimeout(this.autoSaveTimeoutId);
    this.setState({editorHtml: html});
    //
    console.log('wtf');
    if ((this.props.note ? this.props.note.body : '') !== this.state.editorHtml) {
      this.autoSaveTimeoutId = setTimeout(() => this.handleSave(this.state), 1000);
    }
  }


  componentWillReceiveProps(newProps) {
    // ((newProps.note.id !== 'new') ? this.props.getAllTagsForNote(newProps.note.id) : null)();
    //
    debugger;
    if ((newProps.note !== undefined) && (this.props.note !== undefined))  {
      if ((newProps.note.id !== this.props.note.id) && (newProps.note.id !== 'new')) {

        this.props.getAllTagsForNote(newProps.note.id);
      }
    }

    console.log('fdlksjlksajflkjs');
    console.log('dsfklajlfkjsaklfj');

    if (!isEqual(this.props.note, newProps.note) || !isEqual(this.props.currentNoteTags, newProps.currentNoteTags))  {
      // this.handleSave(this.state);
      // causes double save

      if (!isEqual(this.props.currentNoteTags, newProps.currentNoteTags)) {
        this.setState({currentNoteTags: newProps.currentNoteTags});
      }

      let editorBody;
      let noteId;
      let notebookId;
      let title;
      let tags;
      // sorry
      //
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

      console.log('fsadkfa;sk');
      this.setState({editorHtml: editorBody,title: title, id: noteId, notebook_id: notebookId});
    }
  }
  debug(tags)  {

  }

  handleNotebookChange(newNotebook)  {
    //

    console.log('fsldiuflkdsaj');
    this.handleSave(merge({}, this.state, newNotebook ));
  }

  renderNotebookDropdown()  {
    //
    return(
      <DropdownButton title={this.props.notebooksById[this.props.note ? this.props.note.notebook_id : this.props.match.params.notebookId ? this.props.match.params.notebookId : this.props.defaultNotebookId].title} id="bg-nested-dropdown">
        <MenuItem key={shortid()} onClick={null}>Create A New Notebook</MenuItem>
        {this.props.notebooks.map((notebook_pair) => <MenuItem key={shortid()} onClick={() => this.handleNotebookChange({notebook_id: Object.keys(notebook_pair)[0]})}>{Object.keys(notebook_pair)[0]} {this.props.notebooksById[Object.keys(notebook_pair)[0]].title}</MenuItem> )}
      </DropdownButton>
    );
  }

  renderTagArea() {
    debugger;
    if (this.props.currentNoteTags !== undefined && this.state.id !== undefined)  {
      return (
        <div className = 'tags-above-editor'>
          {this.props.currentNoteTags ? Object.values(this.props.currentNoteTags).map((tag) => <p key={shortid()}>{tag.name}</p>) : null}
          <form onSubmit={(e) => this.addNewTag(e)}>
            <input ref='newtagname' type='text' placeholder='+' />
          </form>
        </div>
      );
    }
    return null;
  }

  addNewTag(e) {
    e.preventDefault();

    this.props.createTagAndAttach({note_id: this.props.note.id, tagName: this.refs.newtagname.value}).then(() => this.props.getAllTagsForNote(this.props.note.id));

    this.refs.newtagname.value = '';
  }

  render () {
    console.log(this.props.note, 'THIS IS THE CURRENT NOTE');
    console.log(this.props.notebooksById, 'THESE ARE THE CURRENT NOTEBOOKS');

    // if note/new, default notebook
    // if path
    return (
      <div>
        {this.renderNotebookDropdown()}
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
        <div className = 'editor-full-screen-button' onClick={null}>
          <i className="fa fa-expand fa-2x" aria-hidden="true"/>
        </div>

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
