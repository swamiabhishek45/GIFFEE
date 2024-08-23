import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Favourite from "./pages/Favourite";
import Search from "./pages/Search";
import SingleGIF from "./pages/SingleGIF";

const router = createBrowserRouter([
    {
        element: <AppLayout />,

        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/:category",
                element: <Category />,
            },
            {
                path: "/favourite",
                element: <Favourite />,
            },
            {
                path: "/search/:query",
                element: <Search />,
            },
            {
                path: "/:type/:slug",
                element: <SingleGIF />,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;