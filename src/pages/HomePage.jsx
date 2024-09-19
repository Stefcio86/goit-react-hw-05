import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';
import styles from './HomePage.module.css'; 

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/trending/movie/week',
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

    fetchMovies();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Trending Movies</h1>
      <MovieList movies={movies} />
    </main>
  );
};

export default HomePage;

