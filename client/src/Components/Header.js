import styled from 'styled-components';
import { NavLink, useNavigate } from "react-router-dom"
import { CgProfile } from "react-icons/cg";
import { FiPlusCircle, FiSettings, FiLogOut } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from 'react';
import { message } from 'antd-notifications-messages';


const Header = () => {
    let navigate = useNavigate();
    const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

    const showMessage = (type) => {
        message({
            type,
            message: 'Please complete your profile before continuing.',
            render: ({ message, style, className, icon }) => {
                return (
                <div style={{ ...style, background: 'white' }} className={className} >
                    <p style={{ color: 'orange', display: 'flex' }}>
                    <span>{icon}</span>
                    <b> {message}</b>
                    </p>
                </div>
                );
            }
        });
    };
    
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
                //     showMessage('warning')
                // }
            });
        }
    }, [user])
    

    return (
        <>
        <Wrapper>
            <LogoSection onClick={() => navigate("/")} >
                <Logo src={window.location.origin + "/newlogo1.jpg"} />
            </LogoSection>

            <TopRightMenu>
                <Section>
                    {!isAuthenticated ? ( 
                    <Icon>
                        <CgProfile onClick={() => loginWithRedirect()}/>
                    </Icon>
                    ) : (
                    <Icon>
                        <StyledLink to={`/profile/${user.sub}`}>
                            <CgProfile />
                            <Logged>✔️</Logged>
                        </StyledLink>
                    </Icon>
                    )}
                </Section>

                {isAuthenticated && <>
                <Section>
                    <Icon>
                        <StyledLink to="/newpost">
                            <FiPlusCircle />
                        </StyledLink>
                    </Icon>
                </Section>

                <Section>
                    <StyledLink to="/editprofile">
                        <Icon>
                            <FiSettings />
                        </Icon>
                    </StyledLink>
                </Section>

                <Section>
                        <Icon>
                            <FiLogOut onClick={() => logout()} />
                        </Icon>
                </Section>

                </>}
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
    padding-top: 70px;
`
const Section = styled.span`
    padding-right: 20px;
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
const Logged = styled.span`
    font-size: 10px;
`
export default Header;