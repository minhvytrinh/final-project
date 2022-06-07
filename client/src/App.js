import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from 'styled-components';
import Homepage from "./Components/Homepage";
import Header from "./Components/Header";
import NewPost from "./Components/NewPost";
import Profile from "./Components/Profile";
import Explore from "./Components/Explore";
import PostDetails from "./Components/PostDetails";
import EditProfile from "./Components/EditProfile";


const App = () => {
  return (
    <>
    <BrowserRouter>
      <Header />
          <Body>
      <Container>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/editprofile" element={<EditProfile />} />
        </Routes>
      </Container>
          </Body>
    </BrowserRouter>

    </>
  )
}
const Body = styled.div`
    padding: 0 160px 0 160px;
    font-family: 'Quicksand';
`
const Container = styled.div`
  min-height: calc(100vh - 350px);
`;

export default App;
