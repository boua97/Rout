import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import NewMovieForm from './components/NewMovieForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetails from './components/MovieDetails';

import './App.css';


const App = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Hitman 2',
      posterURL: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/71lCYeODB6L._SL1324_.jpg',
      rating: 7.0,
      status: 'Released',
      description : 'Product Description, Make the world your weapon Become Agent 47 and dismantle the elusive Shadow Client is militia. Think deadly as you travel the globe to take down your targets in 6 new sandbox environments, improvise each assassination, and explore the franchises most advanced installment to date',
      trailerLink: 'https://www.youtube.com/embed/rjsKR759nQA'
    },
    {
      id: 2,
      title: 'The Godfather',
      posterURL: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/515EPW7MZHL._AC_UF894,1000_QL80_.jpg',
      rating: 8.0,
      status: 'Released',
      description : 'It is the first installment in The Godfather trilogy, chronicling the Corleone family under patriarch Vito Corleone (Brando) from 1945 to 1955. It focuses on the transformation of his youngest son, Michael Corleone (Pacino), from reluctant family outsider to ruthless mafia boss',
      trailerLink: 'https://www.youtube.com/embed/sY1S34973zA'
    },
    {
      id: 3,
      title: 'The Dark Knight',
      posterURL: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/61VhwmtnJvL._AC_UF894,1000_QL80_.jpg',
      rating: 9.0,
      status: 'Released',
      description : 'The Dark Knight is a 2008 superhero film directed by Christopher Nolan from a screenplay he co-wrote with his brother Jonathan. ',
      trailerLink: 'https://www.youtube.com/embed/EXeTwQWrcwY'
    }
  ]
  );
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    if (storedMovies) {
      setMovies(storedMovies);
    }else {
      setMovies([]);
    }
  }, []);


  
  const handleAddMovie = (movie) => {
    // Create a new movie object with a unique ID
    const newMovie = { ...movie, id: movies.length + 1, trailerLink: movie.trailerLink };
    setMovies(prevMovies => {
      const updatedMovies = [...prevMovies, newMovie];
      localStorage.setItem('movies', JSON.stringify(updatedMovies));
      return updatedMovies;
    });
  };
  

  useEffect(() => {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies) {
      // If movies already exist in the local storage, use them
      setMovies(JSON.parse(storedMovies));
    } else {
      // Otherwise, store the initial movies array in the local storage
      localStorage.setItem('movies', JSON.stringify(movies));
    }
  }, [movies]);
  

  return (
    <Router>
    <div className="app">
      <h1>Movie App</h1>
      <div className="center_position">
        <Filter
          onFilter={({ title, rating }) => {
            setTitleFilter(title);
            setRatingFilter(rating);
          }}
        />
        <NewMovieForm onAddMovie={handleAddMovie} />
      </div>
      <Routes>
        <Route exact path="/" element={
          <MovieList
            movies={movies.filter((movie) => {
              return (
                movie.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
                movie.rating >= ratingFilter
              );
            })}
          />
        } />
        <Route path="/movies/:id" element={<MovieDetails movies={movies} />} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;