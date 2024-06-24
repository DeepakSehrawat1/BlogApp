import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatISO9075 } from "date-fns";
axios.defaults.withCredentials = true;
export default function PostPage() {
  const [PostInfo, setPostInfo] = useState(null);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/detailPost/${id}`)
      .then((response) => {
        console.log(response);
        setPostInfo(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!PostInfo) return " ";

  return (
    <div className="post-page">
      <h1>{PostInfo.title}</h1>
      <time>{formatISO9075(new Date(PostInfo.createdAt))}</time>
      <div className="author">by @{PostInfo.author.username}</div>
      <div className="image">
        <img src={`http://localhost:5000/${PostInfo.cover}`} alt="img" />
      </div>
      <h2>common gang</h2>
      {console.log(PostInfo)}

      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: PostInfo.content }}
      ></div>
    </div>
  );
}
