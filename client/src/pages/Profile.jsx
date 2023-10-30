import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from "../redux/user/userSlice";
import { Link } from 'react-router-dom';

export default function Profile() {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user);
  const [showListingError, setShowListingError] = useState(false);
 const [ userListings, setUserListings] = useState([]);

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

  const handleShowListings = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  }

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <h1 className='text-4xl font-bold text-center text-white my-6'>Welcome to your Profile</h1>
      <div className="flex flex-col justify-center mt-8 p-4 items-center">
      <Link className='bg-green-500 text-white p-3 rounded-lg text-center hover:opacity-95 w-64' to={"/create-listing"}>
      Create Listing
      </Link>
      <button onClick={handleShowListings} className='text-white mt-11 border border-black bg-green-500 rounded-lg w-64 p-2 mb-8'>Show Personal Listings</button>
      <p className='text-red-700'>{showListingError ? 'Error Occurred' : ''}</p>

      {userListings && userListings.length > 0 && 
      userListings.map((listing) => (
        <div key={listing._id} className='my-7 bg-gray-500 rounded-lg flex justify-between items-center p-3 gap-9 '>
          <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} alt="listing IMG" className='h-24 w-24 object-contain m-3 ' />
          </Link>
          <Link className='text-white font-semibold hover:underline truncate flex-1' to={`/listing/${listing._id}`}>
            <p >{listing.name}</p>
          </Link>

          <div className='flex flex-col items-center gap-2'>
            <button onClick={() => handleListingDelete(listing._id)} className='text-red-700 hover:bg-red-700 hover:text-white hover:rounded-lg'>DELETE</button>
            <Link to={`/update-listing/${listing._id}`}>
            <button className='text-green-500 hover:bg-green-500 hover:text-white hover:rounded-lg'>EDIT</button>
            </Link>
          </div>
        </div>
      ))  
      }

        <span onClick={handleSignOut} className="text-red-700 font-bold cursor-pointer text-center mt-4 hover:underline">Sign Out</span>
      </div>
      
    </div>
  )
};
