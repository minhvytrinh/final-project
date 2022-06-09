import { useEffect, useState } from "react";
import styled from 'styled-components';
import { FiSettings } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FaUserGraduate } from "react-icons/fa";

const Profile = () => {
    const { logout, isAuthenticated, user } = useAuth0();
    let navigate = useNavigate();
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true)
    const { _id } = useParams()
    const [pictures, setPictures] = useState()

    useEffect(() => {
        setLoading(true)
        fetch(`/api/profile/${_id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("user", data.data)
                setUserData(data.data);
        })
        .catch((err) => {
            "error";
        });
    }, [_id]);

    useEffect(() => {
        fetch(`/api/posts-by-user?user=${_id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("posts by user", data.data)
                setPictures(data.data);
                setLoading(false)
        })
        .catch((err) => {
            "error";
        });
    }, [_id]);

    return (
    <>{loading ? "loading" : (
        <Body>
            <UserContainer>
                <Avatar src={window.location.origin + "/users/007.jpg"} />
                <UserInfo>
                    <Section>
                        <Username>@{userData.username}</Username>
                    </Section>
                    <BioSection>
                        <NameSection>
                            <Name>{userData.handleName}</Name>
                            <Pronouns>{userData.pronouns}</Pronouns>
                        </NameSection>
                        <Bio>{userData.bio}</Bio>
                    </BioSection>
                </UserInfo>
            </UserContainer>
            {pictures?.map((picture) => {
                return (
                    <PostsContainer key={Math.random() * 140000000000000}>
                        <Post 
                        onClick={() => navigate(`/post/${picture.id}`)}
                        src={picture.url} />
                    </PostsContainer>
                )
            })}
        </Body>
        )}
    </>
    )
}
const Body = styled.div`
    margin: 30px 70px 30px 70px;
    border: 1px solid #B0B0B0;
    border-radius: 10px;
    height: fit-content;
`
const UserContainer = styled.div`
    display: flex;
    border-bottom: 1px solid #B0B0B0;
`
const Avatar = styled.img`
    border-radius: 50%;
    margin: 20px;
    width: 160px;
    border: 2px solid #B0B0B0;
    padding: 5px;
`
const UserInfo = styled.div`
    margin: 40px;
`
const Section = styled.div`
    display: flex;
    margin: 20px 30px 20px 0;
`
const Username = styled.div`
    font-size: 25px;
`
const Name = styled.div`
    font-weight: bold;
`
const Pronouns = styled.span`
    color: #A9A9A9;
    margin-left: 10px;
`
const NameSection = styled.div`
    display: flex;
`
const Bio = styled.div`
    margin-top: 10px;
`
const BioSection = styled.div`
    display: flex;
    flex-direction: column;
`
const PostsContainer = styled.div`
    display: grid;
    grid-template-columns: 0.1fr 0.1fr 0.1fr;
    margin: 50px 0 50px 0;
`
const Post = styled.img`
    margin: 10px;
    padding: 5px;
    height: 300px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;
export default Profile;