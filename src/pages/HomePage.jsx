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
              Authorization: 'Bearer f0eb757dd6f1507832d47adb8c80e05b',
            },
          }
        );
        setMovies(response.data.results);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError('Failed to fetch movies.');
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
