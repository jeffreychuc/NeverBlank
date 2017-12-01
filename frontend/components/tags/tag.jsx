import React from 'react';
import shortid from 'shortid';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { isEqual } from 'underscore';
import merge from 'lodash/merge';

class Tag extends React.Component  {
  constructor (props)  {
    super(props);
    this.state = {tagName: this.props.tag.name, tagId: this.props.tag.id, count: this.props.count};
    // debugger;
  }

  componentWillReceiveProps(newProps) {
    if (!isEqual(this.state, newProps)) {
      this.setState({tagName: newProps.tag.name, tagId: newProps.tag.id, count: newProps.count});
    }
  }

  handleTagDelete(id)  {

  }

  render()  {
    console.log('in tag render');
    // debugger;
    return (
        <div key={shortid()}>
          <h2>{this.state.tagName}</h2>
          <p>{this.state.count}</p>
        </div>
    );
  }
}

export default Tag;
