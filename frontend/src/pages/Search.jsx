import axios from "axios";
import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GET_POSTS_URL } from "../../api_routes";
import PostCard from "../components/PostCard";

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl) {
      setSidebarData({ ...sidebarData, searchTerm: searchTermFromUrl });
    }

    if (sortFromUrl) {
      setSidebarData({ ...sidebarData, sort: sortFromUrl });
    }

    if (categoryFromUrl) {
      setSidebarData({ ...sidebarData, category: categoryFromUrl });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      try {
        const res = await axios.get(`${GET_POSTS_URL}?${searchQuery}`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setPosts(res.data.posts);
          if (res.data.posts.length === 9) setShowMore(true);
          else setShowMore(false);
          setLoading(false);
        } else {
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleShowMore=async()=>{
    const startIdx=posts.length
    const urlParams=new URLSearchParams(location.search)
    urlParams.set('startIdx',startIdx)
    const searchQuery=urlParams.toString()
    try {
        const res=await axios.get(`${GET_POSTS_URL}?${searchQuery}`,{withCredentials:true})
        if(res.status===200){
            setPosts([...posts,...res.data.posts])
            res.data.posts.length===9?setShowMore(true):setShowMore(false)
        }
        
    } catch (error) {
        console.log(error)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label
              className="whitespace-nowrap font-semibold"
              htmlFor="searchTerm"
            >
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={(e) =>
                setSidebarData({ ...sidebarData, searchTerm: e.target.value })
              }
            />
          </div>

          <div className="flex items-center gap-2 ">
            <label htmlFor="sort">Sort:</label>
            <Select
              className="flex-1"
              value={sidebarData.sort}
              id="sort"
              onChange={(e) =>
                setSidebarData({ ...sidebarData, sort: e.target.value })
              }
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="category">Category:</label>
            <Select
              className="flex-1"
              value={sidebarData.category}
              id="category"
              onChange={(e) =>
                setSidebarData({ ...sidebarData, category: e.target.value })
              }
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="react.js">React.js</option>
              <option value="next.js">Next.js</option>
              <option value="javascript">Javascript</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b sm:border-gray-500 p-3 mt-5">
          Search Results
        </h1>
        <div className="flex flex-wrap p-7 gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found</p>
          )}
          {loading && <p className="text-xl text-gray-500">loading...</p>}
          {!loading &&
            posts.length > 0 &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && <button onClick={handleShowMore} className="text-teal-500 text-lg hover:underline p-7">Show More</button>}
        </div>
      </div>
    </div>
  );
};

export default Search;
