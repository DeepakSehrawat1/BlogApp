import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  useEffect(() => {
    axios.get("http://localhost:5000/profile").then((response) => {
      console.log(response.data.message);
      setUserInfo(response.data);
      console.log(userInfo);
    });
  }, []);

  function logout() {
    axios.post("http://localhost:5000/logout");
    setUserInfo(null);
  }

  const userName = userInfo?.username;
  console.log(userName);
  return (
    <header>
      <Link to="/" className="logo">
        My Blog
      </Link>
      {userName && (
        <>
          <Link to="/create"> Create post</Link>
          <a onClick={logout}>Logout</a>
        </>
      )}
      {!userName && (
        <>
          <nav>
            <Link to="/signup">signup</Link>
            <Link to="/login">login</Link>
          </nav>
        </>
      )}
    </header>
  );
}
