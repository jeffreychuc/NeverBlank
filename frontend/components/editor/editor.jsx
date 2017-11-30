import React from 'react';
import ReactQuill from 'react-quill';
// import striptags from 'striptags';

class Editor extends React.Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {title: '', editorHtml: this.props.note['body'], id: this.props.note['id']};
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
    debugger;
  }

  handleSave(editorState)  {
    debugger;
    const { title, editorHtml, id } = editorState;
    if (id === 'new') {
      this.props.createNotes({
        body: editorHtml,
        bodypreview: this.stripTags(editorHtml).substring(0, 200)
      }).then((action) => this.props.history.push(
        this.props.match.path.split('/').slice(0,this.props.match.path.split('/').length-1).join('/')
        + '/'
        + action.notes.ordered.updated_at_desc[0]));
    }
    else  {
      this.props.saveNotes({
        body: editorHtml,
        bodypreview: this.stripTags(editorHtml).substring(0, 200),
        id: id
      });
    }
  }

  handleChange (html) {
    debugger;
    clearTimeout(this.autoSaveTimeoutId);
    this.setState({editorHtml: html});
    if (this.props.note.body !== this.state.editorHtml) {
      this.autoSaveTimeoutId = setTimeout(() => this.handleSave(this.state), 1000);
    }
  }


  componentWillReceiveProps(newProps) {
    debugger;
    if (this.props.match.params.noteId !== newProps.match.params.noteId)  {
      // this.handleSave(this.state);
      // causes double save
      let editorBody;
      let noteId;
      if (newProps.match.params.noteId === 'new') {
        editorBody = '';
        noteId = 'new';
      }
      else  {
        editorBody = newProps.note.body;
        noteId = newProps.note['id'];
      }
      this.setState({editorHtml: editorBody, id: noteId});
    }
  }

  render () {
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
