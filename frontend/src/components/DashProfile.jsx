import { Alert, Button, Modal, TextInput } from "flowbite-react";
import axios from "axios";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ADD_PROFILE_IMAGE_URL,
  DELETE_USER_URL,
  HOST,
  PROFILE_UPDATE_URL,
  SIGNOUT_URL,
} from "../../api_routes.js";
import {
  updateStart,
  updateFail,
  updateSuccess,
  deleteStart,
  deleteSuccess,
  deleteFail,
  signoutSuccess,
} from "../redux/user/UserSlice.js";
import { Link } from "react-router-dom";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState(
    currentUser.profilePicture
  );
  const [fileUploading, setFileUploading] = useState(false);
  const [fileUploadingProgress, setFileUploadingProgress] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [success, setSuccess] = useState(false);
  const filePickerRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileURL(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("profile-image", file);
      setFileUploading(true);
      setFileUploadingProgress(0);
      try {
        const response = await axios.post(
          `${ADD_PROFILE_IMAGE_URL}/${currentUser._id}`,
          formData,
          {
            withCredentials: true,
            onUploadProgress: (ProgressEvent) => {
              const { loaded, total } = ProgressEvent;
              const percentCompleted = Math.round((loaded * 100) / total);
              console.log(percentCompleted);
              setFileUploadingProgress(percentCompleted);
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
          setProfilePicture(response.data.message);
          setFileUploadingProgress(null);
        }
      } catch (error) {
        console.log(error);
        setFileUploadingProgress(null);
      }
      setFileUploading(false);
    }
  };

  useEffect(() => {
    if (currentUser.profilePicture) {
      setProfileImage(
        currentUser.profilePicture.substr(0, 8) === "https://"
          ? currentUser.profilePicture
          : `${HOST}/${currentUser.profilePicture}`
      );
    }
  }, [currentUser.profilePicture]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      profilePicture,
    };
    dispatch(updateStart());
    try {
      const response = await axios.put(
        `${PROFILE_UPDATE_URL}/${currentUser._id}`,
        formData,
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        dispatch(updateSuccess(response.data));
        setSuccess(true);
        console.log("updatedData=", response.data);
      }
      setFileURL(null);
    } catch (error) {
      dispatch(updateFail(error.message));
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteStart());
      const response = await axios.delete(
        `${DELETE_USER_URL}/${currentUser._id}`,
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        dispatch(deleteSuccess());
      } else {
        dispatch(deleteFail(response.data.message));
      }
    } catch (error) {
      dispatch(deleteFail(error.message));
    }
  };

  const handleSignout = async () => {
    try {
      const res = await axios.post(SIGNOUT_URL, { withCredentials: true });
      console.log(res);
      if (res.status === 200) {
        dispatch(signoutSuccess());
        console.log(currentUser);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-lg p-3 mx-auto w-full">
      <h1 className="text-center my-7 font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={(e) => handleSubmit(e)}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        ></input>
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {fileUploadingProgress && (
            <CircularProgressbar
            className="w-full h-full"
              value={fileUploadingProgress || 0}
              text={`${fileUploadingProgress || 0}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${fileUploadingProgress / 100})`,
                },
              }}
            />
          )}

          <img
            src={fileURL ? fileURL : profileImage}
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              fileUploadingProgress &&
              fileUploadingProgress < 100 &&
              "opacity-60"
            }`}
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
        <TextInput
          type="password"
          placeholder="password"
          id="password"
          ref={passwordRef}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={loading || fileUploading}
        >
          {loading || fileUploading ? "loading" : "update"}
        </Button>

        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              type="Button"
              gradientDuoTone="purpleToPink"
              className="w-full"
            >
              create a post
            </Button>
          </Link>
        )}
      </form>
      <div className="text-red-500 flex justify-between mt-4">
        <span className="cursor-pointer" onClick={() => setShowModal(true)}>
          Delete Account
        </span>
        <span className="cursor-pointer" onClick={handleSignout}>
          Sign Out
        </span>
      </div>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete?
            </h3>
            <div className="flex justify-between mx-8 items-center">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {error && <Alert color="failure">{error}</Alert>}
    </div>
  );
};

export default DashProfile;
