import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ADD_POST_IMAGE_URL, CREATE_POST_URL, HOST } from "../../api_routes";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const {currentUser}=useSelector(state=>state.user)
    const [file,setFile]=useState(null)
    const [fileUrl,setFileURL]=useState(null)
    const [imageUploadProgress,setImageUploadProgress]=useState(null)
    const [imageUploadError,setImageUploadError]=useState(null)
    const [imageUploadSuccess,setImageUploadSuccess]=useState(null)
    const [postData,setPostData]=useState({})
    const [publishError,setPublishError]=useState(null)
    const navigate=useNavigate()
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
    try {
      const res=await axios.post(CREATE_POST_URL,postData,{withCredentials:true})  
      if(res.status===201){
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
        <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <TextInput className="flex-1" type='text' placeholder="Title" required id="title" onChange={(e)=>setPostData({...postData,title:e.target.value})}/>
                <Select onChange={(e)=>setPostData({...postData,category:e.target.value})}>
                    <option value="uncategorized">select a category</option>
                    <option value="javascript">JavaScript</option>
                    <option value='reactjs'>reactjs</option>
                    <option value='nextjs'>nextjs</option>
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
                fileUrl && <img src={`${HOST}/${fileUrl}`} alt="post" className="w-full h-72 object-cover"/>
            }
            <ReactQuill theme="snow" placeholder="write something..." className="h-72 mb-12 dark:text-white dark:placeholder:text-white" required onChange={(value)=>setPostData({...postData,content:value})}/>
            <Button type="submit" gradientDuoTone="purpleToPink" className="my-2" disabled={imageUploadProgress}>Publish</Button>
        </form>
        {
            publishError && <Alert color="failure" className="my-2">{publishError}</Alert>
        }
    </div>
  )
}

export default CreatePost