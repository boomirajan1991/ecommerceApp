import React, { useEffect } from "react";
import {
  Container,
  Button,
  Offcanvas,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { ConstantName } from "../Constants/constant";
import {
  setLogout,
} from "../features/settings/settingSlice";
import { useDispatch } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const logout = () => {
    dispatch(setLogout());
    navigate("/login");
    return;
  };
  useEffect(() => {
    console.log("header");
    (token === null || token === undefined || token === "") &&
      navigate("./login");
  }, [dispatch, navigate, token]);
  return (
    <div>
      {["md"].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand>
              <b>Ecommerce admin</b>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  {ConstantName.Offcanvas}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavDropdown
                    title={user ? user.usertype : ""}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item className="header-nav-link nav-font-size">
                      {user ? user.username : ""}
                    </NavDropdown.Item>
                    <NavDropdown.Item className="header-nav-link nav-font-size">
                      {user ? user.email : ""}
                    </NavDropdown.Item>
                    <NavDropdown.Item className="header-nav-link nav-font-size">
                      {user ? user.phonenumber : ""}
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Link className="header-nav-link" to="dashboard">
                    {ConstantName.Dashboard}
                  </Link>
                  <Link className="header-nav-link" to="product">
                    {ConstantName.Product}
                  </Link>
                  <Link className="header-nav-link" to="category">
                    {ConstantName.Category}
                  </Link>
                  <Link className="header-nav-link" to="brand">
                    {ConstantName.Brand}
                  </Link>
                  <Link className="header-nav-link" to="coupon">
                    {ConstantName.Coupon}
                  </Link>
                  <Link className="header-nav-link" to="profile">
                    {ConstantName.Profile}
                  </Link>
                  <Link className="header-nav-link" to="settings">
                    {ConstantName.Settings}
                  </Link>
                </Nav>
                <Button variant="outline-success" onClick={() => logout()}>
                  {ConstantName.Logout}
                </Button>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
};

export default Header;
