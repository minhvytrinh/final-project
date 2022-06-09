import styled from 'styled-components';
import { useState } from 'react';
import {Cloudinary} from "@cloudinary/url-gen";
import { useAuth0 } from "@auth0/auth0-react";

const NewPost = () => {
    const cloudName = process.env.REACT_APP_CLOUDNAME;
    const uploadPreset = process.env.REACT_APP_UPLOADPRESET;
    const { isAuthenticated, user } = useAuth0();
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
            // console.log('Done! Here is the image info: ', result.info.secure_url);
                fetch('/api/post/upload', {
                    method: 'POST',
                    body: JSON.stringify({
                        url: result.info.secure_url,
                        user: user.sub,
                        caption: caption,
                        filmStock: filmStock,
                        numOfLikes: 0,
                        numOfComments: 0,
                        comments: []
                    },
                    ),
                    headers: { 'Content-Type': 'application/json' },
                    })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data.data)
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
                <textarea 
                    required
                    placeholder="Write a caption..."
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                ></textarea>
            </Section>
            <Section><span>Select a film stock: </span>
                <select onChange={(ev) => setFilmStock(ev.target.value)}>
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
const Button = styled.button`
    width: 200px;
    margin: 10px;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #B0B0B0;
    cursor: pointer;
`
export default NewPost;