import React from 'react';

class Signup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }
  
  handleChange(field)  {
    return (event) => (
      this.setState({[field]: event.target.value})
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createNewUser(this.state)
      .then(() => this.props.history.push('/')); //acts as redirect
  }

  render()  {
    return(
      <div className = "session-form">
        <h2>Sign Up</h2>
          <form onSubmit={this.handleSubmit}>
            <label>email: 
              <input type="text" onChange={this.handleChange('email')}/>
            </label>
            <label>password: 
              <input type="password" onChange={this.handleChange('password')}/>
            </label>
          </form>
      </div>
    );
  }
}

export default Signup;
