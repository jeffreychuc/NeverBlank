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
    debugger;
    this.state = {title: this.props.note.title, editorHtml: this.props.note.body, id: this.props.note.id, notebook_id: this.props.note.notebook_id};
    console.log('fkds;kfla');
    this.debug = this.debug.bind(this);
    this.autoSaveTimeoutId = null;
  }

  stripTags(html) {
    html = html.replace(/<p>/g,'');
    html = html.replace(/<\/p>/g,'\n\n');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent||tempDiv.innerText;
  }

  debug(data) {
    return data;
  }

  handleSave(editorState)  {
    debugger;
    const { title, editorHtml, id, notebook_id } = editorState;
    if (id === 'new') {
      debugger;
      this.props.createNotes({
        body: editorHtml,
        title: title,
        bodypreview: this.stripTags(editorHtml).substring(0, 200),
        notebook_id: notebook_id
      }).then((action) => this.props.history.push(
        this.props.match.path.split('/').slice(0,this.props.match.path.split('/').length-1).join('/')
        + '/'
        + action.notes.ordered.updated_at_desc[0]));
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
    if (this.props.note.body !== this.state.editorHtml) {
      this.autoSaveTimeoutId = setTimeout(() => this.handleSave(this.state), 1000);
    }
  }


  componentWillReceiveProps(newProps) {
    debugger;
    if (!isEqual(this.props.note,newProps.note))  {
      // this.handleSave(this.state);
      // causes double save
      let editorBody;
      let noteId;
      if (newProps.match.params.noteId === 'new') {
        editorBody = '';
        noteId = 'new';
        debugger;
        notebook_id = 'notebookId' in this.props.match.params ? this.props.match.params.notebookId : 9999;//default notebook;
      }
      else  {
        editorBody = newProps.note.body;
        noteId = newProps.note['id'];
      }

      this.setState({editorHtml: editorBody, id: noteId, notebook_id: newProps.notebook_id});
    }
  }

  handleNotebookChange(newNotebook)  {
    debugger;
    this.handleSave(merge({}, newNotebook, this.state));
  }

  renderNotebookDropdown()  {
      return(
        <DropdownButton title={this.props.notebooksById[this.props.note.notebook_id ? this.props.note.notebook_id : this.props.defaultNotebookId].title} id="bg-nested-dropdown">
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

// {/* <MenuItem onClick={} >Dropdown link</MenuItem> */}
