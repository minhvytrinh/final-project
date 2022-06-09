import styled from 'styled-components';
import SubHeader from "./SubHeader";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Explore = () => {
    const [posts, setPosts] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        fetch("/api/posts")
            .then((res) => res.json())
            .then((data) => {
                // console.log("post", data.response)
                setPosts(data.response);
        })
        .catch((err) => {
            "error";
        });
    }, []);

    return (
        <Body>
            <SubHeader />
            {posts?.map((post) => {
                return (
                    <Div>
                    <PostsContainer key={Math.random() * 140000000000000}>
                        <div><Post 
                        onClick={() => navigate(`/post/${post.id}`)}
                        src={post.url} />
                        </div>
                    </PostsContainer>
                    </Div>
                )
            })}
        </Body>
    )
}
const Div = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`
const Body = styled.div`
    margin: 30px 5px 30px 5px;
    border: 1px solid #B0B0B0;
    border-radius: 10px;
    height: fit-content;
`
const PostsContainer = styled.div`
    /* display: flex;
    flex-direction: row;
    flex-wrap: wrap; */
`
const Post = styled.img`
    margin: 10px;
    padding: 5px;
    height: 300px;
    cursor: pointer;
`;
export default Explore;