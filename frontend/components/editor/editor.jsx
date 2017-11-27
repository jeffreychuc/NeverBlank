import React from 'react';
import ReactQuill from 'react-quill';
import striptags from 'striptags';

class Editor extends React.Component {
  constructor (props) {
    console.log('IN EDITOR CONSTRUCTOR');
    super(props);
    this.currentEditorNote = this.props.notes ? this.props.notes[parseInt(this.props.match.params.noteId)] : {body: '', title: ''};
    this.handleChange = this.handleChange.bind(this);
    this.state = {editorHtml: this.currentEditorNote.body};
    this.autoSaveTimeoutId = null;
  }

  handleAutoSave(editorState, id)  {
    const bodyHtml = editorState['editorHtml'];
    if (typeof id === "undefined") {
      this.props.createNote({body: bodyHtml, bodypreview: striptags(bodyHtml)}).then((note)=> this.debug(note)).then((action) => this.props.history.push(`/home/notes/${action.notes.ordered.created_at_desc[0]}`));
    }
    else  {
      // this.props.createNote({body: bodyHtml, bodypreview: striptags(bodyHtml)}).then((note) => this.debug(note));
      this.props.saveNotes({body: bodyHtml, bodypreview: striptags(bodyHtml).substring(0, 200), id: id}).then((note) => this.debug(note));
    }
    // add logic to only autosave if there was a change in the document?
  }

  debug(note) {
    return note;
  }

  handleChange (html) {
    console.log(this.state);
    console.log('setting state for some reason');
    clearTimeout(this.autoSaveTimeoutId);
    this.setState({editorHtml: html});
    if (this.state.editorHtml !== this.currentEditorNote.body)  {
      this.autoSaveTimeoutId = setTimeout(() => this.handleAutoSave(this.state, this.currentEditorNote.id), 1000);
    }
  }

  componentWillReceiveProps(newProps) {
    // if (this.props.match)
    // if (this.props.match.path === newProps.match.path)  {
    //   // save on exit but broken?

    //   if ((this.props.match.params.noteId !== newProps.match.params.noteId) && (this.state.editorHtml !== this.currentEditorNote.body))  {
    //     this.handleAutoSave(this.state, this.currentEditorNote.id);
    //   }
    //   this.currentEditorNote = newProps.notes[parseInt(newProps.match.params.noteId)];
    //   this.setState({editorHtml: this.currentEditorNote.body});
    // }
    if (this.props.match.params.noteId !== newProps.match.params.noteId)  {
      // if (this.state.editorHtml !== this.currentEditorNote.body)  {
      //   this.handleAutoSave(this.state, this.currentEditorNote.id);
      // }
      this.currentEditorNote = newProps.notes[parseInt(newProps.match.params.noteId)];
      this.setState({editorHtml: this.currentEditorNote.body});
    }
  }

  render () {
    // debugger;
    const renderNoteContent = this.state.editorHtml ? this.state.editorHtml : '';
    return (
      <div>
        <ReactQuill
          theme={'snow'}
          onChange={this.handleChange}
          value={renderNoteContent}
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
