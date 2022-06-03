import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Dropdown} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

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

function ShowUserInfo (props: {userInfo: {email?: string}, setUserInfo: any}) {
  let auth = localStorage.getItem('auth');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/', {replace: true});
    props.setUserInfo({});
  }

  if (auth && auth.length > 0) {
    if (props.userInfo && props.userInfo.email) {
      return (
        <>
          <Nav.Link as={Link} to={"/user"}> Login as: {props.userInfo.email} </Nav.Link>
          <Nav.Link as={Link} to={"/"} onClick={handleLogout}> ( Logout ) </Nav.Link>
        </>
      )
    } else {
      props.setUserInfo( {email: 'mafa@gmail.com'});
      return (<Nav.Link as={Link} to={"/"} onClick={handleLogout}> ( Logout ) </Nav.Link>)
    }
  } else {
    return (
      <Nav.Link as={Link} to={"/login"}> Login </Nav.Link>
    )
  }

}

function NavBar(props: MenuItemsInterface) {
  const [userInfo , setUserInfo] = useState({})
  return (
    <Navbar bg="dark" variant={"dark"} expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {"React-Bootstrap"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {props.items.map((navItem) => {
              if (navItem.dropDown && navItem.dropDown.length >= 1) {
                return (
                  <Dropdown>
                    <Dropdown.Toggle variant="dark">{navItem.title}</Dropdown.Toggle>
                    <Dropdown.Menu variant="dark">
                      {navItem.dropDown.map((dropDownItem) => {
                        return (
                          <Dropdown.Item key={dropDownItem.key} as={Link} to={"/" + dropDownItem.route} >
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
                    key={navItem.key}
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
            <ShowUserInfo userInfo={userInfo} setUserInfo={setUserInfo}/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
