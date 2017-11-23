import React from 'react';
import { Grid, Jumbotron, Col, Navbar, NavItem, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import { Link } from 'react-router';
import { logoLink } from '../assets';

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
      .then(() => this.props.history.push('/editor')); //acts as redirect
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
              <img className='logo' src={ logoLink }></img>
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
              <div className="dom-content-loaded">
                  <section className="register">
                      <div className="row">
                        <div className="container">
                          <div className="content">
                            <div className="heading-rotation-container">
                              <h2 className="rotator h1-like heading-1">Remember everything.</h2>
                              <h2 className="rotator h1-like heading-2">Get organized.</h2>
                              <h2 className="rotator h1-like heading-3">Succeed together.</h2>
                              <h1 className="rotator h1-like heading-4">
                              Be<br/>NeverBlank.
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                <p className ='subtext'>Capture, organize, and share notes from anywhere. Your best ideas are always with you and always in sync.</p>
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
                      placeholder="Password"
                      onChange={this.handleChange('password')}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                  <Button className='button-submit' onClick={this.handleSubmit} bsSize="large" block>Sign up for free</Button>
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
