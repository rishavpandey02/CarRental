import { useSelector } from "react-redux";

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div>
      <h1 className='text-4xl font-bold text-center text-white my-6'>Welcome to your Profile</h1>
      <form className="flex flex-col max-w-lg mx-auto">
        <img src={currentUser.avatar} alt="Profile IMG" className="rounded-full h-25 w-25 object-cover cursor-pointer self-center mt-4" />
        <input id="username" type="text" placeholder="username" className="border p-3 rounded-lg mt-6" />
        <input id="email" type="email" placeholder="email" className="border p-3 rounded-lg mt-6" />
        <input id="password" type="text" placeholder="password" className="border p-3 rounded-lg mt-6" />
        <button className="bg-blue-700 mt-7 p-3 rounded-lg w-52 mx-auto opacity-95 disabled:opacity-80 text-white ">Update</button>
      </form>
      <div className="flex justify-center mt-8">
        <span className="text-red-700 font-bold cursor-pointer">Sign Out</span>
      </div>
    </div>
  )
}
