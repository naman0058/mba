
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";

export default class API extends React.Component {


  state = {
    email:'',
    password:''

  }

   handleChange = (e) => {
    this.setState({email:e.target.value})
  };

  handleChange1 = (e) => {
    this.setState({password:e.target.value})
  };

  click = () =>{
  //  alert(this.state.password)


  var url = 'http://localhost:4000/check-password';
  var data = { email:this.state.email, password:this.state.password}
 
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .then((res) => res.json())
    .catch((error) => console.error('Error', error))
    .then((result) => {
  
      if (result.msg=='success') {
       
        alert('success')
      window.location.href = '/#/FormattedDocument'



      } else {
      
alert('invalid')

      }
    });


  }

render(){
  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
        
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Sign in to our platform</h3>
                </div>
                <Form className="mt-4">
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="email" value={this.state.email} onChange={this.handleChange} placeholder="example@company.com" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Your Password</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control required type="password" id='password' value={this.state.password} onChange={this.handleChange1} placeholder="Password" />
                      </InputGroup>
                    </Form.Group>
                    {/* <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
                        <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                      </Form.Check>
                      <Card.Link className="small text-end">Lost password?</Card.Link>
                    </div> */}
                  </Form.Group>
                  <Button variant="primary" type="button" onClick={this.click} className="w-100" id='submit'>
                    Sign in
                  </Button>
                </Form>

              
               
                {/* <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Not registered?
                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Create account `}
                    </Card.Link>
                  </span>
                </div> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}
  
};
