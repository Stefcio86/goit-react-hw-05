import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../components/MovieList';
import styles from './MoviesPage.module.css'; 

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    const searchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMThiZWU5ZjRiYjVkNjFkZDUwNTAyMWM2Mzk3ODczZiIsIm5iZiI6MTcyNjc3MjcxNS45NzY2ODYsInN1YiI6IjY2ZTliMWE4NTE2OGE4OTZlMTFlZDYxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3gKuqEm-iEeBV354T5FzZWJpv4FHDDtPu2dwL0vtCIo',
            },
          }
        );
        setMovies(response.data.results);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError('Failed to find movies.');
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const queryValue = e.target.elements.query.value.trim();
    if (queryValue) {
      setSearchParams({ query: queryValue });
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="query" placeholder="Search Movies..." />
        <button type="submit">Search</button>
      </form>
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <p className={styles.noResults}>No results found.</p>
      )}
    </div>
  );
};
export default MoviesPage;
