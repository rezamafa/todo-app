import styles from "./style.module.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DataServices from '../../services/dataServices';
import { useState } from "react";
import { ApiRespond } from "../../models/apiRequestModels";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    DataServices.login({email: email, password: password}).then((res: ApiRespond) => {
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
        <h1>Login</h1>
        <Form className={styles.loginForm} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e:any) => setEmail(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e:any) => setPassword(e.target.value)}/>
          </Form.Group>

          <p className={styles.pForm}>{msg}</p>

          <div className={styles.buttonLogin}>
            <Button variant="success" type="submit">
              Sign in
            </Button>
          </div>

          <div className={styles.divider}></div>

          <p><Link to="/forgot-password" className={styles.pForm}  >Forget your Password? click here.</Link></p>
          <p><Link to="/register" className={styles.pForm}  >Don't have any account? go to register page.</Link></p>
        </Form>
    </Container>
  );
}

export default Login;
