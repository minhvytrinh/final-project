import styled from 'styled-components';
import { NavLink, useNavigate } from "react-router-dom"
import { CgProfile } from "react-icons/cg";
import { MdOutlineExplore } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";



const Header = () => {
    let navigate = useNavigate()
    
    return (
        <>
        <Wrapper>
            <LogoSection onClick={() =>
                    navigate("/")} >
                <Logo src={window.location.origin + "/Logocropped.jpg"} />
            </LogoSection>
        <TopRightMenu>
            <Section>
                <StyledLink to="/newpost">
                    <Icon>
                        <FiPlusCircle />
                    </Icon>
                </StyledLink>
            </Section>
            <Section>
                <StyledLink to="/explore">
                    <Icon>
                        <MdOutlineExplore />
                    </Icon>
                </StyledLink>
            </Section>
            <Section>
                <StyledLink to="/profile">
                    <Icon>
                        <CgProfile />
                    </Icon>
                    
                </StyledLink>
            </Section>
        </TopRightMenu>
        </Wrapper>
        </>
    )
}
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #B0B0B0;
    padding: 10px 160px 10px 160px;
`
const LogoSection = styled.span`
    &:hover {
    cursor: pointer;
    }
`
const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: #484848;
`
const Logo = styled.img`
    height: 120px;
`;
const TopRightMenu = styled.div`
    padding-top: 70px;
`
const Section = styled.span`
    padding-right: 20px;
`
const Icon = styled.span`
    font-size: 30px;
`
export default Header;