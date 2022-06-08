import styled from 'styled-components';
import SubHeader from "./SubHeader";

const Explore = () => {
    return (
        <>
        <Body>
            <SubHeader />
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
    margin: 30px 5px 30px 5px;
    border: 1px solid #B0B0B0;
    border-radius: 10px;
    height: fit-content;
`
const PostsContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr 2fr;
    margin: 50px 0 50px 0;

`
const Post = styled.img`
    margin: 10px;
    padding: 5px;
    width: 270px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;
export default Explore;