import { useEffect, useState } from "react";
import styled from 'styled-components';
import { FiSettings } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { logout, user } = useAuth0();
    let navigate = useNavigate();
    // const [user, setUser] = useState()

    return (
    <>
        <Body>
            <UserContainer>
                <Avatar src={window.location.origin + "/users/karina.jpg"} />
                <UserInfo>
                    <Section>
                        <Username>{user.username}</Username>
                        <EditProfile onClick={() => navigate("/editprofile")}><FiSettings /> Edit profile</EditProfile>
                        <Logout onClick={() => logout()}>Log out</Logout>
                    </Section>
                    <BioSection>
                        <NameSection><Name>{user.name}</Name><Pronouns>{user.pronouns}</Pronouns></NameSection>
                        <Bio>{user.bio}</Bio>
                    </BioSection>
                </UserInfo>
            </UserContainer>

            <PostsContainer>
                <Post src={window.location.origin + "/posts/Costarica1.jpg"} />
                <Post src={window.location.origin + "/posts/costarica2.jpg"} />
                <Post src={window.location.origin + "/posts/cotenord1.jpg"} />
                <Post src={window.location.origin + "/posts/cotenord2.jpg"} />
                <Post src={window.location.origin + "/posts/ny1.jpg"} />
                <Post src={window.location.origin + "/posts/ny2.jpg"} />
                <Post src={window.location.origin + "/posts/puertorico1.jpg"} />
                <Post src={window.location.origin + "/posts/puertorico2.jpg"} />
                <Post src={window.location.origin + "/posts/sutton1.jpg"} />
                <Post src={window.location.origin + "/posts/sutton2.jpg"} />
            </PostsContainer>
        </Body>
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
const EditProfile = styled.button`
    margin-left: 25px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: white;
    padding: 5px 7px 5px 5px;
    border-radius: 4px;
    border: 1px solid #B0B0B0;
    &:hover {
    cursor: pointer;
    }
`
const Logout = styled.button`
    margin-left: 25px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: white;
    padding: 5px 7px 5px 5px;
    border-radius: 4px;
    border: 1px solid #B0B0B0;
    &:hover {
    cursor: pointer;
    }
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
const Number = styled.span`
    font-weight: bold;
`
const Stats = styled.div`
    
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
    width: 230px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;
export default Profile;