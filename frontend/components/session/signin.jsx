import React from 'react';
import { signinLogo } from '../assets';
import { Grid, Jumbotron, Col, Row, Navbar, NavItem, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

class Signin extends React.Component{
  constructor(props) {
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
   
    event.preventDefault();
    this.props.login(this.state)
      .then(() => this.props.history.push('/home/notes')); //acts as redirect
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
     
      return 'success';
    }
    else {
     
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
   
   
    this.simType('demo@app-academy.io', 'email');
    this.simType('gibjobpls', 'password');
    this.demoLogin = setTimeout(this.handleDemoLogin, 2000);
  }

  simType (input, field) {
    let chars = input.split('');
    let finChars = "";
   
    let i = 0;
    let typeAction = setInterval(() => { 
      finChars+=chars[i++];
      this.setState({[field]: finChars});
     
      if (i === chars.length) { 
        clearInterval(typeAction);  
      } 
    }, 80); 
  }

  handleDemoLogin() {
    this.props.loginDemo().then(() => this.props.history.push('/home/notes'));
  }


  renderSignInForm () {
    return (
      <div className = "single-session-form">
        <div className = "signin-form">
          <Button className='sign-in-button-top' onClick={this.handleDemo} bsSize="large" block>Sign in Demo</Button>
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
                placeholder="Email"
                onChange={this.handleChange('email')}
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="formBasicText" validationState={this.getValidationStatePassword()}>
              <FormControl
                type="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.handleChange('password')}
              />
              <FormControl.Feedback />
            </FormGroup>
            <Button className='button-submit' type="submit" onClick={this.handleSubmit} bsSize="large" block>Continue</Button>
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
                <h2>Sign In</h2>
                {this.renderSignInForm()}
              </div>
            </div>
            <div className = 'sign-in-bottom-text'>
            <p>Don't have an account? <br/> </p>
            <a href='#/signup'> Create Account </a>
            </div>
        </Grid>
      </div>
    );
  }
}

export default Signin;
