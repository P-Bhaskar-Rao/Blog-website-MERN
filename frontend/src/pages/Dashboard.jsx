import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import DashSideBar from "../components/DashSideBar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComments";

const Dashboard = () => {
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
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="min-w-56">
        <DashSideBar/>
      </div>
      <div className="w-full">
        {tab==='profile' && <DashProfile/>}
        {tab==='posts' && <DashPosts/>}
        {tab==='users' && <DashUsers/>}
        {tab==='comments' && <DashComments/>}
      </div>
    </div>
  )
}

export default Dashboard