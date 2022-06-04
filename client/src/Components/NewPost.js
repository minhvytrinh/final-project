import styled from 'styled-components';
import { useState } from 'react';

const NewPost = () => {
    const [fileInputState, setFileInputState] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
    const [previewSource, setPreviewSource] = useState();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    }
    const previewFile = (file) => {
        
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result)
            console.log("file", previewSource)
        }
    }
    const handleSubmitFile = (e) => {
        e.preventDefault();
        if(!previewSource) return
        uploadImage(previewSource)
    }
    const uploadImage = async (base64EncodedImage) => {
        console.log(base64EncodedImage)
        try {
            await fetch("/api/upload", {
                method: 'POST',
                body: JSON.stringify({data: base64EncodedImage}),
                headers: {"Content-Type": "multipart/form-data"}
            })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
        <Body>
            <PreviewSection>
                {previewSource ? (
                    <PreviewFile 
                        src={previewSource} 
                        alt="chosen" />
                ) : (
                    <PreviewBox>
                        <Text>
                            new post
                        </Text>
                    </PreviewBox>
                )}
            </PreviewSection>

            <FormSection>
                <Select onSubmit={(e) => handleSubmitFile(e)}>
                    <InputUpload
                        type="file"
                        name="image"
                        onChange={(e) => handleFileInputChange(e)}
                        value={fileInputState} />
                        <Button
                            type="submit">Submit</Button>
                </Select>
            </FormSection>
        </Body>
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