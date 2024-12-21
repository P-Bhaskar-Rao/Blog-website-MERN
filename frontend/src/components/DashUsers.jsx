import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DELETE_POST_URL, DELETE_USER_URL, GET_USERS_URL, HOST } from "../../api_routes";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${GET_USERS_URL}`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          setUsers(res.data.users);
          users.length > 9 ? setShowMore(true) : setShowMore(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) fetchUsers();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    try {
      const startIdx = users.length;
      const res = await axios.get(`${GET_USERS_URL}?startIdx=${startIdx}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUsers([...users, ...res.data.users]);
        res.data.users.length < 9 && setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await axios.delete(
        `${DELETE_USER_URL}/${userId}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setUsers(users.filter((user) => user._id !== userId));
        setUserId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md ">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Profile image</Table.HeadCell>
              <Table.HeadCell>username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="font-medium">
              {users.map((user) => (
                
                  <Table.Row
                    key={user.email}
                    className="bg-white dark:bg-gray-800 dark:border-gray-700"
                  >
                    <Table.Cell>
                      <span>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={
                          user.profilePicture.substr(0, 5) === "https"
                            ? user.profilePicture
                            : `${HOST}/${user.profilePicture}`
                        }
                        alt="user-profile-picture"
                        className="w-10 h-10 rounded-full object-cover bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.isAdmin ? <FaCheck className="text-green-500"/> : <FaTimes className="text-red-600"/>}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setUserId(user._id);
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
        </>
      ) : (
        <p>You have no users yet!</p>
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
              Are you sure you want to delete this user?
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
    </div>
  );
};

export default DashUsers;
