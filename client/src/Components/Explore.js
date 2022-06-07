import styled from 'styled-components';
import ExploreHeader from "./ExploreHeader";

const Explore = () => {
    return (
        <>
        <Body>
            <ExploreHeader />
            this is the explore page
        </Body>
        </>
    )
}

const Body = styled.div`
    margin: 30px 5px 30px 5px;
    border: 1px solid #B0B0B0;
    border-radius: 10px;
    height: 100vh;

`

export default Explore;