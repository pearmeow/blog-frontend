import Login from "./components/Login";
import Register from "./components/Register";

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
        // Component: Posts,
        // path: "/posts",
    },
    {
        // Component: CreatePost,
        // path: "/posts/new",
    },
    {
        // Component: Post,
        // path: "/posts/:postId",
    },
];

export default routes;
