import styled from 'styled-components';
import SubHeader from "./SubHeader";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiLoader } from "react-icons/fi";

// this component is when the user is clicking on one specific film stock in the subheader (in the explore page)
const FilmStock = () => {
    const { filmstock } = useParams()
    const [filmStock, setFilmStock] = useState()
    const navigate = useNavigate()

    // fetch all posts from a specific film stock
    useEffect(() => {
        fetch(`/api/posts-by-film?filmStock=${filmstock}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.data)
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
            {!filmStock ? (
                <Loading>
                    <FiLoader />
                </Loading>
            ) : (
                <>
                {filmStock?.map((film) => {
                    return (
                        <PostsContainer key={Math.random() * 140000000000000}>
                            <Post 
                            onClick={() => navigate(`/post/${film.id}`)}
                            src={film.url} />
                        </PostsContainer>
                )
            })}
                </>
            )}
        </Body>
        </>
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
export default FilmStock;