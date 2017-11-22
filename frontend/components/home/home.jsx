import React from 'react';
import { Grid, Jumbotron, Col, Navbar, NavItem } from 'react-bootstrap';
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
        <Grid>
          <Navbar>
            <Col md={10}>
            <Navbar.Header>
              <img className='logo' src='assets/Evernote-logo.svg'></img>
            </Navbar.Header>
            </Col>
            <Col md={2}>
              <NavItem href='#/login'> Login </NavItem>
            </Col>
          </Navbar>
          <div className='splash-row'>
            <Col md={6}>
              <Jumbotron>
                <h1>Welcome to NeverBlank.</h1>
                <p>Capture, organize, and share notes from anywhere. Your best ideas are always with you and always in sync.</p>
              </Jumbotron>
            </Col>
            <Col md={1}>
              <div className="divider-wrapper">
                <div className="divider"></div>
              </div>
            </Col>
            <Col md={5}>
            <div className = "signup-form">
              <h2>Sign Up</h2>
                <form className = "signup-form-element">
                  <input placeholder='Email' className='signup-element' type="email" onChange={this.handleChange('email')}/>
                  <input placeholder='Password' className='signup-element' type="password" onChange={this.handleChange('password')}/>
                  <button className='signup-element signup-button' onClick ={this.handleSubmit}>Sign up for free</button>
                </form>
            </div>
            </Col>
          </div>
        </Grid>
      </div>
    );
  }
}

export default Home;
