import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import formatDate from "../utils/formatDate";
import "./Post.css";

function Post() {
  const params = useParams();
  const [post, setPost] = useState([]);
  const [commentState, setCommentState] = useState([]);
  const { userState, tokenState } = useAuth();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchposts = async () => {
      const url = `http://localhost:3000/posts/${params.postID}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        setPost(result);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchposts();
  }, [refresh]);

  function handleSubmit(e) {
    e.preventDefault();

    const fetchComment = async () => {
      const url = `http://localhost:3000/posts/${params.postID}/comments`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${tokenState}`,
          },
          body: JSON.stringify({
            commentbody: commentState,
            postID: params.postID,
            authorID: userState.id,
          }),
        });
        const nextresponse = await response.json();
        if (nextresponse.id) {
          alert("Comment Posted");
          setRefresh((prev) => prev + 1);
          setCommentState("");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchComment();
  }

  return (
    <>
      <main className="post-div">
        <h1 className="post-title">{post.title}</h1>
        <p>{post.postbody}</p>
        <div className="date-div">
          <p>{formatDate(post.posttime)}</p>
        </div>
        {userState ? (
          <form onSubmit={handleSubmit}>
            <div className="post-comments-div">
              <label htmlFor="post-comment">
                Have a comment? Let's hear it.
              </label>
              <textarea
                className="post-comment-box"
                name="commentbody"
                id="post-comment"
                value={commentState}
                onChange={(e) => setCommentState(e.target.value)}
              />
              <button type="submit">Submit Comment</button>
            </div>
          </form>
        ) : (
          <div>
            <p>
              Want to comment? <Link to="/login">Login</Link>or{" "}
              <Link to="/createUser">Register</Link>
            </p>
          </div>
        )}
        <div className="comments-div">
          <h2 className="comments-title">Comments:</h2>
          {post.comments?.map((comment) => (
            <div className="comment-div">
              <p>{comment.commentbody}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Post;
