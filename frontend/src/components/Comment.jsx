import { useEffect, useState } from "react";
import { GET_USER, HOST } from "../../api_routes";
import axios from "axios";
import moment from "moment/moment";
import {FaThumbsUp} from 'react-icons/fa'
import { useSelector } from "react-redux";
const Comment = ({ comment,onLike }) => {
  const {currentUser}=useSelector(state=>state.user)
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${GET_USER}/${comment.userId}`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setUser(res.data);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);
  return (
   <>
      {user ? (
        <div className="flex gap-4 border-b dark:border-gray-600 text-sm my-4 p-4">
          <div className="flex-shrink-0">
            <img
              className="w-10 h-10 bg-gray-200 object-cover rounded-full"
              src={
                user.profilePicture.substr(0, 5) === "https"
                  ? user.profilePicture
                  : `${HOST}/${user.profilePicture}`
              }
              alt="profile-picture"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center mb-1">
                <span className="font-bold text-xs truncate mr-1">@{user.username}</span>
                <span className="text-xs text-gray-500">{moment(comment.createdAt).fromNow()}</span>
            </div>
            <p className="text-gray-500 dark:text-gray-300 mb-2">{comment.content}</p>
            <div className="flex pt-2 border-t dark:border-gray-700 items-center max-w-fit gap-2">
              <button type='button' onClick={()=>onLike(comment._id)} className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}>
                <FaThumbsUp/>
              </button>
              {
                comment.numberOfLikes>0 && <p className="text-xs text-gray-400">{comment.numberOfLikes} {comment.numberOfLikes===1?'like':'likes'}</p>
              }
            </div>
        </div>
        </div>
      ) : (
        <div>
        <p>something went wrong</p></div>
       
      )}
    </>
  );
};

export default Comment;
