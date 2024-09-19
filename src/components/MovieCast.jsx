import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieCast.module.css'; 

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchMovieCast = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: 'Bearer f0eb757dd6f1507832d47adb8c80e05b',
            },
          }
        );
        const fetchedCast = response.data.cast;
        if (fetchedCast && fetchedCast.length > 0) {
          setCast(fetchedCast);
          setError(null); 
        } else {
          setError('No cast information available.');
        }
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError('Failed to fetch cast.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.container}>
      {error && <div className={styles.error}>{error}</div>} {/* Wyświetl błąd */}
      <ul className={styles.list}>
        {cast.map(({ cast_id, name, character, profile_path }) => (
          <li key={cast_id} className={styles.item}>
            <img
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w200${profile_path}`
                  : 'https://via.placeholder.com/200x300?text=No+Image'
              }
              alt={name}
              width="100"
            />
            <p>{name} as {character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
