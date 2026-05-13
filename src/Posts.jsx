import { useEffect, useState } from "react";
import formatDate from "../util/formatDate";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

import "./Posts.css";

function Posts() {
  const [posts, setPosts] = useState([]);
  const { userState, tokenState } = useAuth();

  useEffect(() => {
    const fetchposts = async () => {
      const url = "http://localhost:3000/posts/allPosts/";
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
        setPosts(result);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchposts();
  }, []);

  return (
    <>
      <main className="blog-main">
        <h1 className="blog-title">The Blog</h1>
        {posts.map((post) => (
          <div className="blog-div" key={post.id}>
            <h2 className="blog-title">{post.title}</h2>
            <p className="blog-body">{post.postbody.slice(0, 200)}...</p>

            <div className="blog-time-comments-read">
              <div className="blog-link-date">
                <Link className="blog-link" to={`/posts/${post.id}`}>
                  Read Post
                </Link>
                <p className="blog-time">{formatDate(post.posttime)}</p>
                {!post.published ? (
                  <p className="unpublished">DRAFT POST</p>
                ) : (
                  ""
                )}
              </div>
              <p className="blog-comments">comments: {post._count.comments}</p>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}

export default Posts;
