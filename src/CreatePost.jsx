import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

import "./CreatePost.css";

function CreatePost() {
  const [titleState, setTitleState] = useState("");
  const [postbodyState, setPostbodyState] = useState("");
  const [publishedState, setPublishedState] = useState(false);
  const { userState, tokenState } = useAuth();

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const fetchCreate = async () => {
      const url = "http://localhost:3000/posts";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${tokenState}`,
          },
          body: JSON.stringify({
            title: titleState,
            postbody: postbodyState,
            published: publishedState,
            authorID: userState.id,
          }),
        });
        const nextresponse = await response.json();
        if (nextresponse.id && publishedState === true) {
          alert("Post Published");
          navigate("/posts");
        } else if (nextresponse.id && publishedState === false) {
          alert("Draft Saved");
          navigate("/posts");
        } else alert("Hmmm, try again.");
      } catch (error) {
        console.error(error);
      }
    };
    fetchCreate();
  }

  return (
    <>
      <div className="create-div">
        <form className="create-form" onSubmit={handleSubmit}>
          <div className="form-fields">
            <div className="create-user">
              <h1>Create Post</h1>
            </div>
            <div className="form-field">
              <label className="form-label">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form-input"
                  placeholder=" "
                  value={titleState}
                  onChange={(e) => setTitleState(e.target.value)}
                  required
                />
                <span>Post Title</span>
              </label>
            </div>
            <div className="form-field">
              <label className="form-label">
                <textarea
                  type="text"
                  name="postbody"
                  id="postbody"
                  className="form-input"
                  placeholder=" "
                  value={postbodyState}
                  onChange={(e) => setPostbodyState(e.target.value)}
                  required
                />
                <span>Post Body</span>
              </label>
            </div>
            <div>
              <label htmlFor="published" className="published">
                Publish?
              </label>
              <input
                type="checkbox"
                name="published"
                id="published"
                className="form-input"
                checked={publishedState}
                onChange={() => setPublishedState(!publishedState)}
              />
            </div>
          </div>
          {publishedState ? (
            <button type="submit" className="form-button">
              Publish
            </button>
          ) : (
            <button type="submit" className="form-button">
              Save Draft
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default CreatePost;
