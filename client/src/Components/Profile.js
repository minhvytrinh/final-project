import { useEffect, useState } from "react";
import styled from 'styled-components';

const Profile = () => {
    const [user, setUser] = useState()

    return (
    <>
        <Body>
            <UserContainer>
                <Avatar src={window.location.origin + "/users/karina.jpg"} />
                <UserInfo>
                    <Section>
                        <Username>@karina52</Username>
                        <EditProfile>Edit profile</EditProfile>
                    </Section>
                </UserInfo>

            </UserContainer>

        </Body>
    </>
    )
}
const Body = styled.div`
    margin: 30px 70px 30px 70px;
    border: 1px solid #B0B0B0;
    border-radius: 10px;
    height: 100vh;
`
const UserContainer = styled.div`
    display: flex;
`
const Avatar = styled.img`
    border-radius: 50%;
    margin: 20px;
    width: 150px;
`
const EditProfile = styled.button`
    font-family: Arial, Helvetica, sans-serif;
    background-color: white;
    padding: 5px;
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

`
const Username = styled.div`
    font-size: 25px;
`
export default Profile;