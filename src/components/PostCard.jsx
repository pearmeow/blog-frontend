import { Link } from "react-router";
function PostCard({ title, text, id }) {
    const link = "/posts/" + id;
    return (
        <>
            <p>Title: {title}</p>
            <p>Body: {text}</p>
            <p>
                <Link to={link}>Go to post {id}</Link>
            </p>
        </>
    );
}

export default PostCard;
