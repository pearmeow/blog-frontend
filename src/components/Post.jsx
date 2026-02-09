import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import isAuthorized from "../auth.jsx";
import { useParams } from "react-router";
import Comment from "./Comment.jsx";
import Logout from "./Logout.jsx";
import Form from "./Form.jsx";
import Button from "./Button.jsx";
import { jwtDecode } from "jwt-decode";
import styles from "./Post.module.css";
import { format } from "date-fns";

function Post() {
    const [post, setPost] = useState(null);
    const [update, forceUpdate] = useState(0);
    const decoded = jwtDecode(localStorage.getItem("token"));
    const [errorMessage, setErrorMessage] = useState(null);

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
                let result = await res.json();
                console.log(result);
                setErrorMessage(result);
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
        // form is just for formatting lol
        return (
            <>
                <p>This post doesn't exist!</p>
                <Form>
                    <Link to="/posts" className={styles.formLink}>
                        <Button
                            text="Back to posts"
                            className={styles.formLink}
                        />
                    </Link>
                    <Logout className={styles.formLink} />
                </Form>
            </>
        );
    }

    let errs = [];
    if (errorMessage) {
        for (const err of errorMessage) {
            errs.push(err.msg);
        }
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

    let articleText = post.text.split("\n");
    let paragraphs = [];
    let order = 0;
    for (const para of articleText) {
        paragraphs.push(<p key={order}>{para}</p>);
        ++order;
    }

    return (
        <div className={styles.article}>
            <h1 className={styles.title}>
                {post.title} by {post.author.username}
            </h1>
            <p>Posted on {format(post.date, "PP, p")}</p>
            {paragraphs}
            {comments.length == 0 ? <p>No comments yet!</p> : <p>Comments</p>}
            {comments}

            {errs}
            <Form onSubmit={handleNewComment}>
                <p className={styles.newComment}>
                    <label htmlFor="text">New comment</label>
                    <textarea
                        name="text"
                        id="1"
                        maxLength={500}
                        required
                    ></textarea>
                </p>
                <Button type="submit" text="Post comment" />
                <Link to="/posts" className={styles.formLink}>
                    <Button text="Back to posts" className={styles.formLink} />
                </Link>
                <Logout className={styles.formLink} />
            </Form>
        </div>
    );
}

export default Post;
