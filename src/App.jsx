import "./styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "./routes";

let router = createBrowserRouter(routes);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
