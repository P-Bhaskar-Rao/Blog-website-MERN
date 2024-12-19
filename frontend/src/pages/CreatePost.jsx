import { Button, FileInput, Select, TextInput } from "flowbite-react"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className="max-w-3xl min-h-screen mx-auto p-3">
        <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
        <form className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <TextInput className="flex-1" type='text' placeholder="Title" required id="title"/>
                <Select>
                    <option value="uncategorized">select a category</option>
                    <option value="javascript">JavaScript</option>
                    <option value='reactjs'>reactjs</option>
                    <option value='nextjs'>nextjs</option>
                </Select>
            </div>
            <div className="flex justify-between gap-4 items-center border-4 border-teal-400 border-dotted p-2">
                <FileInput type='file' accept='image/*' className="flex-1"/>
                <Button type="button" gradientDuoTone='purpleToBlue' outline size="sm">upload-image</Button>
            </div>
            <ReactQuill theme="snow" placeholder="write something..." className="h-72 mb-12" required/>
            <Button type="submit" gradientDuoTone="purpleToPink" className="my-2">Publish</Button>
        </form>
    </div>
  )
}

export default CreatePost