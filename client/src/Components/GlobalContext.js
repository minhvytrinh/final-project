import { useState, createContext, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NotificationManager } from "react-notifications";

export const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {
    const [posts, setPosts] = useState()

    useEffect(() => {
        fetch("/api/posts")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data.response);
        })
        .catch((err) => {
            "error";
        });
    }, []);

    return (
        <GlobalContext.Provider
        value={{
            posts
        }}
        >
        {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
