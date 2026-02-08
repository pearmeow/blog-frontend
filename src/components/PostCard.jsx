import styles from "./PostCard.module.css";
import { Link } from "react-router";

function PostCard({ title, id }) {
    const link = "/posts/" + id;
    return (
        <div className={styles.card}>
            <Link to={link} className={styles.link}>
                <button className={styles.button}>{title}</button>
            </Link>
        </div>
    );
}

export default PostCard;
