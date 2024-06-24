import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
axios.defaults.withCredentials = true;
export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setfiles] = useState("");
  const [redirect, setredirect] = useState(false);
  async function createNewPost(ev) {
    ev.preventDefault();
    try {
      const data = new FormData();
      data.append("title", title);
      data.append("summary", summary);
      data.append("content", content);
      data.append("file", files[0]);

      const response = await axios.post("http://localhost:5000/post", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        setredirect(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form onSubmit={createNewPost}>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder="summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setfiles(ev.target.files)} />
      <ReactQuill
        value={content}
        onChange={(newValue) => setContent(newValue)}
      />
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
}
