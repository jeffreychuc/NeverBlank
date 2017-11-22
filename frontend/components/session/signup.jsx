import React from 'react';

class Signup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
          <form>
            <label>email: 
              <input type="text" onChange={this.handleChange('email')}/>
            </label>
            <label>password: 
              <input type="password" onChange={this.handleChange('password')}/>
            </label>
            <button onClick ={this.handleSubmit}>Sign Up</button>
          </form>
      </div>
    );
  }
}

export default Signup;
