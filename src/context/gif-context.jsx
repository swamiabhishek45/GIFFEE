// way to share data between components without passing props down manually.
import { createContext } from "react";

// share data related to GIFs between components.
const GifContext = createContext();

const GifProvider = ({ children }) => {
    return <GifContext.Provider>{children}</GifContext.Provider>;
};

export default GifProvider;
