import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import formatDate from "../util/formatDate";
import { useNavigate } from "react-router-dom";
import "./Post.css";

function Post() {
  const params = useParams();
  const [post, setPost] = useState([]);
  const [commentState, setCommentState] = useState([]);
  const { userState, tokenState } = useAuth();
  const [refresh, setRefresh] = useState(0);
  const [replyState, setReplyState] = useState();
  const [replyingToCommentIDState, setReplyingToCommentIDState] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchposts = async () => {
      const url = `http://localhost:3000/posts/allPosts/${params.postID}`;
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${tokenState}`,
          },
        });
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

  function handleDeletePost(e) {
    e.preventDefault();

    const deletePost = async () => {
      const url = `http://localhost:3000/posts/${params.postID}`;
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokenState}`,
          },
        });
        const nextresponse = await response.json();
        if (nextresponse.id) {
          alert("Post Deleted");
          setRefresh((prev) => prev + 1);
          navigate("/posts");
        }
      } catch (error) {
        console.error(error);
      }
    };
    deletePost();
  }

  function handleReplySubmit(e) {
    e.preventDefault();

    const fetchReply = async () => {
      const url = `http://localhost:3000/posts/${params.postID}/${replyingToCommentIDState}/replies`;
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${tokenState}`,
          },
          body: JSON.stringify({
            replybody: replyState,
            commentID: replyingToCommentIDState,
            authorID: userState.id,
          }),
        });
        const nextresponse = await response.json();
        if (nextresponse.id) {
          alert("Reply Posted");
          setRefresh((prev) => prev + 1);
          setReplyState("");
          setReplyingToCommentIDState("");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchReply();
  }

  function handleCommentSubmit(e) {
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

  function handleDeleteComment(e, commentID) {
    e.preventDefault();

    const deleteComment = async () => {
      const url = `http://localhost:3000/posts/${params.postID}/comments/${commentID}`;
      try {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokenState}`,
          },
        });
        const nextresponse = await response.json();
        if (nextresponse.id) {
          alert("Comment Deleted");
          setRefresh((prev) => prev + 1);
        }
      } catch (error) {
        console.error(error);
      }
    };
    deleteComment();
  }
  return (
    <>
      <main className="post-div">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-wrapper">
          <p>{post.postbody}</p>
          <Link
            class="delete-post"
            onClick={(e) => {
              handleDeletePost(e, post.id);
            }}
          >
            Delete
          </Link>
          <div className="post-date-div">
            <p>{formatDate(post.posttime)}</p>
          </div>
        </div>
        {userState ? (
          <form onSubmit={handleCommentSubmit}>
            <div className="post-comments-div">
              <label htmlFor="post-comment">
                <textarea
                  className="post-comment-box"
                  name="commentbody"
                  placeholder=" "
                  id="post-comment"
                  value={commentState}
                  onChange={(e) => setCommentState(e.target.value)}
                />
                <span>Comment on your post?</span>
              </label>
              <button type="submit" class="form-button">
                Submit Comment
              </button>
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
            <div key={comment.id} className="comment-div">
              <div className="comment-wrapper">
                <p className="comment-author">
                  {comment.author.screenname
                    ? comment.author.screenname
                    : "anonymous"}
                </p>
                <div className="comment-body">
                  <p>&ldquo;{comment.commentbody}&rdquo;</p>
                </div>

                <p className="comment-time">
                  {formatDate(comment.commenttime)}
                </p>
              </div>
              <div className="reply-delete-div">
                <Link
                  onClick={() =>
                    replyingToCommentIDState === ""
                      ? setReplyingToCommentIDState(comment.id)
                      : setReplyingToCommentIDState("")
                  }
                >
                  Reply
                </Link>
                <Link
                  onClick={(e) => {
                    handleDeleteComment(e, comment.id);
                  }}
                >
                  Delete
                </Link>
              </div>
              {replyingToCommentIDState === comment.id ? (
                <div className="reply-area">
                  <form onSubmit={handleReplySubmit}>
                    <div className="post-comments-div">
                      <label htmlFor="post-comment">
                        <textarea
                          className="post-comment-box form-input"
                          name="commentbody"
                          id="post-comment"
                          placeholder=" "
                          value={replyState}
                          onChange={(e) => setReplyState(e.target.value)}
                        />
                        <span>Reply to Comment</span>
                      </label>
                      <button type="submit" className="form-button">
                        Submit Reply
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                ""
              )}
              {comment.reply?.length > 0 && (
                <div className="reply-div">
                  {comment.reply?.map((r) => (
                    <div className="reply-wrapper">
                      <p className="comment-author">
                        {r.author.screenname
                          ? r.author.screenname
                          : "anonymous"}
                        :
                      </p>
                      <div>&rdquo;{r.replybody}&ldquo;</div>

                      <p className="comment-time">{formatDate(r.replytime)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Post;
