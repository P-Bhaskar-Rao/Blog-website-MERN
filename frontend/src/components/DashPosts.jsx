import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DELETE_POST_URL, GET_POSTS_URL, HOST } from "../../api_routes";
import { Button, Modal, Table, TableHead, TableRow } from "flowbite-react";
import { Link } from "react-router-dom";
import { set } from "mongoose";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [postId, setPostId] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${GET_POSTS_URL}?userId=${currentUser._id}`,
          { withCredentials: true }
        );

        if (res.status === 200) {
          setUserPosts(res.data.posts);
          userPosts.length > 9 ? setShowMore(true) : setShowMore(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) fetchPosts();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    try {
      const startIdx = userPosts.length;
      const res = await axios.get(
        `${GET_POSTS_URL}?userId=${currentUser._id}&startIdx=${startIdx}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setUserPosts([...userPosts, ...res.data.posts]);
        res.data.posts.length < 9 && setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await axios.delete(
        `${DELETE_POST_URL}/${postId}/${currentUser._id}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setUserPosts(userPosts.filter((post) => post._id !== postId));
        setPostId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <Table hoverable className="shadow-md ">
          <Table.Head>
            <Table.HeadCell>Date updated</Table.HeadCell>
            <Table.HeadCell>Post image</Table.HeadCell>
            <Table.HeadCell>Post title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="font-medium">
            {userPosts.map((post) => (
              <Table.Row
                key={post._id}
                className="bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <Table.Cell>
                  <span>{new Date(post.updatedAt).toLocaleDateString()}</span>
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={
                        post.image.substr(0, 5) === "https"
                          ? post.image
                          : `${HOST}/${post.image}`
                      }
                      alt="post-image"
                      className="w-20 h-10 object-cover bg-gray-500"
                    />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/post/${post.slug}`}
                    className="text-gray-900 dark:text-white"
                  >
                    {post.title}
                  </Link>
                </Table.Cell>
                <Table.Cell>{post.category}</Table.Cell>
                <Table.Cell>
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setPostId(post._id);
                    }}
                    className="text-red-400 hover:underline cursor-pointer"
                  >
                    Delete
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    to={`/update-post/${post._id}`}
                    className="text-teal-500 hover:underline"
                  >
                    <span>Edit</span>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>You have not created any posts yet</p>
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
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-between mx-8 items-center">
              <Button color="failure" onClick={handleDeletePost}>
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

export default DashPosts;
