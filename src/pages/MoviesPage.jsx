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
                            Authorization: 'Bearer f0eb757dd6f1507832d47adb8c80e05b',
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
            <MovieList movies={movies} />
        </div>
    );
};

export default MoviesPage;
