import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { FaRegHeart, FaRegComment } from "react-icons/fa";

const PostDetails = () => {
    const [post, setPost] = useState()
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()

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

    return (
            <Body>
                {loading ? ("LOADING") : (
                    <>
                    <PostContainer>
                        <Section>
                            <Avatar src={window.location.origin + "/users/karina.jpg"} />
                            <div>
                                <Username 
                                onClick={() => navigate(`/profile/${post.user}`)}
                                >@{post.user}</Username>
                                <Film>{post.filmStock}</Film>
                            </div>
                        </Section>
                        <Picture src={post.url} />
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
                            <Username2>{post.authorHandle}</Username2>
                            <span>{post.caption}</span>
                        </Section>
                        <CommentsSection>
                            {/* {post.comments.map((comment) => {
                                return (
                                    <div key={Math.random * 140000000000}>
                                        <CommenterAvatar src={window.location.origin + "/users/nick.jpg"} />
                                        <Username3>{comment.authorHandle}: </Username3>
                                        <Comments>{comment.comment}</Comments>
                                    </div>
                                )
                            })} */}
                            <AddCommentSection>
                                <WriteComment
                                    placeholder="Write a comment.."
                                >
                                </WriteComment> 
                                <Submit type="submit">Submit comment</Submit>
                                
                            </AddCommentSection>
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
    cursor: pointer;
`
const Film = styled.div`
margin-top: 5px;
    padding-left: 20px;
    font-size: 15px;
`
const Picture = styled.img`
    width: 100%;
    margin-top: 10px;
`
const StatsSection = styled.div`
    display: flex;
    margin: 5px 0 5px 13px;
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
    margin-right: 13px;
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
const AddCommentSection = styled.div`
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
