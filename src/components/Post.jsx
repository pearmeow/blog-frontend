import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import isAuthorized from "../auth.jsx";
import { useParams } from "react-router";
import Comment from "./Comment.jsx";
import Logout from "./Logout.jsx";
import Form from "./Form.jsx";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import { jwtDecode } from "jwt-decode";

function Post() {
    const [post, setPost] = useState(null);
    const [update, forceUpdate] = useState(0);
    const decoded = jwtDecode(localStorage.getItem("token"));

    let navigate = useNavigate();
    let params = useParams();
    const postId = Number(params.postId);
    useEffect(() => {
        (async () => {
            if (!isAuthorized()) {
                navigate("/");
            }
            try {
                const res = await fetch(
                    import.meta.env.VITE_API + "posts/" + postId,
                    {
                        method: "GET",
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    },
                );
                if (!res.ok) {
                    console.log(
                        "O you don't have the right! O you don't have the right!",
                    );
                    return;
                }
                const data = await res.json();
                console.log(data);
                setPost(data);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [navigate, postId, update]);

    const handleNewComment = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const text = formData.get("text");
        try {
            const res = await fetch(
                import.meta.env.VITE_API + "posts/" + postId + "/comments",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                    body: JSON.stringify({
                        postId,
                        text,
                    }),
                },
            );
            if (!res.ok) {
                console.log(
                    "O you don't have the right! O you don't have the right!",
                );
            } else {
                let result = await res.json();
                console.log(result);
                forceUpdate(update + 1);
            }
        } catch (err) {
            console.log(err);
            return;
        }
    };

    if (!post) {
        return (
            <>
                <p>This post doesn't exist!</p>
                <Link to="/posts">Back to posts</Link>
                <Logout />
            </>
        );
    }

    let comments = [];
    for (const comm of post.comments) {
        comments.push(
            <Comment
                key={comm.id}
                commentId={comm.id}
                post={post}
                author={comm.author.username}
                text={comm.text}
                authorId={comm.author.id}
                userId={decoded.id}
                update={update}
                forceUpdate={forceUpdate}
            />,
        );
    }

    return (
        <>
            <p>{post.title}</p>
            <p>{post.text}</p>
            {comments.length == 0 ? <p>No comments yet!</p> : <p>Comments</p>}
            {comments}

            <p>New comment</p>
            <Form onSubmit={handleNewComment}>
                <Input type="text" labelName="Text" name="text" id={1} />
                <Button type="submit" text="Post comment" />
            </Form>
            <Logout />
            <p>
                <Link to="/posts">Back to posts</Link>
            </p>
        </>
    );
}

export default Post;
