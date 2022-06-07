import styled from 'styled-components';
import { useEffect, useState } from "react";
import { FaRegHeart, FaRegComment } from "react-icons/fa"

const Homepage = () => {
    const [posts, setPosts] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch("/api/posts")
            .then((res) => res.json())
            .then((data) => {
                console.log(data.response)
                setPosts(data.response);
                setLoading(false)
        })
        .catch((err) => {
            "error";
        });
    }, []);

    return (
        <Body>
            {loading ? ("LOADING") : (
                <>{posts.map((post) => {
                    return (
                        <PostContainer key={post.postId}>
                            <Section>
                                <Avatar src={window.location.origin + "/users/karina.jpg"} />
                                <div>
                                    <Username>@{post.authorHandle}</Username>
                                    <Film>{post.filmStock}</Film>
                                </div>
                            </Section>
                            <Picture src={window.location.origin + "/posts/sutton2.jpg"}/>
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
                                <Username2>@karina52</Username2>
                                <span>{post.caption}</span>
                            </Section>
                            <CommentsSection>
                                <CommenterAvatar src={window.location.origin + "/users/nick.jpg"} />
                                <Username3>@nickynick:</Username3>
                                <Comments>Amazing shot!</Comments>
                            </CommentsSection>
                            <Border />
                        </PostContainer>
                    )
                })}</>
            )}
        </Body>
    )
}
const Body = styled.div`
    margin: 30px 170px 30px 170px;
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
    width: 50px;
    border: 1px solid #B0B0B0;
`
const Username = styled.div`
    font-size: 20px;
    padding: 15px 0 0 15px;
    font-weight: bold;
`
const Film = styled.div`
    padding-left: 20px;
    font-size: 15px;
`

const Picture = styled.img`
    width: 100%;
    border: 1px solid #B0B0B0;
    margin-top: 10px;
`
const StatsSection = styled.div`
    display: flex;
    margin: 5px;
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
    margin-right: 10px;
`
const CommentsSection = styled.div`
    display: flex;
    margin-left: 20px;
`
const CommenterAvatar = styled.img`
    border-radius: 50%;
    width: 30px;
    border: 1px solid #B0B0B0;
    margin: 10px 0 0 10px;
`
const Username3 = styled.div`
    padding: 15px 5px 0 10px;
`
const Comments = styled.span`
    padding: 15px 5px 0 10px;
`
const Border = styled.div`
    margin-top: 30px;
    border-bottom: 1px solid #B0B0B0;
`
export default Homepage;