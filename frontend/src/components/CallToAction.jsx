import { Button } from "flowbite-react";

const CallToAction = () => {
  return (
    <div className=" mx-auto flex flex-col sm:flex-row  justify-between gap-4 items-center border p-4 border-teal-500 rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 sm:pl-4 flex flex-col gap-1 items-center text-center">
        <h2>Want to learn more about React</h2>
        <p>Check out these resources</p>
        <Button gradientDuoTone="purpleToPink" className="rounded self-center w-full">
          <a href="" target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
        </Button>
      </div>
      <div className="mt-4 sm:mt-0 rounded flex-1">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbdCxfo8H5NcKMZcGw2VK9hEEBS2-oB63XpA&s"
          alt="react.js"
          className="w-full  object-cover rounded"
        />
      </div>
    </div>
  );
};
export default CallToAction;
