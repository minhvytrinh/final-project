import { useEffect, useState } from "react";
import styled from 'styled-components';
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    let navigate = useNavigate();
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true)
    const { _id } = useParams()
    const [follow, setFollow] = useState(false)
    const [pictures, setPictures] = useState()
    const [isLoading, setIsLoading] = useState(true)

    // fetch info data for one user
    useEffect(() => {
        setLoading(true)
        fetch(`/api/profile/${_id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("profile", data.data)
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

    // function to follow a user
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
            if (data.status === 200) {
            setFollow(true);
            } else {
            setFollow(false);
            }
        });
    };

    return (
        <Body>
            {loading ? "loading" : (
                <UserContainer>
                    {userData.url ? (<Avatar src={userData.url} />) : (
                    <Avatar src={userData.picture} />
                    )}
                    <UserInfo>
                    <Div>{isAuthenticated && 
                                <>{user.sub !== userData._id &&
                                <>{!follow ? (
                                <FollowButton
                                onClick={() => handleFollow()}
                                >follow</FollowButton>
                                ) : (
                                    <FollowButton
                                    onClick={() => handleFollow()}
                                    >unfollow</FollowButton>
                                )}
                                </>
                                }
                                </>
                            }
                            </Div>
                        <Section>
                            <Username>@{userData.nickname}</Username>
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
            {isLoading ? "loading" : (
            <>
            {pictures?.map((picture) => {
                return (
                    <PostsContainer key={picture.id}>
                        <Post 
                        onClick={() => navigate(`/post/${picture.id}`)}
                        src={picture.url} />
                    </PostsContainer>
                )
            })}
            </>
            )}
        </Body>
    )
}
const Body = styled.div`
    margin: 5px;
    border: 1px solid #B0B0B0;
    border-radius: 10px;
    height: fit-content;
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
    margin: 20px 30px 20px 0;
    justify-content: space-evenly;
`
const Username = styled.div`
    font-size: 25px;
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
const PostsContainer = styled.div`
    margin: 0 5px 5px 5px;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
`
const Post = styled.img`
    margin: 10px;
    height: 300px;
    cursor: pointer;

`;
export default Profile;