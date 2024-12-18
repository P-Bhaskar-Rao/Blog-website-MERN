import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import {  GOOGLE_AUTH_URL } from "../../api_routes";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signinSuccess, signinFail } from "../redux/user/UserSlice";
import { useEffect } from "react";
import axios from "axios"
const OAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const data = {
        name: resultsFromGoogle.user.displayName,
        email: resultsFromGoogle.user.email,
        googlePhotoURL: resultsFromGoogle.user.photoURL,
      };
      const res = await axios.post(GOOGLE_AUTH_URL, data,{withCredentials:true});
      console.log(res.data);
         if(res.status===200){
          dispatch(signinSuccess(res.data))
          navigate('/')
         }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle  className="mr-3 w-6 h-6 " />
      continue with Google
    </Button>
  );
};

export default OAuth;
