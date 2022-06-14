import styled from 'styled-components';
import { NavLink, useNavigate } from "react-router-dom"
import { CgProfile } from "react-icons/cg";
import { FiPlusCircle, FiSettings, FiLogOut } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from 'react';
import { MdOutlineExplore } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";

const Header = () => {
    let navigate = useNavigate();
    const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

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
            });
        }
    }, [user])
    

    return (
        <>
        <Wrapper>
            {/* if the user is logged in, when clicking on the logo, it will bring them to the homefeed page,
            if not logged in, it will bring them to the explore page */}
            {isAuthenticated ? (
                <LogoSection onClick={() => navigate(`/homepage/${user.sub}`)} >
                    <Logo src={window.location.origin + "/FINAL.jpg"} />
                </LogoSection>
            ) : (
                <LogoSection onClick={() => navigate("/")} >
                    <Logo src={window.location.origin + "/FINAL.jpg"} />
                </LogoSection>
            )}

            <TopRightMenu>

            {isAuthenticated &&
                <Section>
                    <Icon>
                        <StyledLink to={`/homepage/${user.sub}`}>
                            <BiHomeAlt />
                        </StyledLink>
                    </Icon>
                </Section>
                }

                {isAuthenticated &&
                <Section>
                    <Icon>
                        <StyledLink to="/newpost">
                            <FiPlusCircle />
                        </StyledLink>
                    </Icon>
                </Section>
                }

                {isAuthenticated &&
                <Section>
                    <StyledLink to="/">
                        <Icon>
                            <MdOutlineExplore />
                        </Icon>
                    </StyledLink>
                </Section>
                }

                {isAuthenticated &&
                <Section>
                    <StyledLink to="/editprofile">
                        <Icon>
                            <FiSettings />
                        </Icon>
                    </StyledLink>
                </Section>
                }
                
                {/* if user isn't logged in, they will only see the "profile icon" on the top right menu, 
                and by clicking on it, it will redirect to the log in page.
                once they are logged in, they will able to see all other icons (homefeed, explore, edit profile, new post and log out) */}
                <Section>
                    {!isAuthenticated ? ( 
                    <Icon>
                        <CgProfile onClick={() => loginWithRedirect()}/>
                    </Icon>
                    ) : (
                    <Icon>
                        <StyledLink to={`/profile/${user.sub}`}>
                            <Avatar src={user.picture} />
                        </StyledLink>
                    </Icon>
                    )}
                </Section>

                {isAuthenticated &&
                <Section>
                        <Icon>
                            <FiLogOut onClick={() => logout()} />
                        </Icon>
                </Section>
                }


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
    color: black;
    :hover {
        cursor: pointer;
        color: orange;
    }
`
const Logo = styled.img`
    height: 120px;
`;
const TopRightMenu = styled.div`
    padding-top: 80px;
`
const Section = styled.span`
    padding-right: 10px;
`
const Icon = styled.span`
    text-decoration: none;
    color: black;
    font-size: 25px;
    :hover {
        cursor: pointer;
        color: orange;
    }
`
const Avatar = styled.img`
    border-radius: 50%;
    width: 26px;
    :hover {
        cursor: pointer;
        width: 24px;
        border: 2px solid orange;
    }
`
export default Header;