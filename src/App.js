import React, { useEffect,useState} from 'react';
import { Row,Container, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import Navbar from './components/myNavbar.js';
// import SerachBar from './components/searchMovie.js';
import MovieCard from './components/movieCard.js';
import { ToastContainer } from 'react-toastify';

function App() {
  const [movies, setMovie] = useState([]);
  useEffect(() => {
    fetchMovie()
  },[])
  const api_key = '1d2c306bdbd50caa1c4dc11301c06f4c';
  const fetchMovie = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`)
    const json = await data.json()
    setMovie(json.results);
  }
  const keyUpHandle = async (that) => {
    console.log(that.keyCode)
    if (that.keyCode == "13") {
      let val = that.target.value
      searchMovie(val)
    }
  }

  const clickHandle = () => {
    let element = document.getElementById("search-input");
    searchMovie(element.value);
  }
  
  const searchMovie = async (val) => {
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${val}`)
    const json = await data.json()
    // console.log(json);
    setMovie(json.results);
  }
  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <Container>
        <Row className="mt-3 justify-content-center">
          <Col md={8}>
            <h1 className="text-center">Search Movie</h1>
            <InputGroup className="mb-3">
              <Button variant="dark" onClick={fetchMovie}>Back</Button>
              <FormControl
                placeholder="Venomm"
                onKeyUp={keyUpHandle.bind(this)}
                id="search-input"
              />
              <Button variant="outline-success" onClick={clickHandle} id="search-button">
                Search
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row id="movie-list">
          {/* <div id="movie-list"> */}
            {movies.map((movie,index) => (
            <Col md={4}>
              <MovieCard
                  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                  title={movie.original_title}
                  date={movie.release_date}
                  id={movie.id}
                  key={movie.id}
                  rating={movie.vote_average}
                  overview={movie.overview}
                  lang={movie.original_language}
                  />
            </Col>
            ))}
          {/* </div>  */}
        </Row>
      </Container>
    </div>
  );
}

export default App;
