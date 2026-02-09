import Button from "./Button";
import Form from "./Form";

function Comment({
    text,
    author,
    post,
    commentId,
    forceUpdate,
    update,
    authorId,
    userId,
}) {
    const handleDeleteComment = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch(
                import.meta.env.VITE_API +
                    "posts/" +
                    post.id +
                    "/comments/" +
                    commentId,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                },
            );
            if (!res.ok) {
                console.log(
                    "O you don't have the right. O you don't have the right!",
                );
            } else {
                forceUpdate(update + 1);
            }
        } catch (err) {
            console.log(err);
            return;
        }
    };

    return (
        <>
            <p>
                {author}: {text + "  "}
                {authorId === userId && (
                    <button onClick={handleDeleteComment}>Delete</button>
                )}
            </p>
        </>
    );
}

export default Comment;
