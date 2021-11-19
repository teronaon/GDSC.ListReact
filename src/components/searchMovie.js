import { Col, InputGroup, Row, Button, Container,FormControl } from 'react-bootstrap';

const searchMovie = () => {
    return (
    <div>
      <Container>
          <Row className="mt-3 justify-content-center">
            <Col md={8}>
              <h1 className="text-center">Search Movie</h1>
              <InputGroup className="mb-3">
              <a href="/" className="btn btn-dark" id="kembali">Back</a>
              <FormControl
                placeholder="Venomm"
              />
              <Button variant="outline-success" id="search-button">
                Search
              </Button>
              </InputGroup>
            </Col>
          </Row>
      </Container>
    </div>
    );

}
export default searchMovie;