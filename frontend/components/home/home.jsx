import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component{
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
    this.props.createNewUser(this.state)
      .then(() => this.props.history.push('/')); //acts as redirect
  }

  render()  {
    return(
      <div>
        <div className='flexWrapper'>
          <div className='top'>
            <img className='logo' src='assets/Evernote-logo.svg'></img>
            <a className='login-link' href='/#/signin'>Login</a>
          </div>
          <div className='splash-row'>
            <div className='splashText'>
              <h2>Welcome to NeverBlank</h2>
            </div>
            <div className="divider-wrapper">
              <div className="divider"></div>
            </div>
            <div className = "signup-form">
              <h2>Sign Up</h2>
                <form className = "signup-form-element">
                  <input placeholder='Email' className='signup-element' type="email" onChange={this.handleChange('email')}/>
                  <input placeholder='Password' className='signup-element' type="password" onChange={this.handleChange('password')}/>
                  <button className='signup-element signup-button' onClick ={this.handleSubmit}>Sign up for free</button>
                </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
