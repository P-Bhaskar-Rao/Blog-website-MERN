import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GET_POSTS_URL, HOST } from "../../api_routes";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);
  const [recentPosts,setRecentPosts]=useState(null)
  const [postImage,setPostImage]=useState(null)
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${GET_POSTS_URL}?slug=${postSlug}`, {
          withCredentials: true,
        });
        
        if (res.status === 200) {
          setPost(res.data.posts[0]);
          setPostImage(res.data.posts[0].image.substr(0,5)==='https'?res.data.posts[0].image:`${HOST}/${res.data.posts[0].image}`)
          setLoading(false);
          setError(null);
        } else {
          setError("Something went wrong");
          setLoading(false);
        }
      } catch (error) {
        setError(error.message)
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(()=>{
    const fetchRecentPosts=async()=>{
      try {
        const res=await axios.get(`${GET_POSTS_URL}?limit=3`,{withCredentials:true})
        
        if(res.status===200){
          setRecentPosts(res.data.posts)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchRecentPosts()
  },[])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return(
    <main className="flex flex-col max-w-6xl p-3 mx-auto min-h-screen">
        <h1 className="text-3xl p-3 text-center mt-10 font-semibold max-w-2xl font-serif mx-auto lg:text-4xl lg:max-w-6xl">{post && post.title}</h1> 
        <Link to={`/search?category=${post && post.category}`} className="self-center mt-5">
            <Button color="gray" pill size="xs">{post && post.category}</Button>
        </Link>
        <img src={postImage && postImage} alt={post && post.title} className="w-full max-h-[600px] object-cover mt-5 rounded-lg shadow-md"/>
        <div className="flex justify-between items-center mt-5 border-b border-slate-500 p-3 w-full mx-auto max-w-2xl text-xs lg:max-w-6xl">
            <span className="text-gray-500">{new Date(post && post.createdAt).toLocaleDateString()}</span>
            <span className="text-gray-500 italic">{post && (post.content.length/300).toFixed(0)} min read</span>
        </div>
        <div className='mx-auto w-full p-3 max-w-2xl post-content lg:max-w-6xl' dangerouslySetInnerHTML={{__html: post && post.content}}>

        </div>
        <div className="max-w-4xl mx-auto w-full">
           <CallToAction/>
        </div>
        <CommentSection postId={post && post._id}/>
        <div className="flex flex-col justify-center items-center my-5">
          <h1 className="text-xl">Recent articles</h1>
          <div className="flex flex-wrap gap-4 justify-center items-center my-5">
            {
              recentPosts && recentPosts.map((post)=><PostCard key={post._id} post={post}/>)
            }
          </div>
        </div>
    </main>
  )
}
export default PostPage;
