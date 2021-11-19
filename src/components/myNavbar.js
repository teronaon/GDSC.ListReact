import {Navbar, Container, Nav } from 'react-bootstrap';

const myNavbar = () => {
    return (
        <div>
      <Navbar bg="dark" expaind="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#">Mupilis</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Search Movie</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
    );

}
export default myNavbar;