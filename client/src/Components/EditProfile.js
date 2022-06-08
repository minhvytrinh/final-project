import styled from 'styled-components';
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";


const EditProfile = () => {
    const { user } = useAuth0();
    const [ bio, setBio ] = useState();
    const [ handleName, setHandleName] = useState();
    const [ username, setUsername] = useState();
    const [ pronouns, setPronouns ] = useState();


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/update-user`, {
            method: 'PUT',
            body: JSON.stringify({
                    user: user,
                    bio: bio,
                    handleName: handleName,
                    username: username,
                    pronouns: pronouns
                },
            ),
            headers: { 'Content-Type': 'application/json' },
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.message === 200) {
                console.log(data.message)
            } else {
                console.log(data.message)
            }
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
                        value={handleName}
                        onChange={(e) => setHandleName(e.target.value)}
                        >
                        </input>
                    </InputSection>
                </Section>

                <Section>Username:
                    <InputSection>
                        <input 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        >
                        </input>
                    </InputSection>
                </Section>

                <Section>Pronouns:
                    <InputSection>
                        <input 
                        value={pronouns}
                        onChange={(e) => setPronouns(e.target.value)}
                        >
                        </input>
                    </InputSection>
                </Section>

                <Section>Bio:
                    <InputSection>
                        <input 
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        >
                        </input>
                    </InputSection>
                </Section>
                { handleName
                && username
                && pronouns
                && bio ?
                (<Button type="submit">Edit profile</Button>) : (
                    <DisabledButton disable>Edit profile</DisabledButton>
                )
                }
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
    margin-top:20px;
    background-color: white;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #B0B0B0;
    &:hover {
    cursor: pointer;
    }
`
const DisabledButton = styled.button`
    margin-top:20px;
    background-color: white;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #B0B0B0;
    &:hover {
    cursor: not-allowed;
    }
`

export default EditProfile;