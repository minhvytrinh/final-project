import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from 'styled-components';
import Homepage from "./Components/Homepage";
import Header from "./Components/Header";
import NewPost from "./Components/NewPost"
import Profile from "./Components/Profile";
import Explore from "./Components/Explore";

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Header />
          <Body>
      <Container>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/newpost" element={<NewPost />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/explore" element={<Explore />} />
        </Routes>
      </Container>
          </Body>
    </BrowserRouter>

    </>
  )
}
const Body = styled.div`
    padding: 0 160px 0 160px;
    font-family: 'Courier New', Courier, monospace;
`
const Container = styled.div`
  min-height: calc(100vh - 350px);
`;

export default App;
