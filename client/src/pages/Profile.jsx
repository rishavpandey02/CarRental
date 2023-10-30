
import { useDispatch } from 'react-redux';
import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from "../redux/user/userSlice";
import { Link } from 'react-router-dom';

export default function Profile() {
  const dispatch = useDispatch()
 
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };
  return (
    <div>
      <h1 className='text-4xl font-bold text-center text-white my-6'>Welcome to your Profile</h1>
      <Link className='bg-green-500 text-white p-3 rounded-lg text-center hover:opacity-95' to={"/create-listing"}>
      Create Car Listing
      </Link>
      
      <div className="flex justify-center mt-8">
        <span onClick={handleSignOut} className="text-red-700 font-bold cursor-pointer">Sign Out</span>
      </div>
      
    </div>
  )
};
