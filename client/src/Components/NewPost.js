import styled from 'styled-components';
import { useState, useContext } from 'react';
import {Cloudinary} from "@cloudinary/url-gen";
import { useAuth0 } from "@auth0/auth0-react";
import { NotificationManager } from "react-notifications";
import { useNavigate } from 'react-router-dom';

// this component is for the upload picure feature, using a Cloudinary widget
const NewPost = () => {
    const navigate = useNavigate()
    const cloudName = process.env.REACT_APP_CLOUDNAME;
    const uploadPreset = process.env.REACT_APP_UPLOADPRESET;
    const { user } = useAuth0();
    const [caption, setCaption] = useState();
    const [filmStock, setFilmStock] = useState();

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
                fetch('/api/post/upload', {
                    method: 'POST',
                    body: JSON.stringify({
                        author: user.nickname,
                        avatar: user.picture,
                        url: result.info.secure_url,
                        user: user.sub,
                        caption: caption,
                        filmStock: filmStock,
                        likes: [],
                        comments: []
                    },
                    ),
                    headers: { 'Content-Type': 'application/json' },
                    })
                .then((res) => res.json())
                .then((data) => {
                    NotificationManager.success(
                        "Picture successfully uploaded!",
                        "Success!"
                    );
                    navigate(`/profile/${user.sub}`)
                })
                .catch((err) => {
                    console.log(error.message)
                });
            }
        })
        myWidget.open();
    };

    return (
        <Body>
            <Text>Upload a new picture!</Text>
            <form onSubmit={(e)=>showWidget(e)}>
            <Section>
                <TextArea 
                    required
                    placeholder="Write a caption for your picture..."
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                ></TextArea>
            </Section>
            <Section><span>Select a film stock: </span>
            {/* users need to select a specific film stock...  */}
                <select onChange={(ev) => setFilmStock(ev.target.value)}>
                    <option value=""></option>
                    <option value="Kodak Portra 400">Kodak Portra 400</option>
                    <option value="Kodak Colorplus 200">Kodak Colorplus 200</option>
                    <option value="Kodak Ultramax 400">Kodak Ultramax 400</option>
                    <option value="Kodak Gold 200">Kodak Gold 200</option>
                    <option value="CineStill 800T">CineStill 800T</option>
                    <option value="Fujifim Fujicolor 200">Fujifim Fujicolor 200</option>
                </select>
            </Section>
            <Section>
                <Button id="upload_widget">Choose a photo</Button>
            </Section>
            </form>    
        </Body>
    )
}

const Body = styled.div`
    display: flex;
    margin: 30px 70px 30px 70px;
    justify-content: center;
    border: 1px solid #B0B0B0;
    border-radius: 10px;
    height: fit-content;
    flex-direction: column;
    align-items: center;
    text-align: center;
`
const Text = styled.div`
    font-size: 40px;
    color: 	#B0B0B0;
    padding: 10px;
`
const Section = styled.div`
    margin: 10px;
`
const TextArea = styled.textarea`
    width: 300px;
    padding: 10px;
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
export default NewPost;