import { useSelector } from "react-redux";
import { CREATE_COMMENT_URL, GET_COMMENTS_URL, HOST } from "../../api_routes";
import { Link } from "react-router-dom";
import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment.jsx";

const CommentSection = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [commentError, setCommentError] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const profilePicture =
    currentUser &&
    currentUser.profilePicture &&
    currentUser.profilePicture.substr(0, 5) === "https"
      ? currentUser.profilePicture
      : `${HOST}/${currentUser.profilePicture}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length === 0) {
      setCommentError("comment is required");
      return;
    }
    try {
      const res = await axios.post(
        CREATE_COMMENT_URL,
        { content: comment, userId: currentUser._id, postId },
        { withCredentials: true }
      );
      if (res.status === 201) {
        setComment("");
        setCommentError(null);
        setComments([...comments,res.data])
      } else {
        setCommentError(res.data.message);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(
          `${GET_COMMENTS_URL}/${postId}`,
          { userId: currentUser._id },
          { withCredentials: true }
        );
        if (res.status === 200) {
          setComments(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (postId) {
      getComments();
    }
  }, [postId]);
  return (
    <div className="max-w-2xl w-full mx-auto lg:max-w-4xl my-5">
      {currentUser ? (
        <div className="flex items-center gap-4 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <div className="flex items-center gap-1">
            <img
              src={profilePicture}
              alt="profile-picture"
              className="rounded-full w-5 h-5 object-cover"
            ></img>
            <Link
              to="/dashboard?tab=profile"
              className="text-cyan-500 hover:underline"
            >
              @{currentUser.username}
            </Link>
          </div>
        </div>
      ) : (
        <div className="my-5 text-teal-500 text-sm flex gap-1">
          You must be signed in to comment
          <Link to={"/signin"} className="text-blue-500 hover:underline">
            Signin{" "}
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          className="my-5 border    border-teal-500 rounded-md p-4"
          onSubmit={handleSubmit}
        >
          <Textarea
            value={comment}
            maxLength={200}
            placeholder="write a comment.."
            rows={3}
            onChange={(e) => setComment(e.target.value)}
          />
          {commentError && (
            <Alert className="my-5" color="failure">
              {commentError}
            </Alert>
          )}
          <div className="flex items-center justify-between my-2">
            <p className="text-sm text-gray-500">
              {200 - comment.length} characters remaining
            </p>
            <Button type="submit" outline gradientDuoTone="purpleToBlue">
              Submit
            </Button>
          </div>
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">no comments yet!</p>
      ) : (
        <div className="flex gap-1 my-5 text-sm items-center">
          <p className="">Comments</p>
          <div className="border border-gray-400 text-center px-2 py-1">{comments.length}</div>
        </div>
        
      )}
      {
        comments.length>0 && comments.map((comment)=><Comment key={comment._id} comment={comment}/>)
      }
    </div>
  );
};
export default CommentSection;
