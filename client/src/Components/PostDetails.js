import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { NotificationManager } from "react-notifications";

const PostDetails = () => {
    const { user, isAuthenticated } = useAuth0();
    const [post, setPost] = useState();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();
    const [commentInput, setCommentInput] = useState("");
    const [like, setLike] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`/api/post/${id}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("post", data.data)
                setPost(data.data);
                setLoading(false)
        })
        .catch((err) => {
            "error";
        });
    }, [id]);

    const handleNewComment = (e) => {
        e.preventDefault();
        fetch("/api/new-comment", {
            body: JSON.stringify({
                picture: user.picture,
                nickname: user.nickname,
                id: post.id,
                user: user.sub,
                comment: commentInput
            }),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) => res.json())
        .then((data) => {
            NotificationManager.success(
                "Comment successfully added!",
                "Success!"
            );
            window.location.reload();
        })
        .catch((error) => {
            console.log("error")
        })
    }

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
                            >@{post.author}</Username>
                            <Film>{post.filmStock}</Film>
                        </div>
                    </Section>
                    <PictureContainer>
                        <Picture src={post.url} />
                    </PictureContainer>
                    <StatsSection>
                        <Icon>
                            <FaRegHeart />
                        </Icon>
                        <Stats><Bold>{post.numOfLikes}</Bold> likes</Stats>
                        <Icon>
                            <FaRegComment />
                        </Icon>
                        <Stats><Bold>{post.numOfComments}</Bold> comments</Stats>
                    </StatsSection>
                    <Section>
                        <Username2>@{post.author}</Username2>
                        <span>{post.caption}</span>
                    </Section>

                    <CommentsSection>
                        {post.comments.map((comment) => {
                            return (
                                <div key={Math.random() * 140000000000000}>
                                    <CommenterAvatar src={comment.picture} />
                                    <Username3>@{comment.nickname} says: </Username3>
                                    <Comments>{comment.comment}</Comments>
                                </div>
                            )
                        })}
                        {isAuthenticated && 
                            <AddCommentForm 
                                    onSubmit={(e) => {
                                        handleNewComment(e)
                                    }}>
                                <WriteComment
                                    placeholder="Write a comment.."
                                    value={commentInput}
                                    onChange = {(e) => {
                                        setCommentInput(e.target.value)}}
                                >
                                </WriteComment> 
                                <Submit
                                type="submit"
                                >Submit comment
                                </Submit>
                            </AddCommentForm>
                        }
                    </CommentsSection>
                    
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
const PictureContainer = styled.div`
    height: 500px;
    display: flex;
    justify-content: center;
`
const Picture = styled.img`
    height: 100%;
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
const Stats = styled.div`
    margin-right: 30px;
`
const Bold = styled.span`
    font-weight: bold;
`
const Username2 = styled.div`
    font-weight: bold;
    margin: 0 10px 0 13px;
`
const CommentsSection = styled.div`
    display: flex;
    margin-left: 20px;
    flex-direction: column;
`
const CommenterAvatar = styled.img`
    border-radius: 50%;
    width: 30px;
    border: 1px solid #B0B0B0;
    margin: 10px 0 0 10px;
`
const Username3 = styled.span`
    padding: 15px 5px 0 10px;
`
const Comments = styled.span`
    padding: 15px 5px 0 10px;
`
const AddCommentForm = styled.form`
    margin: 20px 0 0 50px;
`
const WriteComment = styled.textarea`
`
const Submit = styled.button`
    margin-left: 20px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: white;
    padding: 5px 7px 5px 5px;
    border-radius: 4px;
    border: 1px solid #B0B0B0;
    &:hover {
    cursor: pointer;
    }
`
export default PostDetails;
