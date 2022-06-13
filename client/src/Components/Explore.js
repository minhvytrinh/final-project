import styled from 'styled-components';
import SubHeader from "./SubHeader";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from "./GlobalContext";
import { FiLoader } from "react-icons/fi";

//this component is responsible for showing random pictures from all users
const Explore = () => {
    const navigate = useNavigate();
    const { posts } = useContext(GlobalContext)

    return (
        <Body>
            <SubHeader />
            {!posts ? (
                <Loading>
                    <FiLoader />
                </Loading>
            ) : (
                <>
                {posts?.map((post) => {
                    return (
                        <PostsContainer key={post.id}>
                            <Post 
                            onClick={() => navigate(`/post/${post.id}`)}
                            src={post.url} />
                        </PostsContainer>
                    )
                })}
                </>
            )}

        </Body>
    )
}
const Body = styled.div`
    margin: 0 10px 10px 10px;
    border: 1px solid #B0B0B0;
    border-top: none;
    border-radius: 10px;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`
const Loading = styled.div`
    text-align: center;
    height: 100vh;
    font-size: 60px;
    margin-top: 100px;
    color: 	#B0B0B0;
`
const PostsContainer = styled.div`
`
const Post = styled.img`
    margin: 15px 5px 5px 5px;
    height: 300px;
    cursor: pointer;
`;
export default Explore;