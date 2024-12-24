import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  DELETE_COMMENT_URL,
  GET_ALL_COMMENTS_URL,
  HOST,
} from "../../api_routes";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [commentId, setCommentId] = useState(null);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(GET_ALL_COMMENTS_URL, {
          withCredentials: true,
        });
        console.log(res)
        if (res.status === 200) {
          setComments(res.data.comments);
          comments.length > 9 ? setShowMore(true) : setShowMore(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) fetchComments();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    try {
      const startIdx = comments.length;
      const res = await axios.get(GET_ALL_COMMENTS_URL, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setComments([...comments, ...res.data.comments]);
        res.data.comments.length < 9 && setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await axios.delete(
        `${DELETE_COMMENT_URL}/${commentId}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setComments(comments.filter((comment) => comment._id !== commentId));
        setCommentId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && comments && comments.length>0 ? (
        <Table hoverable className="shadow-md text-center w-full">
          <Table.Head>
            <Table.HeadCell>Date updated</Table.HeadCell>
            <Table.HeadCell>Comment</Table.HeadCell>
            <Table.HeadCell>Number of likes</Table.HeadCell>
            <Table.HeadCell>PostId</Table.HeadCell>
            <Table.HeadCell>userId</Table.HeadCell>
            <Table.HeadCell>
              <span>DELETE</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="font-medium">
            {comments.map((comment) => (
              <Table.Row
                key={comment._id}
                className="bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <Table.Cell>
                  <span>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </span>
                </Table.Cell>

                <Table.Cell>{comment.content}</Table.Cell>
                <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                <Table.Cell>{comment.postId}</Table.Cell>
                <Table.Cell>{comment.userId}</Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setCommentId(comment._id);
                    }}
                    className="text-red-400 hover:underline cursor-pointer"
                  >
                    Delete
                  </span>
               </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>You have not created any Comments yet</p>
      )}
      {showMore && (
        <button
          onClick={handleShowMore}
          className=" self-center w-full text-teal-500 text-sm py-7"
        >
          Show More
        </button>
      )}

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
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-between mx-8 items-center">
              <Button color="failure" onClick={handleDeleteComment}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashComments;
