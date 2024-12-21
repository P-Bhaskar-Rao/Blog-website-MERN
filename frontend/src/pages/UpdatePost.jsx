import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ADD_POST_IMAGE_URL, CREATE_POST_URL, GET_POSTS_URL, HOST, UPDATE_POST_URL } from "../../api_routes";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from "react-router-dom";

const UpdatePost = () => {
    const {currentUser}=useSelector(state=>state.user)
    const [file,setFile]=useState(null)
    const [fileUrl,setFileURL]=useState(null)
    const [imageUploadProgress,setImageUploadProgress]=useState(null)
    const [imageUploadError,setImageUploadError]=useState(null)
    const [imageUploadSuccess,setImageUploadSuccess]=useState(null)
    const [postData,setPostData]=useState({})
    const titleRef=useRef()
    const categoryRef=useRef()

    const [publishError,setPublishError]=useState(null)
    const navigate=useNavigate()
    const {postId}=useParams()
    
    useEffect(()=>{
        const fetchPost=async()=>{
            try {
                const res=await axios.get(`${GET_POSTS_URL}?postId=${postId}`,{withCredentials:true})
                if(res.status===200){
                    setPostData({...res.data.posts[0]})
                    setFileURL(res.data.posts[0].image)
                    setPublishError(null)
                }else{
                    setPublishError(res.data.message)
                } 
            } catch (error) {
                setPublishError(error.message)
            }
           
        }
        if(postId) fetchPost()
    },[postId])

    const handleImageChange=(e)=>{
         setFile(e.target.files[0]);
    }

    const uploadImage=async()=>{
        setImageUploadProgress(0)
        setImageUploadError(null)
        setImageUploadSuccess(null)
        if(file){
            const formData = new FormData();
            formData.append('post-image', file);
            try {
                const res=await axios.post(`${ADD_POST_IMAGE_URL}/${currentUser._id}`,formData,{
                    withCredentials: true,
                    onUploadProgress: (progressEvent) => {
                        const { loaded, total } = progressEvent;
                        const percentCompleted = Math.round((loaded * 100) / total);
                        setImageUploadProgress(percentCompleted);
                    }
                })
                if(res.status===200){
                    setFileURL(res.data.message)
                    setPostData({...postData,image:res.data.message})
                    setImageUploadProgress(null)
                    setImageUploadSuccess('Image uploaded successfully')
                }
            } catch (error) {
                setImageUploadError(error.message)
                setImageUploadProgress(null)
                setFileURL(null)
            }
        }else{
            setImageUploadError('Please select a file')
        }
    }
const handleSubmit=async(e)=>{
    e.preventDefault()
    setPostData({...postData,title:titleRef.current.value,category:categoryRef.current.value})
    try {
      const res=await axios.put(`${UPDATE_POST_URL}/${postData._id}/${currentUser._id}`,postData,{withCredentials:true})  
      if(res.status===200){
        console.log(res)
            setPublishError(null)
            setPostData({})
            setFile(null)
            setFileURL(null)
            navigate(`/post/${res.data.slug}`)
      }else{
            setPublishError(res.data.message)
      }
    } catch (error) {
       setPublishError('something went wrong') 
    }
}

  return (
    <div className="max-w-3xl min-h-screen mx-auto p-3">
        <h1 className="text-center text-3xl my-7 font-semibold">Update a  post</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <TextInput className="flex-1" type='text' placeholder="Title" required id="title" ref={titleRef} value={postData.title}/>
                <Select ref={categoryRef}  value={postData.category}>
                    <option value="uncategorized">select a category</option>
                    <option value="javascript">JavaScript</option>
                    <option value='react.js'>react.js</option>
                    <option value='next.js'>next.js</option>
                </Select>
            </div>
            <div className="flex justify-between gap-4 items-center border-4 border-teal-400 border-dotted p-2">
                <FileInput type='file' accept='image/*' className="flex-1" onChange={handleImageChange}/>
                <Button type="button" gradientDuoTone='purpleToBlue' outline size="sm" onClick={uploadImage} disabled={imageUploadProgress}>
                    {
                        imageUploadProgress?<div className="w-16 h-16"><CircularProgressbar value={imageUploadProgress || 0} text={`${imageUploadProgress || 0}%`}/></div>:'Upload Image'
                    }
                    </Button>
            </div>
            {
                imageUploadSuccess &&  <Alert color="success" className="my-2">{imageUploadSuccess}</Alert>
            }
            {
                 imageUploadError &&  <Alert color="failure" className="my-2">{imageUploadError}</Alert>   
            }
            {
                fileUrl && <img src={fileUrl.substr(0,5)==='https'?fileUrl:`${HOST}/${fileUrl}`} alt="post" className="w-full h-72 object-cover"/>
            }
            <ReactQuill theme="snow" placeholder="write something..." className="h-72 mb-12 dark:text-white dark:placeholder:text-white" required  onChange={(value)=>setPostData({...postData,content:value})} value={postData.content}/>
            <Button type="submit" gradientDuoTone="purpleToPink" className="my-2" disabled={imageUploadProgress}>Update</Button>
        </form>
        {
            publishError && <Alert color="failure" className="my-2">{publishError}</Alert>
        }
    </div>
  )
}

export default UpdatePost