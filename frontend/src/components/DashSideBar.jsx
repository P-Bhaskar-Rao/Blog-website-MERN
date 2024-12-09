import { Sidebar } from "flowbite-react"
import { useEffect, useState } from "react";
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import { useLocation } from "react-router-dom";
const DashSideBar = () => {
    const location=useLocation()
    const [tab,setTab]=useState();
    useEffect(()=>{
      const urlParams=new URLSearchParams(location.search)
      const tabFromUrl=urlParams.get('tab')
      if(tabFromUrl){
        setTab(tabFromUrl)
      }
      
    },[location.search])
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
            <Sidebar.Item active={tab==='profile'} icon={HiUser} label={'User'} labelColor='dark'>Profile </Sidebar.Item>
            <Sidebar.Item active={tab==='signout'} icon={HiArrowSmRight} className="cursor-pointer">Sign Out </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSideBar;
