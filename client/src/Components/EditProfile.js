import styled from 'styled-components';
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";


const EditProfile = () => {
    const { isAuthenticated, user } = useAuth0();
    const [ bio, setBio ] = useState();
    const [ name, setName] = useState();
    const [ username, setUsername] = useState();
    const [ email, setEmail] = useState();
    const [ pronouns, setPronouns ] = useState();


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/update-user', {
            method: 'PATCH',
            body: JSON.stringify({
                data: {
                    bio: user.bio,
                    email: user.email,
                    name: user.name,
                    username: user.username,
                    pronouns: user.pronouns
                },
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data)
        })
        .catch((err) => {
            console.log("error")
        });
    };

    return (
        <>
        <Body>
            <Edit>Edit your profile:</Edit>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Section>Name:
                    <InputSection>
                        <input 
                        onChange={(e) => setName(e.target.value)}
                        >
                        </input>
                    </InputSection>
                </Section>

                <Section>Username:
                    <InputSection>
                        <input 
                        onChange={(e) => setUsername(e.target.value)}
                        >
                        </input>
                    </InputSection>
                </Section>

                <Section>Pronouns:
                    <InputSection>
                        <input 
                        onChange={(e) => setPronouns(e.target.value)}
                        >
                        </input>
                    </InputSection>
                </Section>

                <Section>Bio:
                    <InputSection>
                        <input 
                        onChange={(e) => setBio(e.target.value)}
                        >
                        </input>
                    </InputSection>
                </Section>

                <Section>Email:
                    <InputSection>
                        <input 
                        onChange={(e) => setEmail(e.target.value)}
                        >
                        </input>
                    </InputSection>
                </Section>
                <Button type="submit">Edit profile</Button>
            </form>
        </Body>
        </>
    )
}

const Body = styled.div`
    margin: 30px 70px 30px 70px;
    border: 1px solid #B0B0B0;
    border-radius: 10px;
    height: 100vh;
    text-align: center;
`
const Edit = styled.div`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding: 10px;
`
const Section = styled.div`
    padding: 5px;
`
const InputSection = styled.div`
    align-items: right;
`
const Button = styled.button`
    background-color: white;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #B0B0B0;
    &:hover {
    cursor: pointer;
    }
`
export default EditProfile;