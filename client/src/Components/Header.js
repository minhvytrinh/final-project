import styled from 'styled-components';
import { NavLink, useNavigate } from "react-router-dom"
import { CgProfile } from "react-icons/cg";
// import { MdOutlineExplore } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';

const Header = () => {
    let navigate = useNavigate();
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();

    useEffect(() => {
        if (isAuthenticated) {
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
                // console.log("hello", data.message)
                // if (data.status === 201) {
                //     navigate("/editprofile")
                // }
            });
        }
    }, [user])

    return (
        <>
        <Wrapper>
            <LogoSection onClick={() =>
                    navigate("/")} >
                <Logo src={window.location.origin + "/newlogo1.jpg"} />
            </LogoSection>

        <TopRightMenu>
            
        <Section>
                {!isAuthenticated ? 
                    ( <Icon><CgProfile onClick={() => loginWithRedirect()}/></Icon>) 
                    : ( <Icon><StyledLink to={`/profile/${user.sub}`}>
                            <CgProfile /><Logged>✅</Logged>
                        </StyledLink></Icon>
                )}
            </Section>
        <Section>
    
                    <Icon><StyledLink to="/newpost">
                            <FiPlusCircle />
                        </StyledLink></Icon>
            
            </Section>
            {/* <Section>
                <StyledLink to="/explore">
                    <Icon>
                        <MdOutlineExplore />
                    </Icon>
                </StyledLink>
            </Section> */}

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
const Logged = styled.span`
    font-size: 15px;
`
export default Header;