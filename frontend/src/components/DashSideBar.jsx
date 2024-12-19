import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/UserSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { SIGNOUT_URL } from "../../api_routes";
const DashSideBar = () => {
  const location = useLocation();
  const [tab, setTab] = useState();
  const dispatch=useDispatch()
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout=async()=>{
    try {
      const res=await axios.post(SIGNOUT_URL,{withCredentials:true})
      console.log(res)
      if(res.status===200){
        
        dispatch(signoutSuccess())
        console.log(currentUser)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={"User"}
              labelColor="dark"
              as={'div'}
            >
              Profile
            </Sidebar.Item>
          </Link>

          <Sidebar.Item
            active={tab === "signout"}
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSideBar;
