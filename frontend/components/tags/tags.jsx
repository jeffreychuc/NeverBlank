import React from 'react';
import shortid from 'shortid';
import Tag from './tag';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { isEqual, isEmpty } from 'underscore';
import merge from 'lodash/merge';

class Tags extends React.Component  {
  constructor (props)  {
    super(props);
    this.state = {tagSlider: false, tagAddModal: false, tagDeleteModal: false};
    this.renderTagAddModal = this.renderTagAddModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getTags();
    // if ('noteId' in  this.props.match.params && this.props.match.params.noteId !== 'new') {
    //   this.props.getAllTagsForNote(this.props.match.params.noteId);
    // }

  }

  componentWillReceiveProps(newProps) {

    if (!isEqual(this.state.userTags, newProps.userTags)) {
      if (('userTags' in  newProps) && ('by_id' in newProps.userTags))  {
        this.setState({userTags: Object.values(newProps.userTags.by_id), tagCounts: Object.values(newProps.userTags.counts), tagSlider: newProps.tagSlider});
      }
    }
  }

  handleDelete(id)  {
    //delete the note, then push
    //
  }

  toggleDeleteModal() {
    this.setState({tagSlider: !this.state.tagSlider});
  }

  handleSubmit()  {
    return null;
  }

  renderTagAddModal() {
    if (this.state.tagAddModal)  {
      return (
        <div className = {!this.state.tagAddModal ? 'tag-add-modal active' : 'tag-add-modal'}>
          <div className='modalform tag-add-modal-form notebookDeleteModal'>
            <div className = 'tag-add-modal-form-header'>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABICAYAAABhlHJbAAADtklEQVR42u2cS2gUQRCGI5H4AkVRND5QwedJUcEHXhQRieghBw+CIIoHD6sRxYOXCB496MGDBzEYdpPsZKLC6h5ycJFoAhIiiaiIGAiI4osoSwhKzPoXjmEcapKZ3UlmZ/cvKNhMz3RXf13dVd1kpqKCQqFQKBQKZUySyeSR1tbWDugQNGua5iNcO0QyE4hhGFUAdgea0xQgb+CeSpLS4c0DpHY3eDa9m0qlZpOYTdra2qoBpscDvH+e+ATAF5DcX89bDyj9CqiXALUB5Vvxe0CB+ArgV5Y7vJ2A8UWB15FIJObbPHQ5rvUq971vaWnZVK7wDltR1ulZJspmuayRGQXid0ToPeWWppxCx0f8RlmJ0rgnqUD8KalPWcBDZy8rAEYB4JKX53O53DTcf02rA1pXylO2Et5zS+n4L5Qdz2MgzlvQnF58VSCXFDzJ29C5lAIvC3gHChiUozJ9lXrjMt1LxfMWwSu6lE5+wvVtAayn+ySQKPW3x+PxuVGHtxqQ3iide4uyNQG2sxl1flDa6UHZkkjCQ362BR34qKxRz8Qrg26vubl5Fep/rUDshy3rohZp90N/KJ1JNzY2zpmsdpuamhaijadKu58BcUdUpu0xl4X9diaTmT5FAeu+0v4QbDtY7J53UUstoFe8phbWkVYM2ilR2lL5HfMaWSVlwv03FTtGUHayWHO86y4Gn/ZxKiN73r5xTmL65B4fA1qvDKj8XV808NLp9AwYZGhTBlrrYxCqJoA3BlHa9JHmnNC2jeKhoR/OygYfnvdYMe4bynb7nP4xr+eBgHLGZ65Y43JwcS+0w1nxAjnYVDo4gIi3MY/1s9MZseWg1TpsTTs63uW3fjyzXaKxlhmE4okY1QuKMb0wZlmeAShrr0vA2dbGaucWMJ82AHEtnn2n2B0LI+I+dxiRkSldQH2uAJEkrwgCoJUrLsbz3Y76usMAOGw3wn6CnKd3dGlT2IJX8BR27FqWOtoaDgPgf9MggPo8BxF4+tlisz90A7ymMfC+Fw0NDTMJ0CWRFkDjwfOTSJcdQBHxLpmi1pqYtf61Q37XBeF5JQ+wbOwnQAIkQAIkQAIkQAIkQAIkQAIkwJIF6PWMb7KUAAmQAAmQQYQACZAACZAACZA7EaYxBEiABMidCIMIARIgARIgARIgAYYLcNDx9lBNFMBZH62odQAcDANgOuwkOUB9MOUADcPY6/Jqa9R01O97fYGJ9bpXlCH+Rh/OhbqmyGeXTNN86FwTi1y/ymf0oLsK7f8f4Q8YIsQL/xYAAAAASUVORK5CYII=" width="40" height="36" />
              <h2>CREATE TAG</h2>
            </div>
            <div className = 'modalformheader notebookCreateModalFormHeaderBottom'/>
            <form onSubmit ={this.handleSubmit}>
              <input type="text" ref="newtagname" placeholder="Name your tag"/>
              <div className = 'modalformbuttons tagcreateformbuttons'>
                <Button onClick={() => this.props.setTagSidebarVisibility()}>Cancel</Button>
                <Button type="submit">Create Tag</Button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }

  renderTagDeleteModal() {
    if (this.state.tagDeleteModal) {
      return (
        <div className='notebookDeleteModal'>
          <img className="gwt-Image" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAjCAYAAADmOUiuAAACbElEQVR42u2XP2gTURzHg5aKQ5dSig5OtlgcstgidnAyWC2YRVPEwUVS0cGpRlwylVQcHEohggGH5nJ3uaQd5CCBgmJTSEDQoYiBDkFMIYKgg0iVxt+Tb8ur3jtyd+8Fhxw8km/uvd/v877vb0Kh3tN7/n3y+XyUyjaVdoeF1Y12E9AL3D5kNwH/JFVVvwfYFUAKWPExz/yWyv8O+DqQm6Zp3kOgJ0FHxrKsRRaLPu9KG27DMG4C8LmEqbOMWDekAZKDVxB0lduo2/T7ig/AF3DwskwHzwPoFdOFQmFPv/QxxOvo7KQ0QE3Twgj6DknCcOGtDwc30bnT0gBzudwJADactEfAT6wtjcJxaYCZTGYAQN/+0l99AH6Hg0dlb9w/qewmk8k+XlOiw53GsG37CDr2Q/rxRiCfWXCaj0MAbPG6wxjHlN1sKGidBc9ms6NumiBGXFbwGADfq3CwxoLruj4BoKqbFsQ4B8ANFYBlFrxYLEYAVHLSVC/iMgqXAGirADSx98UwXDqv6bvBNG3qMZchvg5ATQXgUwDFcbqkkWwWgGn+vcDBO2izJB2QgB4heALAKV4T2AEtAHyIOvMqHHwAh1JIdh/JFtCBBK8FgI8xT+ekAxLYbQCkARx304JOPkOdW9IB6eycgYM63LiGZIaTFgBacPCqCgcvAqCEZBEkK/N6770AcA0r/YIKwLMAqEKPA7DGNNugeS0AfIM6Z1QsklMY4g/QIwCuO2nBItnCaXNSOiCdGMMAaAXo5Bc4OKjCwX4A7vhpT9e0Q9T2l9crmtcbzUcJ/4EbIVUP9XyKEjQDwDUpxrSXnL8BI9Tv3UAALyAAAAAASUVORK5CYII=" width="40" height="35"/>
          <h2>DELETE TAG</h2>
          <div className = 'notebookEditModal-seperator'/>
          <h2>Are you sure you want to delete <strong>{}</strong>?</h2>
          <div className = 'notebookDeleteModalButtons'>
            <Button onClick={() => this.toggleDeleteModal()}>Cancel</Button>
            <Button onClick={()=> this.handleTagDelete()} type="button">Delete</Button>
          </div>
        </div>
      );
    }
  }

  handleTagDelete(id)  {

  }

  render()  {

    if (isEmpty(this.props.userTags))  {
      return null;
    }
    else  {

      return (
        <div>
        {this.renderTagAddModal()}
        {this.renderTagDeleteModal()}
        <div className={this.props.tagSlider ? 'tag-slider slideable slide-hide' : 'tag-slider slideable'}>
        {this.props.userTags.ordered ? this.props.userTags.ordered.map((tagPair) => (
          <div key={shortid()}>
            <h2>{tagPair[0][0]}</h2>
            <div>
              {tagPair[1].map((tag) => (<Tag key={shortid()} tag={tag} count={this.state.tagCounts[tag.id]}/>))}
            </div>
          </div>
        )): null }
        </div>
        </div>
      );
    }
  }
}

export default Tags;

// {tagPair[1].map((tag) => (
//   <Tag key={shortid()} tagDelete={null} tagPatch={null} tag={tag}/>
// ))}
