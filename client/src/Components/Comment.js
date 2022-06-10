import styled from 'styled-components';
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { NotificationManager } from "react-notifications";
import { CgTrash } from "react-icons/cg";

const Comment = ({comment}) => {
    const { user, isAuthenticated } = useAuth0();
    const [commentInput, setCommentInput] = useState("");
    const navigate = useNavigate();

    return (
        <>
        {/* <Username3 
        onClick={() => navigate(`/profile/${comment.authorHandle}`)}
        >@{comment.nickname}</Username3>commented: 
            <Comments>{comment.comment}</Comments>
            {comment.authorHandle === user.sub &&
            <TrashIcon>
                <CgTrash />
            </TrashIcon>
        }
                            )
                        })}
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
                                        disabled>Submit comment</DisabledSubmit>
                                    </AddCommentForm>
                                </Disabled>
                            )} */}
        </>
    )
}

export default Comment;