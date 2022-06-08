import styled from 'styled-components';
import SubHeader from "./SubHeader";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const FilmStock = () => {
    const { filmstock } = useParams()
    const [filmStock, setFilmStock] = useState()
    const navigate = useNavigate()

    // fetch all posts from a specific film stock
    useEffect(() => {
        fetch(`/api/posts-by-film?filmStock=${filmstock}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data.data)
                setFilmStock(data.data);
        })
        .catch((err) => {
            "error";
        });
    }, [filmstock]);

    return (
        <>
        <Body>
            <SubHeader />
            {filmStock?.map((film) => {
                return (
                    <PostsContainer key={Math.random() * 140000000000000}>
                        <Post 
                        onClick={() => navigate(`/post/${film.id}`)}
                        src={film.url} />
                    </PostsContainer>
                )
            })}
        
        </Body>
        </>
    )
}

const Body = styled.div`
    margin: 30px 5px 30px 5px;
    border: 1px solid #B0B0B0;
    border-radius: 10px;
    height: fit-content;
    
`
const PostsContainer = styled.div`
    width: 700px;
    display: flex;

`
const Post = styled.img`
    margin: 10px;
    padding: 5px;
    width: 400px;
    cursor: pointer;

`;
export default FilmStock;