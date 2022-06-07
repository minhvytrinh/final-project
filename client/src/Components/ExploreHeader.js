import styled from 'styled-components';

const ExploreHeader = () => {
    return (
        <>
        <Body>
            <Select>Search by film stock:</Select>
            <Film>Kodak Portra 400</Film>
            <Film>Kodak Colorplus 200</Film>
            <Film>Kodak Ultramax 400</Film>
            <Film>Kodak Gold 200</Film>
            <Film>CineStill 800T</Film>
            <Film>Fujifim Fujicolor 200</Film>
            <Border />
        </Body>
        </>
    )
}

const Body = styled.div`
`
const Select = styled.div`
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding: 5px;
`
const Film = styled.div`
    padding: 5px;
    gap: 2px;
    margin: 2px;
    height: 100%;
    background-color: #f2f2f2;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    :hover {
        cursor: pointer;
        background-color: #f5f5f7;
        color: #2279d2;
    }
`
const Border = styled.div`
    margin-top: 20px;
    border-bottom: 1px solid #B0B0B0;
`
export default ExploreHeader;