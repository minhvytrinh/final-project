import styled from 'styled-components';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { NotificationManager } from "react-notifications";
import { CgTrash } from "react-icons/cg";

// this component is the comment section, responsible for the adding and deleting a comment feature
const Comment = ( { post } ) => {
    const { user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();
    const [commentInput, setCommentInput] = useState("");

    // ======Adding a new comment function======
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
        .catch((err) => {
            "error"
        })
    }
    // ======Deleting a comment function======
    const deleteComment = (comment) => {
        fetch(`/api/delete-comment`, {
            body: JSON.stringify({
                postId: post.id,
                comment
            }),
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            })
            .then((res) => res.json())
            .then((data) => {
                NotificationManager.success(
                "Comment successfully deleted!",
                "Success!"
                );
                window.location.reload();
            })
            .catch((err) => {
                "error";
            });
        };

    return (
        <CommentsSection>
        {post.comments.map((comment) => {
            return (
                <div key={comment.commentId}>
                <Username onClick={() => navigate(`/profile/${comment.authorHandle}`)}>
                    @{comment.nickname}
                </Username>commented: 
                    <Comments>{comment.comment}</Comments>

                    {/* only the author of the comment and the picture publisher have the power to delete a comment */}
                    {isAuthenticated && <>
                        {comment.authorHandle === user.sub || user.sub === post.user ? (
                            <TrashIcon onClick={() => deleteComment(comment)} >
                                <CgTrash />
                            </TrashIcon>
                        ) : ("")
                        }
                    </>}
                </div>
            )
        })}
        {/* only a logged in user can leave a comment on picture */}
        {isAuthenticated ? (
            <AddCommentForm 
            onSubmit={(e) => {
                handleNewComment(e)
            }}>
                <WriteComment
                placeholder="Write a comment..."
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
        ) : (
            <Disabled>
                <AddCommentForm>
                    <WriteComment
                    disabled
                    placeholder="Please sign in to write a comment.">
                    </WriteComment> 
                        <DisabledSubmit
                        disabled
                        >Submit comment
                        </DisabledSubmit>
                </AddCommentForm>
            </Disabled>
        )}
        </CommentsSection>
    )
}

const CommentsSection = styled.div`
    display: flex;
    margin: 10px 0 0 20px;
    flex-direction: column;
`
const Username = styled.span`
    padding: 15px 5px 0 10px;
    font-weight: bold;
    :hover {
        cursor: pointer;
        color: orange;
    }
`
const Comments = styled.span`
    padding: 15px 5px 0 10px;
`
const AddCommentForm = styled.form`
    text-align: center;
    margin-top: 10px;
`
const WriteComment = styled.input`
    width: 300px;
    padding: 5px;
    border: 2px solid orange;
    border-radius: 10px;
    font-family: 'Quicksand';
    :focus {
        outline: none;
    }
`
const Submit = styled.button`
    background-color: orange;
    color: white;
    border: 2px solid orange;
    width: 150px;
    margin: 10px;
    padding: 5px;
    border-radius: 4px;
    :hover {
        cursor: pointer;
        background-color: #f5f5f7;
        color: orange;
    }
`
const Disabled = styled.span`
    :hover {
        cursor: not-allowed;
    }
`
const TrashIcon = styled.span`
    float: right;
    :hover {
        cursor: pointer;
        color: orange;
    }
`
const DisabledSubmit = styled.button`
    background-color: orange;
    color: white;
    border: 2px solid orange;
    width: 150px;
    margin: 10px;
    padding: 5px;
    border-radius: 4px;
    :hover {
        cursor: not-allowed;
        background-color: #f5f5f7;
        color: orange;
    }
`
export default Comment;