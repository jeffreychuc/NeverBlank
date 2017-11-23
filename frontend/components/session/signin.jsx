import React from 'react';
import { signinLogo } from '../assets';
import { Grid, Row, Col } from 'react-bootstrap';

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
    // document.body.style.backgroundColor = '#f3f3f3';
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
                <div className = 'signing-text'>
                  <h2>Sign In</h2>
                </div>
                </Col>
                <Row/>
                <div className = "session-form">
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
              </div>
            </div>
        </Grid>
      </div>
    );
  }
}

export default Signin;
