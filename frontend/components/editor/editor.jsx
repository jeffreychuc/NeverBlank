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
    //debugger;
    this.state = this.props.note ? {title: this.props.note.title, editorHtml: this.props.note.body, id: this.props.note.id, notebook_id: this.props.note.notebook_id} : {title: '', editorHtml: '', notebook_id: this.props.match.params.notebookId};
    this.buildRedirect = this.buildRedirect.bind(this);
    this.autoSaveTimeoutId = null;
  }

  stripTags(html) {
    html = html.replace(/<p>/g,'');
    html = html.replace(/<\/p>/g,'\n\n');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent||tempDiv.innerText;
  }

  buildRedirect(action) {
    debugger;
    console.log('kdfljsafk');
    if ('notebookId' in this.props.match.params)  {
      return `/home/notebooks/${this.props.match.params.notebookId}/notes/${action.notes.ordered.updated_at_desc[0]}`;
    }
    return action;



    // this.props.match.path.split('/').slice(0,this.props.match.path.split('/').length-1).join('/')
    // + '/'
    // + action.notes.ordered.updated_at_desc[0]));
  }

  handleSave(editorState)  {

    const { title, editorHtml, id, notebook_id } = editorState;
    debugger;
    if (!id || id === 'new') {
      //debugger;
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
    //debugger;
    console.log('wtf');
    if ((this.props.note ? this.props.note.body : '') !== this.state.editorHtml) {
      this.autoSaveTimeoutId = setTimeout(() => this.handleSave(this.state), 1000);
    }
  }


  componentWillReceiveProps(newProps) {
    //debugger;
    if (!isEqual(this.props.note,newProps.note))  {
      // this.handleSave(this.state);
      // causes double save
      let editorBody;
      let noteId;
      let notebookId;
      let title;
      //debugger;
      if (newProps.match.params.noteId === 'new' || newProps.note === undefined) {
        editorBody = '';
        title = '';
        noteId = 'new';
        // //debugger;
        notebookId = 'notebookId' in this.props.match.params ? this.props.match.params.notebookId : this.props.defaultNotebookId;//default notebook;
      }
      else  {
        editorBody = newProps.note.body;
        noteId = newProps.note['id'];
        notebookId = newProps.note.notebook_id;
        title = newProps.note.title;
      }

      this.setState({editorHtml: editorBody,title: title, id: noteId, notebook_id: notebookId});
    }
  }

  handleNotebookChange(newNotebook)  {
    //debugger;
    this.handleSave(merge({}, newNotebook, this.state));
  }

  renderNotebookDropdown()  {
    //debugger;
    return(
      <DropdownButton title={this.props.notebooksById[this.props.note ? this.props.note.notebook_id : this.props.match.params.notebookId ? this.props.match.params.notebookId : this.props.defaultNotebookId].title} id="bg-nested-dropdown">
        <MenuItem key={shortid()} onClick={null}>Create A New Notebook</MenuItem>
        {this.props.notebooks.map((notebook_pair) => <MenuItem key={shortid()} onClick={() => this.handleNotebookChange({notebook_id: Object.keys(notebook_pair)[0]})}>{Object.keys(notebook_pair)[0]} {this.props.notebooksById[Object.keys(notebook_pair)[0]].title}</MenuItem> )}
      </DropdownButton>
    );
  }
  render () {
    console.log(this.props.note, 'THIS IS THE CURRENT NOTE');
    console.log(this.props.notebooksById, 'THESE ARE THE CURRENT NOTEBOOKS');

    // if note/new, default notebook
    // if path
    return (
      <div>
        {this.renderNotebookDropdown()}
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
