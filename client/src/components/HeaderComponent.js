import { Container, Nav, Navbar, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HeaderComponent.css";
import clockImage from "../assets/clockImage.png";
import { useSelector } from "react-redux";
const HeaderComponent = () => {
  var headerbarShow = useSelector((state) => state.headerbarShow);
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="sm"
        className="color-nav"
        variant="light"
        style={{ display: ` ${headerbarShow}` }}
      >
        <Container>
          <Navbar.Brand href="#home">
            <div className="d-flex">
              <img
                alt=""
                src={clockImage}
                width="100px"
                height="40px"
                className="d-inline-block align-top"
              />
              <h2>UCM Appointment Scheduler</h2>
            </div>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="navbarScroll"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="justify-content-end" style={{ width: "100%" }}>
              <NavLink eventKey="1" as={Link} to="/home">
                HOME
              </NavLink>
              <NavLink eventKey="2" as={Link} to="/login">
                LOGIN
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderComponent;
