import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Dropdown} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface MenuItemsInterface {
  items: [
    {
      key: number;
      title: string;
      route: string;
      dropDown?: [
        {  
          key: number;
          title: string;
          route: string;
        }
      ];
    }
  ]
}

function ShowUserInfo (props: {userInfo: {email?: string}, handleUserInfo: Function}) {

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/', {replace: true});
    props.handleUserInfo({});
  }

  if (!props.userInfo || !props.userInfo.email) return (
    <>
      <Nav.Link as={Link} to={"/login"}> Login </Nav.Link>
      <Nav.Link as={Link} to={"/register"}>/ Register </Nav.Link>
    </>
  ) 
  
  return (
    <>
      <Nav.Link as={Link} to={"/user"}> Login as: {props.userInfo.email} </Nav.Link>
      <Nav.Link as={Link} to={"/"} onClick={handleLogout}> ( Logout ) </Nav.Link>
    </>
  )
}

function NavBar(props: MenuItemsInterface) {
  const [userInfo , setUserInfo] = useState({});
  const handleUserInfo = (input: {}) => setUserInfo(input);
  const navigate = useNavigate();

  useEffect(() => {
    let auth = localStorage.getItem('auth');
    let userEmail = localStorage.getItem('email');
    if (!auth || auth.length < 10 || !userEmail || userEmail.length < 3) return ;
    setUserInfo({email: userEmail});
  }, [navigate]);

  return (
    <Navbar bg="dark" variant={"dark"} expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {"React-Bootstrap"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {props.items.map((navItem, key:number) => {
              if (navItem.dropDown && navItem.dropDown.length >= 1) {
                return (
                  <Dropdown key={key}>
                    <Dropdown.Toggle variant="dark">{navItem.title}</Dropdown.Toggle>
                    <Dropdown.Menu variant="dark">
                      {navItem.dropDown.map((dropDownItem, key:number) => {
                        return (
                          <Dropdown.Item key={key} as={Link} to={"/" + dropDownItem.route} >
                           {dropDownItem.title}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                );
              } else {
                return (
                  <Nav.Link
                    key={key}
                    as={Link}
                    to={"/" + navItem.route}
                  >
                    {navItem.title}
                  </Nav.Link>
                );
              }
            })}
          </Nav>
          <Nav>
            <ShowUserInfo userInfo={userInfo} handleUserInfo={handleUserInfo}/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
