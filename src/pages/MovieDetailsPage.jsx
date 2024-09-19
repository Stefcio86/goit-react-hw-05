import { useParams, NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const location = useLocation();
    const backLinkLocationRef = useRef(location.state?.from ?? '/movies');
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
                    {
                        headers: {
                          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMThiZWU5ZjRiYjVkNjFkZDUwNTAyMWM2Mzk3ODczZiIsIm5iZiI6MTcyNjc3MjcxNS45NzY2ODYsInN1YiI6IjY2ZTliMWE4NTE2OGE4OTZlMTFlZDYxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3gKuqEm-iEeBV354T5FzZWJpv4FHDDtPu2dwL0vtCIo',
                        },
                    }
                );
                setMovie(response.data);
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError('Failed to fetch movie details.');
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!movie) return null;

    return (
        <div className={styles.container}>
            <Link to={backLinkLocationRef.current} className={styles.backLink}>Go Back</Link>
            <div className={styles.movieDetails}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className={styles.poster}
                />
                <div className={styles.details}>
                    <h2 className={styles.title}>{movie.title} ({new Date(movie.release_date).getFullYear()})</h2>
                    <p className={styles.overview}>{movie.overview}</p>
                    <p className={styles.genres}>
                        Genres: {movie.genres.map(genre => genre.name).join(', ')}
                    </p>
                    <div className={styles.links}>
                        <NavLink to="cast" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>Cast</NavLink>
                        <NavLink to="reviews" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>Reviews</NavLink>
                    </div>
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default MovieDetailsPage;

