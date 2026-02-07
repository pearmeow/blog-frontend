import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Error from "./components/Error.jsx";
import Posts from "./components/Posts.jsx";
import Post from "./components/Post.jsx";

const routes = [
    {
        Component: Login,
        path: "/",
    },
    {
        Component: Register,
        path: "/register",
    },
    {
        Component: Posts,
        path: "/posts",
    },
    {
        Component: Post,
        path: "/posts/:postId",
    },
    {
        Component: Error,
        path: "*",
    },
];

export default routes;
