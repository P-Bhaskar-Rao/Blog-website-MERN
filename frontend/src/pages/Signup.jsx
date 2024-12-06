import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const Signup = () => {
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
            Signup and enjoy creating, reading and sharing blogs
          </p>
        </div>
        

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="username"></Label>
              <TextInput type="text" placeholder="Username" id="username"/>
            </div>
            <div>
              <Label value="email"></Label>
              <TextInput type="email" placeholder="Email" id="email"/>
            </div>
            <div>
              <Label value="password"></Label>
              <TextInput type="password" placeholder="Password" id="password"/>
            </div>
            <Button type="submit" gradientDuoTone="purpleToPink">signup</Button>
          </form>

          <div className="flex text-sm mt-5 gap-2">
            <span>Have an account?</span>
            <Link to='/signin' className="text-blue-500">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
