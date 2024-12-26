import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  GET_ALL_COMMENTS_URL,
  GET_COMMENTS_URL,
  GET_POSTS_URL,
  GET_USERS_URL,
  HOST,
} from "../../api_routes";
import axios from "axios";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Button, Table, TableCell } from "flowbite-react";
import { Link } from "react-router-dom";

const DashboardComp = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${GET_USERS_URL}?limit=5`, { withCredentials: true });

        if (res.status === 200) {
          setUsers(res.data.users);
          setTotalUsers(res.data.totalUsers);
          setLastMonthUsers(res.data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${GET_POSTS_URL}?limit=5`, { withCredentials: true });

        if (res.status === 200) {
          setPosts(res.data.posts);
          setTotalPosts(res.data.totalPosts);
          setLastMonthPosts(res.data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${GET_ALL_COMMENTS_URL}?limit=5`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          setComments(res.data.comments);
          setTotalComments(res.data.totalComments);
          setLastMonthComments(res.data.lastMonthComments);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchComments();
      fetchUsers();
      fetchPosts();
    }
  }, [currentUser]);
  return (
    <div className="md:mx-auto p-3 my-4">
      <div className="flex-wrap flex gap-4 justify-center">
        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>

        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>

        <div className="flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-teal-600  text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex  gap-2 text-sm">
            <span className="text-green-500 flex items-center">
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 py-3 mx-auto justify-center my-6 ">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between items-center p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Users</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=users"}>See All</Link>
            </Button>
          </div>
          <Table hoverable className="my-2 text-center">
            <Table.Head>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>username</Table.HeadCell>
            </Table.Head>

            <Table.Body>
              {users &&
                users.map((user) => (
                  <Table.Row key={user._id}>
                    <Table.Cell className="flex items-center justify-center">
                      <img
                        src={
                          user.profilePicture.substr(0, 5) === "https"
                            ? user.profilePicture
                            : `${HOST}/${user.profilePicture}`
                        }
                        alt="profile-picture"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {user.username}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>

        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800 ">
          <div className="flex justify-between items-center p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Posts</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=posts"}>See All</Link>
            </Button>
          </div>
          <Table hoverable className="my-3 text-center">
            <Table.Head>
              <Table.HeadCell>post image</Table.HeadCell>
              <Table.HeadCell>post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>

            <Table.Body>
              {posts &&
                posts.map((post) => (
                  <Table.Row key={post._id}>
                    <Table.Cell>
                      <img
                        src={
                          post.image.substr(0, 5) === "https"
                            ? post.image
                            : `${HOST}/${post.image}`
                        }
                        alt="profile-picture"
                        className="w-10 h-10 md:w-14 md:h-14  object-cover"
                      />
                    </Table.Cell>
                    <Table.Cell className="line-clamp-2 md:w-96">
                      {post.title}
                    </Table.Cell>
                    <Table.Cell className="w-5">
                      {post.category}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>

        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between items-center p-3 text-sm font-semibold">
            <h1 className="text-center p-2">Recent Comments</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=comments"}>See All</Link>
            </Button>
          </div>
          <Table hoverable className="my-3">
            <Table.Head>
              <Table.HeadCell>Comment</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
            </Table.Head>

            <Table.Body>
              {comments &&
                comments.map((comment) => (
                  <Table.Row key={comment._id}>
                    <Table.Cell  className="md:w-96 line-clamp-2">
                     {comment.content}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {comment.numberOfLikes}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
