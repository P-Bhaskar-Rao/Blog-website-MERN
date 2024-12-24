import { Link } from "react-router-dom"
import { HOST } from "../../api_routes"


const PostCard = ({post}) => {
  return (
    <div className="group relative w-full sm:w-[430px]  border border-teal-500 hover:border-2 transition-all  h-[400px] overflow-hidden rounded-lg">
        <Link to={`/post/${post.slug}`}>
            <img src={post.image.substr(0,5)==='https'?post.image:`${HOST}/${post.image}`} alt="post-image" className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"/>
        </Link>
        <div className="p-3 flex flex-col gap-2">
          <p className="text-lg font-semibold line-clamp-2">{post.title}</p>
          <span className="italic text-sm">{post.category}</span>
          <Link to={`/post/${post.slug}`} className="z-10 bottom-[-300px] group-hover:bottom-0 absolute left-0 right-0 border-teal-500 border text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 py-2 rounded-md text-center !rounded-tl-none m-2">
            Read Article
          </Link>
        </div>
    </div>
  )
}

export default PostCard