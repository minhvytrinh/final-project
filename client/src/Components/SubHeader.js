import styled from 'styled-components';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SubHeader = () => {
    const [options, setOptions] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        fetch("/api/filmstocks")
            .then((res) => res.json())
            .then((data) => {
                // console.log(data.data)
                setOptions(data.data);
        })
        .catch((err) => {
            "error";
        });
    }, []);

    return (
        <Body>
            {options?.map((option) => {
                return (
                    <Film 
                    key={Math.random() * 140000000000000}
                    onClick={() => navigate(`/posts/${option}`)}
                    >{option}</Film>
                )
            })}
        </Body>

    )
}

const Body = styled.div`
    padding: 10px;
    display: flex;
    border-bottom: 1px solid #B0B0B0;
    height: 100%;
`
const Film = styled.div`
    font-size: 20px;
    padding: 5px;
    gap: 2px;
    margin: 2px;
    height: 100%;
    background-color: #f2f2f2;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    :hover {
        cursor: pointer;
        background-color: #f5f5f7;
        color: orange;
    }
`
export default SubHeader;