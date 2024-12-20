import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { HOST, SIGNOUT_URL } from "../../api_routes";
import { signoutSuccess } from "../redux/user/UserSlice";
import axios from "axios";

const Header = () => {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const profileImage = currentUser && currentUser.profilePicture
    ? currentUser.profilePicture.substr(0, 5) === 'https'
      ? currentUser.profilePicture
      : `${HOST}/${currentUser.profilePicture}`
    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";




    const handleSignout=async()=>{
      try {
        const res=await axios.post(SIGNOUT_URL,{withCredentials:true})
        if(res.status===200){
          dispatch(signoutSuccess())
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          MERN
        </span>
        Blog
      </Link>
       
      <form>
        <TextInput
          type="text"
          placeholder="Search"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button
        color="gray"
        className="h-10 w-12 flex justify-center items-center lg:hidden"
        pill
      >
        <AiOutlineSearch />
      </Button>

      <div className="flex justify-center items-center gap-2 md:order-3 ">
        <Button
          color="gray"
          className="w-12 h-10  items-center justify-center"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="user-profile-image"
                img={profileImage}
                rounded
              />
            }
          >
            <Dropdown.Header className="text-center">
              <span className="block text-sm font-bold">
                @{currentUser.username}
              </span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to="/dashboard?tab=profile">
              <Dropdown.Item>profile</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout}>signout</Dropdown.Item>
            </Link>
          </Dropdown>
        ) : (
          <Link to={path==='/signin'?'/signup':'/signin'}>
          <Button gradientDuoTone="purpleToBlue" outline>
           {path==='/signin'?'signup':'signin'}
          </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse>
        <Navbar.Link active={"/" === path} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={"/about" === path} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={"/projects" === path} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
