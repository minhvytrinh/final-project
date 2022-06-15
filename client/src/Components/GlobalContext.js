import { useState, createContext, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const GlobalContext = createContext(null);

const GlobalProvider = ({ children }) => {
    const { user } = useAuth0();
    const [posts, setPosts] = useState()

    // fetch all posts from all users
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
            posts,
            user
        }}
        >
        {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
