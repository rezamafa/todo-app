import styles from "./loginStyle.module.scss";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DataServices from '../../services/dataServices';
import { useState } from "react";
import { ApiRespond } from "../../models/apiRequestModels";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    DataServices.login({email: email, password: password}).then((res: ApiRespond) => {
      if (!res.Success || !res.Data || !res.Data.token) {
        setMsg(res.Errors + ' Email or Password is increact!  ');
        return 
      } 
      setMsg('Login Successfuly.');
      localStorage.setItem('auth', res.Data.token);
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
          <p className={styles.pForm}>Forget your Password? click here.</p>
          <p className={styles.pForm}>
            Don't have any account? go to register page.
          </p>
        </Form>
    </Container>
  );
}

export default Login;
