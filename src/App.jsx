import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Favourite from "./pages/Favourite";
import Search from "./pages/Search";
import SingleGIF from "./pages/SingleGIF";
import {GifProvider} from "./context/gif-context";

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
                path: "/favourites",
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
    return (
        <GifProvider>
            <RouterProvider router={router} />
        </GifProvider>
    );
}

export default App;
