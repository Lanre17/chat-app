import React from "react";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Notifications from "./Chat/Notifications";


function Navigation() {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img src={logo} style={{ width: 50, height: 50 }} />
          </Navbar.Brand>
        </LinkContainer>
     
        {user && <span className="text-warning">Logged in as {user.name}</span>}
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="ms-auto">
          {!user && (
            <>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/register">
                <Nav.Link>Register</Nav.Link>
              </LinkContainer>
            </>
          )}
           
           {user && (
              <>
                <Notifications />
                <Link to="/">
                  <Button
                    onClick={() => logoutUser()}
                    to="/login"
                    className="btn-outline-primary"
                    style={{ color: "white" }}
                  >
                    Logout
                  </Button>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
