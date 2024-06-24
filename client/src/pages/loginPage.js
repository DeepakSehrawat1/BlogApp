import { useContext, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
axios.defaults.withCredentials = true;
export default function LoginPage() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [redirect, setredirect] = useState(false);
  const { setUserInfo, userInfo } = useContext(UserContext);
  async function login(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      if (response.status === 200) {
        alert("logged");
        console.log(response.data);

        setUserInfo(response.data);
        console.log(userInfo);

        setredirect(true);
      } else {
        if (response.status === 500) {
          alert("not found");
        } else {
          alert("wrong password");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
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
      <button type="submit">Login</button>
    </form>
  );
}
