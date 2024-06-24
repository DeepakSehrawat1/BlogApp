import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
axios.defaults.withCredentials = true;

export default function RegisterPage() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [redirect, setredirect] = useState(false);
  async function register(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
      });
      if (response.status === 200) {
        alert("created user succesfully");
        setredirect(true);
      } else {
        alert("not created");
      }
    } catch (err) {
      console.log(err);
    }
  }
  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
    <form className="signup" onSubmit={register}>
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => {
          setusername(ev.target.value);
        }}
      ></input>
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setpassword(ev.target.value)}
      ></input>
      <button type="submit">Sign Up</button>
    </form>
  );
}
