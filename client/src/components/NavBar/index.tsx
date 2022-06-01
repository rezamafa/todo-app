import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Dropdown} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

/*
                  <NavDropdown
                    id="collasible-nav-dropdown"
                    key={navItemCount}
                    title={navItem.title}
                  >
                    {navItem.dropDown.map((dropDownItem) => {
                      navItemCount += 1;
                      return (
                        <NavDropdown.Item
                          style={{backgroundColor: 'rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))',color: 'white'}}
                          key={navItemCount}
                          as={Link}
                          to={"/" + dropDownItem.route}
                        >
                          {dropDownItem.title}
                        </NavDropdown.Item>
                      );
                    })}
                  </NavDropdown>
*/


interface MenuItemsInterface {
  items: [
    {
      title: string;
      route: string;
      dropDown?: [
        {
          title: string;
          route: string;
        }
      ];
    }
  ],
  userInfo?: {
    email?: string
  }
}

function UserLoggedIn (props: MenuItemsInterface) {
  const navigate = useNavigate();
  if (props.userInfo && props.userInfo.email) {
    return (
      <>
        <Nav.Link as={Link} to={"/user"}> Login as: {props.userInfo.email} </Nav.Link>
        <Nav.Link as={Link} to={"/"} onClick={(e) => {navigate('/', {replace: true})}}> ( Logout ) </Nav.Link>
      </>
    )
  } else {
    return (
      <Nav.Link as={Link} to={"/login"}> Login </Nav.Link>
    )
  }

}

function NavBar(props: MenuItemsInterface) {
  let navItemCount = 0;
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
                navItemCount += 1;
                return (
                  <Dropdown>
                    <Dropdown.Toggle variant="dark">{navItem.title}</Dropdown.Toggle>
                    <Dropdown.Menu variant="dark">
                      {navItem.dropDown.map((dropDownItem) => {
                        navItemCount += 1;
                        return (
                          <Dropdown.Item key={navItemCount} as={Link} to={"/" + dropDownItem.route} >
                           {dropDownItem.title}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                );
              } else {
                navItemCount += 1;
                return (
                  <Nav.Link
                    key={navItemCount}
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
            <UserLoggedIn items={props.items} userInfo={props.userInfo}></UserLoggedIn>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
