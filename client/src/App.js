import "./App.css";
//import Post from "./post.js";
//import Header from "./Header.js";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout.js";
import HomePage from "./pages/homePage.js";
import LoginPage from "./pages/loginPage.js";
import RegisterPage from "./pages/registrPage.js";
import PostPage from "./pages/postPage.js";
import { UserContextProvider } from "./UserContext.js";
import CreatePost from "./pages/CreatePost.js";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signUp" element={<RegisterPage />}></Route>
          <Route path="/create" element={<CreatePost />}></Route>
          <Route path="/detailPost/:id" element={<PostPage />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
