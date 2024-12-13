import { Button, TextInput } from "flowbite-react";
import axios from 'axios'
import React, { useEffect, useRef, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { signinSuccess } from "../redux/user/UserSlice";
import { PROFILE_UPLOAD_URL } from "../../api_routes";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [profileImage, setProfileImage] = useState(null);
  // const [fileURL, setFileURL] = useState(null);
  const filePickerRef = useRef();
  const dispatch=useDispatch()
  const handleImageChange = async(e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      // setFileURL(URL.createObjectURL(file));
      const formData=new FormData()
      formData.append("profile-image",file)
      formData.append("id",currentUser._id)
      const response=await axios.post(PROFILE_UPLOAD_URL,formData,{withCredentials:true})
     console.log(response)
     if(response.status===200){
      dispatch(signinSuccess({...currentUser,profilePicture:response.data.profilePicture}))
     }
    }
  };

  useEffect(()=>{
uploadImage()
  },[profileImage])
  const uploadImage=async()=>{
    
  }
  return (
    <div className="max-w-lg p-3 mx-auto w-full">
      <h1 className="text-center my-7 font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
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
            src={currentUser.profilePicture}
            className="w-full h-full rounded-full border-8 border-[lightgray] object-cover"
            alt="profile-picture"
          />
        </div>
        <TextInput
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
        />
        <TextInput
          type="email"
          placeholder="email"
          defaultValue={currentUser.email}
          id="email"
        />
        <TextInput type="password" placeholder="password" id="password" />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline >
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
