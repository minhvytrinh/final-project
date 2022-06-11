import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import Comment from "./Comment";
import { NotificationManager } from "react-notifications";

const PostDetails = () => {
    const { user, isAuthenticated } = useAuth0();
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const [like, setLike] = useState(false)
    console.log("current user", user)

// ======fetching a single picture data======
    useEffect(() => {
        setLoading(true)
        fetch(`/api/post/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("single post", data.data)
                setPost(data.data);
                setLoading(false)
        })
        .catch((err) => {
            "error";
        });
    }, [id]);

// ======LIKE BUTTON FUNCTION======
    const handleLikes = () => {
        if (isAuthenticated) {
            fetch('/api/updating-likes', {
                body: JSON.stringify({
                    id: post.id,
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
                setLike(true);
                window.location.reload();
                } else {
                setLike(false);
                window.location.reload();
                }
            });
        } else {
            NotificationManager.warning(
                "Please log in to like or comment on a post.",
                "Warning!"
            );
        }
    };

    return (
        <Body>
            {loading ? ("LOADING") : (
                <>
                <PostContainer>
                    <Section>
                        <Avatar src={post.avatar} />
                        <div>
                            <Username 
                            onClick={() => navigate(`/profile/${post.user}`)}
                            >@{post.author}
                            </Username>
                            <Film>Film stock used:
                                <ClickFilm onClick={() => navigate(`/posts/${post.filmStock}`)}>
                                    {post.filmStock}
                                </ClickFilm>
                            </Film>
                        </div>
                    </Section>
                    <PictureContainer>
                        <Picture src={post.url} />
                    </PictureContainer>
                    <StatsSection>
                        <Icon>
                            <HeartIcon onClick={() => handleLikes()}>
                            {post.likes.some((like) => {
                                return like.user === user.sub
                            }) ? <AiFillHeart /> : <AiOutlineHeart />}
                            </HeartIcon>
                        </Icon>
                        <Stats>
                            <Bold>{post.likes.length}</Bold>
                        {post.likes > 1 ? (<> likes</>) : (<> like</>)}
                        </Stats>
                        <Icon>
                            <BiComment />
                        </Icon>
                        <Stats>
                            <Bold>{post.comments.length}</Bold> 
                        {post.comments > 1 ? (<> comments</>) : (<> comment</>)}
                        </Stats>
                    </StatsSection>
                    <Section>
                        <Username2
                        onClick={() => navigate(`/profile/${post.user}`)}
                        >@{post.author}</Username2>
                        <Caption>{post.caption}</Caption>
                    </Section>
                    <Comment post={post} />
                </PostContainer>
                </>
            )}
        </Body>
    )
}

const Body = styled.div`
    margin: 30px 70px 30px 70px;
    border: 1px solid #B0B0B0;
    border-radius: 10px;
    height: fit-content;
`
const PostContainer = styled.div`
    margin: 20px;
`
const Section = styled.div`
    display: flex;
`
const Avatar = styled.img`
    border-radius: 50%;
    width: 70px;
    border: 1px solid #B0B0B0;
`
const Username = styled.div`
    font-size: 20px;
    padding: 15px 0 0 15px;
    font-weight: bold;
    :hover {
        cursor: pointer;
        color: orange;
    }
`
const Film = styled.div`
    margin-top: 5px;
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
`
const Picture = styled.img`
    width: 700px;
    margin-top: 10px;
`
const StatsSection = styled.div`
    display: flex;
    margin: 20px 0 5px 13px;
`
const Icon = styled.span`
    font-size: 20px;
    margin-right: 5px;
`
const HeartIcon = styled.span`
    :hover {
        cursor: pointer;
        color: orange;
    }
`
const Stats = styled.div`
    margin-right: 30px;
`
const Bold = styled.span`
    font-weight: bold;
`
const Username2 = styled.div`
    font-weight: bold;
    margin: 0 10px 0 13px;
    font-size: 20px;
    :hover {
        cursor: pointer;
        color: orange;
    }
`
const Caption = styled.span`
    font-size: 20px;
`
export default PostDetails;
