import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";
import { AppContext } from "./libs/contextLib";
import { Link, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import Routes from "./Routes";
import "./App.css";


function App() {
  const history = useHistory();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  
  useEffect(() => {
  onLoad();
  }, []);

  async function onLoad() {
  try {
    await Auth.currentSession();
    userHasAuthenticated(true);
  }
  catch(e) {
    if (e !== 'No current user') {
      onError(e);
    }
  }

   setIsAuthenticating(false);
  }

  async function handleLogout() {
  await Auth.signOut();

  userHasAuthenticated(false);
  
  history.push("/login");
  }
  return (
  !isAuthenticating &&
  <div className="App container">
    <Navbar fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">TagStore</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to="/imageUpload">
            <NavItem>Image Upload</NavItem>
          </LinkContainer>
          <LinkContainer to="/search">
            <NavItem>Search</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          {isAuthenticated
            ? <NavItem onClick={handleLogout}>Logout</NavItem>
            : <>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <AppContext.Provider
      value={{ isAuthenticated, userHasAuthenticated }}
    >
      <Routes />
    </AppContext.Provider>
  </div>
);
}

export default App;