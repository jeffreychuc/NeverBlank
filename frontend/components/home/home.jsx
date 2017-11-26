import React from 'react';
import NotesContainer from '../notes/notes_container';
import NavSidebarContainer from '../nav/nav_sidebar_container';
import EditorContainer from '../editor/editor_container';

class Home extends React.Component  {
  constructor (props)  {
    super(props);
  }

  componentDidMount() {
    // fetches notes then sets active note to first note in list.
    this.props.fetchNotes().then(() => this.props.history.push(`/home/notes/${this.props.state.entities.notes[0].id}`));
  }


  render()  {
    if (this.props.state.entities.notes)  {
      console.log('notes loaded, rendering home view');
      console.log(this.props.state.entities.notes);
      return (
        <div className = 'main-view'>
          <NavSidebarContainer />
          <div className = 'notes-sidebar'>
            <NotesContainer notes={this.props.state.entities.notes} />
          </div>
          <div className = 'editor-main'>
            <EditorContainer notes={this.props.state.entities.notes} placeholder={'Drag files here or just start typing...'}/>
          </div>
        </div>
      );
    }
    else  {
      console.log('notes still loading, skipping render');
      return null;
    }
  }
}

export default Home;

// {/* <Button className='logout' onClick={this.handleLogout.bind(this)} block>Logout</Button> */}
