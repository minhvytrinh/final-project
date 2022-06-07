import styled from 'styled-components';
import { useState } from 'react';
import {Cloudinary} from "@cloudinary/url-gen";
import { useAuth0 } from "@auth0/auth0-react";

const NewPost = () => {
    const cloudName = process.env.REACT_APP_CLOUDNAME;
    const uploadPreset = process.env.REACT_APP_UPLOADPRESET;
    const { isAuthenticated, user } = useAuth0();
    const [caption, setCaption] = useState("");
    const [filmStock, setFilmStock] = useState("")

    const showWidget = () => {
        let myWidget = window.cloudinary.createUploadWidget({
        cloudName, 
        uploadPreset,
        sources: [ "local", "google_drive", "instagram"],
        multiple: false,
        showAdvancedOptions: true,
        cropping: true,
        }, (error, result) => { 
            if (!error && result && result.event === "success") { 
            console.log('Done! Here is the image info: ', result.info); 
            }
        })
        myWidget.open()
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     fetch("/api/post/upload", {
    //         body: JSON.stringify({
    //             userId: user.sub,
    //             caption: caption,
    //             filmStock: filmStock
    //         }),
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             if (data.status === 200) {
    //             console.log("post submitted")
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    //     };

    return (
        <>
        {/* <form method="GET">
            <textarea 
                placeholder="Write a caption..."
                type="text"
                // value={caption}
            ></textarea>
            <select onChange={(ev) => {}}>
            <option>Select a film stock</option>
            <option>Kodak Portra 400</option>
            <option>Kodak Colorplus 200</option>
            <option>Kodak Ultramax 400</option>
            <option>Kodak Gold 200</option>
            <option>CineStill 800T</option>
            <option>Fujifim Fujicolor 200</option>
            </select> */}
            <button 
            id="upload_widget"
            onClick={()=>showWidget()}>
                Choose a photo</button>
        {/* </form>     */}
</>
    )
}

const Body = styled.div`
    display: flex;
    margin: 30px 70px 30px 70px;
    justify-content: center;
    border: 1px solid #B0B0B0;
    border-radius: 10px;
    height: 100vh;
    flex-direction: column;
    align-items: center;
`
const PreviewSection = styled.div`
`
const PreviewBox = styled.div`
    border: 1px solid #B0B0B0;
    border-radius: 5px;
    width: 500px;
    height: 500px;
    background-color: #F5F5F5;
    text-align: center;
    align-items: center;
`
const Text = styled.div`
    font-size: 40px;
    color: 	#B0B0B0;
    padding-top: 220px;
`
const FormSection = styled.div`
`
const Select = styled.form`
`
const InputUpload = styled.input`
`
const Button = styled.button`
    width: 100px;
`
const PreviewFile = styled.img`
    height: 300px;
`
export default NewPost;