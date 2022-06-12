import styles from "./style.module.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DataServices from '../../services/dataServices';
import { useState, memo } from "react";
import { ApiRespond } from "../../models/apiRequestModels";
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    DataServices.register({email: email, password: password, phoneNumber: phoneNumber, gender: gender}).then((res: ApiRespond) => {
      if (!res.Success || !res.Data || !res.Data.token || !res.Data.email) {
        setMsg(res.Errors + ' Email or Password is increact!  ');
        return ;
      } 
      localStorage.setItem('auth', res.Data.token);
      localStorage.setItem('email', res.Data.email);
      setMsg('Login Successfuly.');
      navigate('/', {replace: true})
    });
  }

  return (
    <Container className={styles.divMain}>
        <h1>Register</h1>
        <Form className={styles.loginForm} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e:any) => setEmail(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e:any) => setPassword(e.target.value)}/>
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Repeat Password</Form.Label>
            <Form.Control type="password" placeholder="Repeat Password" onChange={(e:any) => setPasswordRepeat(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control placeholder="Phone Number" onChange={(e:any) => setPhoneNumber(e.target.value)}/>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Control placeholder="Gender" onChange={(e:any) => setGender(e.target.value)}/>
          </Form.Group>

          <p className={styles.pForm}>{msg}</p>

          <div className={styles.buttonLogin}>
            <Button variant="success" type="submit">
              Sign Up
            </Button>
          </div>

          <div className={styles.divider}></div>
          <Link to="/register" className={styles.pForm} >Already have an account? Login from here.</Link>
        </Form>
    </Container>
  );
}

export default memo(Register);
