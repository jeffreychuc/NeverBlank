import React from 'react';

class Signin extends React.Component{
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
    console.log(this.props);
    event.preventDefault();
    this.props.login(this.state)
      .then(() => this.props.history.push('/')); //acts as redirect
  }

  render()  {
    return(
      <div className = "session-form">
        <h2>Sign In</h2>
          <form>
            <label>email: 
              <input type="email" onChange={this.handleChange('email')}/>
            </label>
            <label>password: 
              <input type="password" onChange={this.handleChange('password')}/>
            </label>
            <button onClick ={this.handleSubmit}>Sign In</button>
          </form>
      </div>
    );
  }
}

export default Signin;
