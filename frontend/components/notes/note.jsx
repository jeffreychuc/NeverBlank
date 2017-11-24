import React from 'react';

class Note extends React.Component  {
  constructor (props)  {
    super(props);
    console.log("IN NOTE CONSTRUCTOR");
    console.log(props);
  }

  render()  {
    return (
      <div>
        <h2> Note Container </h2>
      </div>
    );
  }
}

export default Note;
