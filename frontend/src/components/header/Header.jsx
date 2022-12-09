import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Header = (Props) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const logout = () => {
    setUser(null);
    setIsAdmin(null);
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  useEffect(() => {
    const userInfofromStorage = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null;
    if (userInfofromStorage) {
      console.log(userInfofromStorage, "headssdaldlsjadkasjlk");
      if (userInfofromStorage.isAdmin) {
        setIsAdmin(true);
      }
      setUser(userInfofromStorage.name);
    }
    console.log("useEffect", "user");
  }, [state?.name?.name, isAdmin]);
  console.log(user, "header");
  return (
    <>
      <Navbar bg="success" expand="lg" className="shadow">
        <Container>
          <Link to="/">
            <Navbar.Brand className="text-white">Quizz</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav  d-flex p-2">
            <Nav className="ml-auto ">
              <Link to="/">
                <Nav className="text-white mx-3 mt-2 text-center">Exam</Nav>
              </Link>
              {isAdmin ? (
                <>
                  <Link to="adminpanel">
                    <Nav className="text-white mx-3 mt-2 text-center">
                      Admin Panel
                    </Nav>
                  </Link>
                  <NavDropdown
                    title={user}
                    id="basic-nav-dropdown"
                    className="mt-auto"
                  >
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : user && !isAdmin ? (
                <>
                  <NavDropdown
                    title={user}
                    id="basic-nav-dropdown"
                    className="mt-auto"
                  >
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Link to="login">
                  <Nav className="text-white mx-3 mt-2 text-center">Login</Nav>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Header;
