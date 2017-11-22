import React from 'react';
import { Grid, Jumbotron, Col, Navbar, NavItem, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
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

  getValidationStateEmail() {
    const email = this.state.email;
    const regex = require('regex-email');
    if (regex.test(email)) {
      console.log('email!');
      return 'success';
    }
    else {
      console.log('not email');
      return 'warning';
    } 
  }

  getValidationStatePassword() {
    const length = this.state.password.length;
    if (length >= 6) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  render()  {
    return(
      <div>
        <Grid>
          <Navbar className='navbar-fixed-top'>
            <Col md={10}>
            <Navbar.Header>
              <img className='logo' src='assets/Evernote-logo.svg'></img>
            </Navbar.Header>
            </Col>
            <Col md={2}>
              <NavItem className='navlink' href='#/signin'> Log in </NavItem>
            </Col>
          </Navbar>
          <div className='top-buffer' />
          <div className='splash-row'>
            <Col md={6}>
              <Jumbotron>
                <h1>Meet Evernote, your second brain.</h1>
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
              <h2>Sign Up for Free</h2>
                <Button className='button-demo' bsSize="large" block>Sign in Demo</Button>
                <div className="or-row">
                  <div className="or-line"></div>
                  <div className="or-text">Or</div>
                  <div className="or-line"></div>
                </div>
                <form className = "signup-form-element">
                <FormGroup controlId="formBasicText" validationState={this.getValidationStateEmail()}>
                    <FormControl
                      type="email"
                      value={this.state.email}
                      placeholder="Email"
                      onChange={this.handleChange('email')}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup controlId="formBasicText" validationState={this.getValidationStatePassword()}>
                    <FormControl
                      type="password"
                      value={this.state.password}
                      placeholder="password"
                      onChange={this.handleChange('password')}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                  <Button className='button-submit' bsSize="large" block>Sign up for free</Button>
                </form>
            </div>
            </Col>
          </div>
          <div className='ALOTOFROOM'>
            
          </div>
        </Grid>
      </div>
    );
  }
}

export default Home;
