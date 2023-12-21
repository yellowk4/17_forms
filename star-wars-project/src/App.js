import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useCallback을 사용하면 함수가 새로 생성되는 것을 방지할 수 있다.
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    // async/await로 작성시 try/catch문으로 에러처리
    try {
      const response = await fetch(
        'https://react-mini-project-658c7-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json'
      ); //https://swapi.dev/api/films/
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      // 내일 할 차례
      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      // const transformedMovies = data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]); // 컴포넌트가 재 렌더링 될 때마다 fetchMoviesHandler가 새로 생성된다.

  //try catch문으로 에러처리 생략
  async function addMovieHandler(movie) {
    console.log(movie);

    const response = await fetch(
      'https://react-mini-project-658c7-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const data = await response.json();
    // console.log('data : ', data);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
