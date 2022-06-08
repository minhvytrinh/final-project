import styled from 'styled-components';
import SubHeader from "./SubHeader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const FilmStock = () => {
    const { filmstock } = useParams()
    const [filmStock, setFilmStock] = useState()

    // fetch all posts from a specific film stock
    // useEffect(() => {
    //     fetch(`/api//posts/${filmstocks}`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data.data)
    //             setFilmStock(data.data);
    //     })
    //     .catch((err) => {
    //         "error";
    //     });
    // }, [filmstock]);

    return (
        <>
        <Body>
            <SubHeader />
            search by filmstock
        
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
    display: grid;
    grid-template-columns: 2fr 2fr 2fr;
    margin: 50px 0 50px 0;

`
const Post = styled.img`
    margin: 10px;
    padding: 5px;
    width: 270px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;
export default FilmStock;