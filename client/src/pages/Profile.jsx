import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from "../firebase";

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const [file, setFile] =useState(undefined)
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
 
  useEffect(() => {
    if(file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePercent(Math.round(progress));
    },
    (error) => {
      setFileUploadError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({ ...formData, avatar: downloadURL }));
      }
    );
    }

  return (
    <div>
      <h1 className='text-4xl font-bold text-center text-white my-6'>Welcome to your Profile</h1>
      <form className="flex flex-col max-w-lg mx-auto">
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="Profile IMG" className="rounded-full h-25 w-25 object-cover cursor-pointer self-center mt-4" />
        <p className='text-base mt-3 self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error in uploading image 
            </span>
          ) : filePercent > 0 && filePercent < 100 ? (
            <span className='text-white'>{`${filePercent}% Uploaded`}</span>
          ) : filePercent === 100 ? (
            <span className='text-green-500'>Image uploaded Successfully!!</span>
          ) : (
            ''
          )}
        </p>
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
};
