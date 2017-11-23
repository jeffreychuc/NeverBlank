import React from 'react';
import { signinLogo } from '../assets';
import { Grid, Jumbotron, Col, Row, Navbar, NavItem, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

class Signup extends React.Component{
  constructor(props) {
    console.log('SIGNUPCONSTRUCTOR');
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
    this.handleDemoLogin = this.handleDemoLogin.bind(this);
    this.simType = this.simType.bind(this);
  }

  componentWillMount(){
    document.body.style.backgroundColor = '#f3f3f3';
  }

  componentWillUnmount()  {
    this.props.clearErrors();
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
      .then(() => this.props.history.push('/editor')); //acts as redirect
  }

  renderTopBar () {
    return (
      <div className = 'logoBar'/>
    );
  }

  renderLogo()  {
    return (
      <div className = 'signin-logo'>
        <img src={signinLogo}></img>
      </div>
    );
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

  renderErrors()  {
    console.log(this.props, 'in render errors');
    if (this.props.errors.session.constructor === Array)  {
      return (
        this.props.errors.session.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))
      );
    }
  }

  clearTimer() {
    if (this.demoLogin) {
      clearTimeout(this.demoLogin);
      this.demoLogin = null;
    }
  }

  handleDemo(event) {
    console.log("logging in as demo?");
    console.log(this);
    this.simType('demo@app-academy.io', 'email');
    this.simType('gibjobpls', 'password');
    this.demoLogin = setTimeout(this.handleDemoLogin, 2000);
  }

  simType (input, field) {
    let chars = input.split('');
    let finChars = "";
    console.log(chars);
    let i = 0;
    let typeAction = setInterval(() => { 
      finChars+=chars[i++];
      this.setState({[field]: finChars});
      console.log(finChars);
      if (i === chars.length) { 
        clearInterval(typeAction);  
      } 
    }, 80); 
  }

  handleDemoLogin() {
    this.props.loginDemo().then(() => this.props.history.push('/editor'));
  }


  renderSignInForm () {
    return (
      <div className = "single-session-form">
        <div className = "signin-form">
          <Button className='sign-in-button-top' onClick={this.handleDemo} bsSize="large" block>Sign up Demo</Button>
          <div className="or-row">
            <div className="or-line"></div>
            <div className="or-text">or</div>
            <div className="or-line"></div>
          </div>
          <form className = "signin-form-element">
          <FormGroup controlId="formBasicText" validationState={this.getValidationStateEmail()}>
              <FormControl
                type="email"
                value={this.state.email}
                placeholder="Your Email Address"
                onChange={this.handleChange('email')}
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="formBasicText" validationState={this.getValidationStatePassword()}>
              <FormControl
                type="password"
                value={this.state.password}
                placeholder="Create a password"
                onChange={this.handleChange('password')}
              />
              <FormControl.Feedback />
            </FormGroup>
            <Button className='button-submit' type="submit" onClick={this.handleSubmit} bsSize="large" block>Create Account</Button>
            <div className ='session-error-container'>
              <ul className = 'session-error'>
                {this.renderErrors()}
              </ul>
            </div>
          </form>
        </div>
      </div>
    );
  }

  render()  {
    return(
      <div>
        {this.renderTopBar()}
        <Grid>
            <div className='signin-page'>
              <div>
                <Col md={12}>
                  {this.renderLogo()}
                </Col>
                <Col md={12}>
                </Col>
                <Row/>
                <h2>Sign Up</h2>
                {this.renderSignInForm()}
              </div>
            </div>
            <div className = 'sign-in-bottom-text'>
            <p>Already have an account?<br/></p>
            <a href='#/signin'> Sign in </a>
            </div>
        </Grid>
      </div>
    );
  }
}

export default Signup;
