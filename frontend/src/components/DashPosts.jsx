import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GET_POSTS_URL, HOST } from "../../api_routes";
import { Button, Table, TableHead, TableRow } from "flowbite-react";
import { Link } from "react-router-dom";

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore,setShowMore]=useState(false)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${GET_POSTS_URL}?userId=${currentUser._id}`,
          { withCredentials: true }
        );
        console.log(res);
        if (res.status === 200) {
          setUserPosts(res.data.posts);
          userPosts.length>9?setShowMore(true):setShowMore(false)
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) fetchPosts();
  }, [currentUser._id]);

  const handleShowMore=async()=>{
      try {
        const startIdx=userPosts.length
        const res=await axios.get(`${GET_POSTS_URL}?userId=${currentUser._id}&startIdx=${startIdx}`,{withCredentials:true})
        if(res.status===200){
            setUserPosts([...userPosts,...res.data.posts])
            res.data.posts.length<9 && setShowMore(false)
        }
      } catch (error) {
        console.log(error.message)
      }
  }
  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
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
                <>
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
                        src={post.image.substr(0,5)==='https'?post.image:`${HOST}/${post.image}`}
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
                  <Table.Cell>{post.categories}</Table.Cell>
                  <Table.Cell>
                    <span className="text-red-400 hover:underline cursor-pointer">
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
                </>
              ))}
            </Table.Body>
          </Table>
        </>
      ) : (
        <p>You have not created any posts yet</p>
      )}
      {
        showMore && <button  onClick={handleShowMore} className=" self-center w-full text-teal-500 text-sm py-7">Show More</button>
      }
    </div>
  );
};

export default DashPosts;
