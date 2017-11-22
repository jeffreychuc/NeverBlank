import React from 'react';

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
      <div className='flexWrapper'>
        <div className='splashText'>
          <h2>Welcome to NeverBlank</h2>
        </div>
        <div class="divider-wrapper">
          <div class="divider"></div>
        </div>
        <div className = "signup-form">
          <h2>Sign Up</h2>
            <form className = "signup-form-element">
              <label>Email:
                <input className='signup-element' type="text" onChange={this.handleChange('email')}/>
              </label>
              <label>Password: 
                <input className='signup-element' type="password" onChange={this.handleChange('password')}/>
              </label>
              <button className='signup-element signup-button' onClick ={this.handleSubmit}>Sign up for free</button>
            </form>
        </div>
      </div>
    );
  }
}

export default Home;
