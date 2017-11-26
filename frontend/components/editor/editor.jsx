import React from 'react';
import ReactQuill from 'react-quill';
class Editor extends React.Component {
  constructor (props) {
    console.log('IN EDITOR CONSTRUCTOR');
    super(props);
    this.currentEditorNote = this.props.notes.find((note) => note.id === parseInt(this.props.match.params.noteId));
    this.handleChange = this.handleChange.bind(this);
    this.state = {editorHtml: this.currentEditorNote.body};
    this.autoSaveTimeoutId = null;
  }

  handleAutoSave()  {
    console.log('autosave!');
  }

  handleChange (html) {
    console.log(this.state);
    console.log('setting state for some reason');
    clearTimeout(this.autoSaveTimeoutId);
    this.autoSaveTimeoutId = setTimeout(() => this.handleAutoSave(), 1000);
    this.setState({editorHtml: html});
  }

  render () {
    console.log('RENDERING EDITOR');
    return (
      <div>
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
