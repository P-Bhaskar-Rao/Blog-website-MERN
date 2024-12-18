import { Button, TextInput } from "flowbite-react";
import axios from 'axios'
import { useEffect, useRef, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { ADD_PROFILE_IMAGE_URL, HOST, PROFILE_UPDATE_URL } from "../../api_routes.js";
import {updateStart,updateFail,updateSuccess} from "../redux/user/UserSlice.js";
const DashProfile = () => {
  const { currentUser,loading } = useSelector((state) => state.user);
  
  const [profileImage,setProfileImage]=useState(null)
  const [profilePicture, setProfilePicture] = useState(currentUser.profilePicture);
  const [fileURL, setFileURL] = useState(null);
  const filePickerRef = useRef();
  const usernameRef=useRef()
  const emailRef=useRef()
  const passwordRef=useRef()
  const dispatch=useDispatch()
  const handleImageChange = async(e) => {
    const file = e.target.files[0];
    if (file) {
      setFileURL(URL.createObjectURL(file));
      const formData=new FormData()
      formData.append("profile-image",file)
      const response=await axios.post(`${ADD_PROFILE_IMAGE_URL}/${currentUser._id}`,formData,{withCredentials:true})
     console.log(response)
     if(response.status===200){
      setProfilePicture(response.data.message)
     }
    }
    
  };

  useEffect(()=>{
    if(currentUser.profilePicture){
      setProfileImage(currentUser.profilePicture.substr(0,8)==='https://'?currentUser.profilePicture:`${HOST}/${currentUser.profilePicture}`)
      console.log(profileImage)
    }
   
  },[currentUser.profilePicture])

 

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const formData={
      username:usernameRef.current.value,
      email:emailRef.current.value,
      password:passwordRef.current.value,
      profilePicture,
    }
    dispatch(updateStart())
    try {
      const response=await axios.put(`${PROFILE_UPDATE_URL}/${currentUser._id}`,formData,{withCredentials:true})
      console.log(response)
      if(response.status===200){
        dispatch(updateSuccess(response.data))
        console.log("updatedData=",response.data)
      }
      setFileURL(null)
    } catch (error) {
      dispatch(updateFail(error))
    }
    
  }
  return (
    <div className="max-w-lg p-3 mx-auto w-full">
      <h1 className="text-center my-7 font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={(e)=>handleSubmit(e)}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        ></input>
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={fileURL?fileURL:profileImage}
            className="w-full h-full rounded-full border-8 border-[lightgray] object-cover"
            alt="profile-picture"
          />
        </div>
        <TextInput
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          ref={usernameRef}
        />
        <TextInput
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          id="email"
          ref={emailRef}
        />
        <TextInput type="password" placeholder="password" id="password"  ref={passwordRef}/>
        <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={loading}>
          update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-4">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
