import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMThiZWU5ZjRiYjVkNjFkZDUwNTAyMWM2Mzk3ODczZiIsIm5iZiI6MTcyNjc3MjcxNS45NzY2ODYsInN1YiI6IjY2ZTliMWE4NTE2OGE4OTZlMTFlZDYxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3gKuqEm-iEeBV354T5FzZWJpv4FHDDtPu2dwL0vtCIo',
            },
          }
        );
        setReviews(response.data.results);
        setError(null); 
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError('Failed to find reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieReviews();
  }, [movieId]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  if (reviews.length === 0) {
    return <p className={styles.noReviews}>No reviews available for this movie.</p>;
  }

  return (
    <ul className={styles.reviewList}>
      {reviews.map((review) => (
        <li key={review.id} className={styles.reviewItem}>
          <h3 className={styles.reviewAuthor}>{review.author}</h3>
          <p className={styles.reviewContent}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
