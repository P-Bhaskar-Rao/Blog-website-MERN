import { Button, TextInput } from "flowbite-react";
import React from "react";
import { useSelector } from "react-redux";
const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg p-3 mx-auto w-full">
      <h1 className="text-center my-7 font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            className="w-full h-full rounded-full border-8 border-[lightgray] object-cover"
            alt="profile-picture"
          />
           </div>
          <TextInput type="text" placeholder='username' defaultValue={currentUser.username} id="username"/>
          <TextInput type="email" placeholder='email' defaultValue={currentUser.email} id="email"/>
          <TextInput type="password" placeholder="password" id="password"/>
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>update</Button>
      </form>
      <div className="text-red-500 flex justify-between mt-4">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
