import { Link } from "react-router";
import isAuthorized from "../auth.jsx";
function Error() {
    return (
        <>
            <p>This page doesn't exist!</p>
            <p>
                {isAuthorized() ? (
                    <Link to="/posts">Back to home</Link>
                ) : (
                    <Link to="/">Back to login</Link>
                )}
            </p>
        </>
    );
}

export default Error;
