import styled from 'styled-components';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

// this subheader is visible when user clicks on the "explore" page.
// they will be able to click on any specific film stock and it will redirect them to
// another page when they can see only the pictures that were taken with that specific film stock
const SubHeader = () => {
    const [options, setOptions] = useState();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    //fetching all options of filmstocks
    useEffect(() => {
        setLoading(true)
        fetch("/api/filmstocks")
            .then((res) => res.json())
            .then((data) => {
                setOptions(data.data);
                setLoading(false)
        })
        .catch((err) => {
            "error";
        });
    }, []);

    return (
        <>{loading ? 
            (<Loading>
                <FiLoader />
            </Loading>
            ) : (
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
        )}</>
    )
}
const Loading = styled.div`
    text-align: center;
    height: 100vh;
    font-size: 60px;
    margin-top: 100px;
    color: 	#B0B0B0;
`
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