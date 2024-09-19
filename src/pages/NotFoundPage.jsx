import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css'; 

const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <h1>404</h1>
            <p>Oops! The page you are looking for does not exist.</p>
            <Link to="/" className={styles.homeLink}>Go to Home</Link>
        </div>
    );
};

export default NotFoundPage;
