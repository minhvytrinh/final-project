import styled from 'styled-components';
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { FiLoader } from "react-icons/fi";

const Homepage = () => {
    const { posts } = useContext(GlobalContext)
    const [userData, setUserData] = useState();
    const { _id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        fetch(`/api/profile/${_id}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log("userData", data.data)
                setUserData(data.data);
                setLoading(false)
        })
        .catch((err) => {
            "error";
        });
    }, [_id]);

    return (
        <>{loading ? 
            (<Loading>
            <FiLoader />
        </Loading>) : (
        <Body>
            {!userData.followings || userData.followings.length < 1 ? (<>
            <Text>Start following users to have a feed!
                <div>
                    <StyledLink to="/">Click here to explore</StyledLink>
                </div>
            </Text>
            </>) : (<> 
                {posts?.map((post) => {
                    if (userData.followings?.some((following) => following._id === post.user)) {
                        return (
                            <PostContainer key={post._id}>
                                <Section>
                                    <Avatar src={post.avatar} />
                                    <div>
                                        <Username onClick={() => navigate(`/profile/${post.user}`)}>
                                            @{post.author}
                                        </Username>
                                        <Film>Film stock used:
                                            <ClickFilm onClick={() => navigate(`/posts/${post.filmStock}`)}>
                                                {post.filmStock}
                                            </ClickFilm>
                                        </Film>
                                    </div>
                                </Section>
                                <PictureContainer onClick={() => navigate(`/post/${post.id}`)}>
                                    <Picture src={post.url} />
                                </PictureContainer>
                                <StatsSection onClick={() => navigate(`/post/${post.id}`)}>
                                    <Icon>
                                        <Span>
                                            <AiOutlineHeart />
                                        </Span>
                                    </Icon>
                                    <Stats>{post.likes.length}</Stats>
                                    <Icon>
                                        <BiComment />
                                    </Icon>
                                    <Stats>{post.comments.length}</Stats>
                                </StatsSection>
                                <Section>
                                    <Username2 onClick={() => navigate(`/profile/${post.user}`)}>
                                        @{post.author}
                                    </Username2>
                                    <Caption>{post.caption}</Caption>
                                </Section>
                            </PostContainer>
                        )
                    }
                })}
            </>)}
        </Body>
    )}
    </>
    )
}
const Loading = styled.div`
    text-align: center;
    height: 100vh;
    font-size: 60px;
    margin-top: 100px;
    color: 	#B0B0B0;
`
const Body = styled.div`
    margin: 30px 120px 30px 120px;
`
const Text = styled.div`
    font-size: 30px;
    color: 	#B0B0B0;
    padding: 10px;
    text-align: center;
`
const StyledLink = styled(NavLink)`
    text-decoration: none;
    text-align: center;
    font-size: 25px;
    color: black;
    :hover {
        cursor: pointer;
        color: orange;
    }
`
const PostContainer = styled.div`
    margin: 10px;
    padding: 15px;
    border: 1px solid #B0B0B0;
    border-radius: 10px;
    height: fit-content;
`
const Section = styled.div`
    display: flex;
`
const Avatar = styled.img`
    border-radius: 50%;
    width: 60px;
    :hover {
        cursor: pointer;
        width: 56px;
        border: 2px solid orange;
    }
`
const Username = styled.div`
    font-size: 18px;
    padding: 13px 0 0 15px;
    font-weight: bold;
    :hover {
        cursor: pointer;
        color: orange;
    }
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
    :hover {
        cursor: pointer;
        color: orange;
    }
`
const Caption = styled.span`
    font-size: 16px;
`
const Span = styled.span`
        :hover {
        cursor: pointer;
        color: orange;
    }
`
export default Homepage;