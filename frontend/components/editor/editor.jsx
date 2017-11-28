
import React from 'react';
import ReactQuill from 'react-quill';
// import striptags from 'striptags';

class Editor extends React.Component {
  constructor (props) {
    //console.log('IN EDITOR CONSTRUCTOR');
    super(props);
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
    //console.log('GOT NEW PROPS IN EDITOR');
    // debugger;
    // if (newProps.notes.new) {
    //   this.setState({editorHtml: {title: '', body: ''}});
    //   this.props.history.push('/home/notes/new');
    // }
    // if (this.props.notes) {
    //   if ((typeof this.props.notes['new'] === 'undefined') && newProps.notes['new'])  {
    //     this.setState({editorHtml: {title: '', body: ''}});
    //     this.props.history.push('/home/notes/new');
    //   }
    // }
    // if (this.props.match.params.noteId !== newProps.match.params.noteId)  {
    //   // if (this.state.editorHtml !== this.currentEditorNote.body)  {
    //   //   this.handleAutoSave(this.state, this.currentEditorNote.id);
    //   // }
    //   this.currentEditorNote = newProps.notes[parseInt(newProps.match.params.noteId)];
    //   this.setState({editorHtml: this.currentEditorNote.body});
    // }
  }

  render () {
    // debugger;
    return (
      <div>
        QUILL EDITOR
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
