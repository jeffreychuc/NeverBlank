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
    this.props.login(this.state)
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

  renderSignInForm () {
    return (
      <div className = "signin-form">
        <h2>Sign In</h2>
        <Button className='button-demo' onClick={this.handleDemo} bsSize="large" block>Sign in Demo</Button>
        <div className="or-row">
          <div className="or-line"></div>
          <div className="or-text">Or</div>
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
          <Button className='button-submit' onClick={this.handleSubmit} bsSize="large" block>Sign In</Button>
          <div className ='session-error-container'>
            <ul className = 'session-error'>
              {this.renderErrors()}
            </ul>
          </div>
        </form>
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
                  {this.renderSignInForm()}
              </div>
              <ul>
              
              </ul>
            </div>
        </Grid>
      </div>
    );
  }
}

export default Signin;
