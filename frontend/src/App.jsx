import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Header from "./components/Header";
import FooterComp from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import OnlyAdminRoute from "./components/OnlyAdminRoute";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path='/search' element={<Search/>}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Route>
          <Route element={<OnlyAdminRoute />}>
            <Route path="/create-post" element={<CreatePost />}></Route>
            <Route path="/update-post/:postId" element={<UpdatePost />}></Route>
          </Route>
          <Route path="/projects" element={<Projects />}></Route>
          <Route path="/post/:postSlug" element={<PostPage />}></Route>
        </Routes>
        <FooterComp />
      
    </BrowserRouter>
  );
}

export default App;
