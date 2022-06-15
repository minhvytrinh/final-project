import { useEffect, useState } from "react";
import styled from 'styled-components';
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { FiLoader } from "react-icons/fi";
import { BiComment } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { FiPlusCircle } from "react-icons/fi";

//this is the component for the profile of any user. on this page, users will see all pictures from that specific
// user and they will be able to follow or unfollow them
const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    let navigate = useNavigate();
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true)
    const { _id } = useParams()
    const [pictures, setPictures] = useState()
    const [isLoading, setIsLoading] = useState(true)

    // fetch data for one user
    useEffect(() => {
        setLoading(true)
        fetch(`/api/profile/${_id}`)
            .then((res) => res.json())
            .then((data) => {
                setUserData(data.data);
                setLoading(false)
        })
        .catch((err) => {
            "error";
        });
    }, [_id]);

    // fetch all pictures from one user
    useEffect(() => {
        setIsLoading(true)
        fetch(`/api/posts-by-user?user=${_id}`)
            .then((res) => res.json())
            .then((data) => {
                setPictures(data.data);
                setIsLoading(false)
        })
        .catch((err) => {
            "error";
        });
    }, [_id]);

    // function to follow/unfollow a user
    const handleFollow = () => {
        fetch('/api/follow', {
            body: JSON.stringify({
                _id: userData._id,
                user: user.sub,
            }),
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            })
        .then((res) => res.json())
        .then((data) => {
            window.location.reload();
        });
    };

    if (!isLoading && !isAuthenticated) {
        return (
            <Text>Please log in to see profiles</Text>
        )
    }

    return (
        <Body>
            {loading ? (
            <Loading>
                <FiLoader />
            </Loading>) : (
                <UserContainer>
                    {userData?.url ? (<Avatar src={userData.url} />) : (
                    <Avatar src={userData?.picture} />
                    )}
                    <UserInfo>
                        {/* only show the follow button if the user is logged in AND isn't looking at their own profile*/}
                        <Div>{isAuthenticated && 
                            <>
                            {user.sub !== userData._id &&
                            // if user is already following that person, it will show "unfollow"
                                <FollowButton onClick={() => handleFollow()}>
                                    {userData.followers?.some((follower) => {
                                        return follower.user === user.sub
                                    })
                                    ? <>unfollow</> : (
                                        <>follow</>
                                    )}
                                </FollowButton>
                            }
                            </>
                        }</Div>
                        <Section>
                            <Username>@{userData.nickname}</Username>
                        </Section>
                        <Section>
                            {userData.followers ? (<>
                                <Number>{userData.followers.length}</Number>
                                <Followers> followers</Followers>
                            </>) : (<>
                                <Number>0</Number>
                                <Followers> follower</Followers>
                            </>)}
                            
                            {userData.followings.length >= 1 ? ( <>
                                <Number>{userData.followings.length}</Number>
                                <Followers> followings</Followers>
                            </>) : (<>
                                <Number>0</Number>
                                <Followers> following</Followers>
                            </>)}

                        </Section>
                        <BioSection>
                            <NameSection>
                                <Name>{userData.handleName}</Name>
                                <Pronouns>{userData.pronouns}</Pronouns>
                            </NameSection>
                            <Bio>{userData.bio}</Bio>
                        </BioSection>
                    </UserInfo>
                </UserContainer>
            )}
            {/* ==============PICTURE SECTION================ */}
            {isLoading ? (            
            <Loading>
                <FiLoader />
            </Loading>) : (
            <>
            {/* if current logged in user doesn't have any picture, showing a link to upload new picture */}
            {pictures.length === 0 && user.sub === userData?._id ? (
                <Upload>
                    <Click>
                    Click
                        <StyledLink to="/newpost">
                            <FiPlusCircle />
                            </StyledLink> to start sharing!
                    </Click>
                </Upload>
            ) : (
            <>
            {pictures.map((picture) => {
                return (
                    <PostContainer key={picture.id}>
                        <Section1>
                            <Avatar1 src={userData?.url} />
                                <div>
                                    <Username1>@{picture.author}</Username1>
                                        <Film>Film stock used:
                                            <ClickFilm onClick={() => navigate(`/posts/${picture.filmStock}`)}>
                                                {picture.filmStock}
                                            </ClickFilm>
                                        </Film>
                                </div>
                        </Section1>
                        <PictureContainer onClick={() => navigate(`/post/${picture.id}`)}>
                            <Picture src={picture.url} />
                        </PictureContainer>
                        <StatsSection onClick={() => navigate(`/post/${picture.id}`)}>
                            <Icon>
                                <span>
                                    <AiOutlineHeart />
                                </span>
                            </Icon>
                            <Stats>{picture.likes.length}</Stats>
                                <Icon>
                                    <BiComment />
                                </Icon>
                            <Stats>{picture.comments.length}</Stats>
                        </StatsSection>
                            <Section1>
                                <Username2>@{picture.author}</Username2>
                                <Caption>{picture.caption}</Caption>
                            </Section1>
                    </PostContainer>
                )
            })}
                </>
            )}
            
            </>
            )}
        </Body>
    )
}
const Text = styled.div`
    font-size: 30px;
    color: 	#B0B0B0;
    padding: 30px;
    text-align: center;

`
const Body = styled.div`
    margin: 10px 50px 10px 50px;
    border: 1px solid #B0B0B0;
    border-radius: 10px;
    height: fit-content;
`
const Loading = styled.div`
    text-align: center;
    height: 100vh;
    font-size: 60px;
    margin-top: 100px;
    color: 	#B0B0B0;
`
const UserContainer = styled.div`
    display: flex;
    border-bottom: 1px solid #B0B0B0;
`
const Avatar = styled.img`
    border-radius: 50%;
    margin: 20px;
    width: 160px;
    border: 2px solid orange;
    padding: 5px;
`
const UserInfo = styled.div`
    margin: 40px;
`
const Div = styled.div`
    float: right;
`
const Section = styled.div`
    display: flex;
    margin: 10px 30px 10px 0;
    justify-content: space-evenly;
`
const Username = styled.div`
    font-size: 25px;
`
const Number = styled.div`
    font-weight: bold;
`
const Followers = styled.span`
    color: #B0B0B0;
    margin: 0 10px 0 10px;
`

const FollowButton = styled.button`
    background-color: orange;
    color: white;
    border: 2px solid orange;
    width: 80px;
    margin: 10px;
    padding: 5px;
    border-radius: 4px;
    :hover {
        cursor: pointer;
        background-color: #f5f5f7;
        color: orange;
    }
`
const Name = styled.div`
    font-weight: bold;
`
const Pronouns = styled.span`
    color: #A9A9A9;
    margin-left: 10px;
`
const NameSection = styled.div`
    display: flex;
`
const Bio = styled.div`
    margin-top: 10px;
`
const BioSection = styled.div`
    display: flex;
    flex-direction: column;
`
// ============================================================
const Upload = styled.div`
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Click = styled.div`
    font-size: 30px;
    color: #B0B0B0;
    padding: 10px;
    text-align: center;
`
const StyledLink = styled(NavLink)`
    margin-left: 10px;
    color: 	#B0B0B0;
    text-decoration: none;
    :hover {
        cursor: pointer;
        color: orange;
    }
`
const PostContainer = styled.div`
    margin: 20px 100px 20px 100px;
    padding: 15px;
    border: 0.5px solid #B0B0B0;
    border-radius: 7px;
    height: fit-content;
`
const Section1 = styled.div`
    display: flex;
`
const Avatar1 = styled.img`
    border-radius: 50%;
    width: 60px;
`
const Username1 = styled.div`
    font-size: 18px;
    padding: 13px 0 0 15px;
    font-weight: bold;
`
const Film = styled.div`
    padding-left: 20px;
    font-size: 15px;
`
const ClickFilm = styled.span`
    margin-left: 5px;
    font-weight: bold;
    :hover {
        cursor: pointer;
        color: orange;
    }
`
const PictureContainer = styled.div`
    display: flex;
    justify-content: center;
    :hover {
        cursor: pointer;
    }
`
const Picture = styled.img`
    height: 400px;
    margin-top: 10px;
`
const StatsSection = styled.div`
    display: flex;
    margin: 7px 5px 0 20px;
    :hover {
        cursor: pointer;
    }
`
const Icon = styled.span`
    font-size: 20px;
    margin-right: 5px;
`
const Stats = styled.div`
    margin-right: 30px;
    font-weight: bold;
`
const Username2 = styled.div`
    font-weight: bold;
    margin: 0 10px 0 20px;
    font-size: 16px;
`
const Caption = styled.span`
    font-size: 16px;
`
export default Profile;