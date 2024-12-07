import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios'
import  {SIGNIN_URL} from '../../api_routes.js'
const Signin = () => {
  const navigate=useNavigate()
  const emailRef=useRef()
  const passwordRef=useRef()
  const [errorMessage,setErrorMessage]=useState(null)
  const [successMessage,setSuccessMessage]=useState(null)
  const [loading,setLoading]=useState(false)

  const handleSubmit=(e)=>{
    e.preventDefault();
    
    const email=emailRef.current.value;
    const password=passwordRef.current.value
    if( !email || !password){
      return setErrorMessage("All fields are required!")
    }
    const formData={email,password}
    try {
      setLoading(true)
      setErrorMessage(null)
      setSuccessMessage(null)
      const response=axios.post(SIGNIN_URL,formData)
      response.then((res)=>{
        console.log(res)
        if(res.data.success===false){
          setErrorMessage(res.data.message)
        }else{
          setSuccessMessage(res.data.message)
          navigate('/')
        }
        setLoading(false)
      }).catch((err)=>{
        setErrorMessage(err.response.data.message)
        setLoading(false)
      })
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }
    
    emailRef.current.value=""
    passwordRef.current.value=""
  }
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 mx-auto max-w-3xl flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        
        <div className="flex-1">
          <Link to="/" className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              MERN
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Signin and enjoy creating, reading and sharing blogs
          </p>
        </div>
        

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="email"></Label>
              <TextInput type="email" placeholder="name@company.com" id="email" ref={emailRef}/>
            </div>
            <div>
              <Label value="password"></Label>
              <TextInput type="password" placeholder="********" id="password" ref={passwordRef}/>
            </div>
            <Button type="submit" gradientDuoTone="purpleToPink" disabled={loading}>
              {
                loading?(<>
                <Spinner size="sm"></Spinner>
                <span className="pl-3">Loading..</span>
                </>) :'signin'
              }
            </Button>
          </form>

          <div className="flex text-sm mt-5 gap-2">
            <span>Don't have an account?</span>
            <Link to='/signup' className="text-blue-500">Sign up</Link>
          </div>

          {
            errorMessage && <Alert className="mt-5" color="failure">{errorMessage}</Alert>
          }
          {
            successMessage && <Alert className="mt-5" color="success">{successMessage}</Alert>
          }
        </div>
      </div>
    </div>
  );
};

export default Signin;
