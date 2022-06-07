import styled from 'styled-components';
import { NavLink, useNavigate } from "react-router-dom"
import { CgProfile } from "react-icons/cg";
import { MdOutlineExplore } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';

const Header = () => {
    let navigate = useNavigate();
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    console.log(user)
    useEffect(() => {
        fetch("/api/signup", {
            method: "POST",
            body: JSON.stringify({
                user: user
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                navigate("/");
                }
            });
    }, [user])

    return (
        <>
        <Wrapper>
            <LogoSection onClick={() =>
                    navigate("/")} >
                <Logo src={window.location.origin + "/newlogo.jpg"} />
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
                {!isAuthenticated ? 
                    ( <Icon><CgProfile onClick={() => loginWithRedirect()}/></Icon>) 
                    : ( <Icon><StyledLink to="/profile">
                            <CgProfile />
                        </StyledLink></Icon>
                )}
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
    text-decoration: none;
    font-size: 30px;
    color: #484848;
    &:hover {
    cursor: pointer;
    }
`
export default Header;