import styled from 'styled-components';
import SubHeader from "./SubHeader";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from "./GlobalContext";

const Explore = () => {
    const navigate = useNavigate();
    const { posts } = useContext(GlobalContext)

    return (
        <Body>
            <SubHeader />
            {posts?.map((post) => {
                return (
                    <PostsContainer key={Math.random() * 140000000000000}>
                        <Post 
                        onClick={() => navigate(`/post/${post.id}`)}
                        src={post.url} />
                    </PostsContainer>
                )
            })}
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

const PostsContainer = styled.div`
`
const Post = styled.img`
    margin: 15px 5px 5px 5px;
    height: 300px;
    cursor: pointer;
`;
export default Explore;