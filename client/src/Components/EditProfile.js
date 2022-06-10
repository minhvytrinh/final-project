import styled from 'styled-components';
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const { user } = useAuth0();
    const [ bio, setBio ] = useState();
    const [ handleName, setHandleName] = useState();
    const [ pronouns, setPronouns ] = useState();
    const cloudName = process.env.REACT_APP_CLOUDNAME;
    const uploadPreset = process.env.REACT_APP_UPLOADPRESET;
    const navigate = useNavigate();

    const showWidget = (e) => {
        e.preventDefault();
        let myWidget = window.cloudinary.createUploadWidget({
            cloudName,
            uploadPreset,
            sources: ['local', 'google_drive', 'instagram'],
            multiple: false,
            showAdvancedOptions: true,
            cropping: true,
        },
        (error, result) => {
            if (!error && result && result.event === 'success') {
                fetch(`/api/update-user`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        user: user,
                        bio: bio,
                        handleName: handleName,
                        pronouns: pronouns,
                        url: result.info.secure_url
                    },
                    ),
                    headers: { 'Content-Type': 'application/json' },
                })
                .then((res) => res.json())
                .then((data) => {
                        NotificationManager.success(
                            "Profile successfully updated!",
                            "Success!"
                        );
                        navigate(`/profile/${user.sub}`)
                })
                .catch((err) => {
                    console.log("error")
                });
            }
        })
        myWidget.open();
    };

    return (
        <>
        <Body>
            <Edit>Edit your profile:</Edit>
            <form onSubmit={(e) => showWidget(e)}>
                <Section>Name:
                    <InputSection>
                        <Input 
                        required
                        value={handleName}
                        onChange={(e) => setHandleName(e.target.value)}
                        >
                        </Input>
                    </InputSection>
                </Section>

                <Section>Pronouns:
                    <InputSection>
                        <Input 
                        required
                        value={pronouns}
                        onChange={(e) => setPronouns(e.target.value)}
                        >
                        </Input>
                    </InputSection>
                </Section>

                <Section>Bio:
                    <InputSection>
                        <Input 
                        required
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        >
                        </Input>
                    </InputSection>
                </Section>
                {/* { handleName
                && pronouns
                && bio ?
                ( */}
                <Button type="submit">Add avatar & edit profile</Button>
                {/* ) : (
                    <DisabledButton disable>Please fill up all field</DisabledButton>
                )
                } */}
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
    font-size: 40px;
    color: 	#B0B0B0;
    padding: 10px;
`
const Section = styled.div`
    padding: 5px;
`
const InputSection = styled.div`
    align-items: right;
`
const Input = styled.input`
    width: 200px;
    padding: 5px;
    border: 2px solid orange;
    border-radius: 10px;
    font-family: 'Quicksand';
    :focus {
        outline: none;
    }
`
const Button = styled.button`
    background-color: orange;
    color: white;
    border: 2px solid orange;
    width: 200px;
    margin: 10px;
    padding: 5px;
    border-radius: 4px;
    :hover {
        cursor: pointer;
        background-color: #f5f5f7;
        color: orange;
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