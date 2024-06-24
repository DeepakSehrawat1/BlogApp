import { useEffect, useState } from "react";
import Post from "../post.js";
import axios from "axios";

export default function HomePage() {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/getPosts")
      .then((response) => {
        console.log(response.data);
        setposts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {console.log(posts.length)}
      {posts.length > 0 &&
        posts.map((post) => {
          console.log(post);
          return <Post key={post.id} {...post} />;
        })}
    </>
  );
}
