import { useState } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



export default function CreatingListing() {
    const {currentUser} = useSelector(state => state.user)
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls : [],
        name: '',
        description: '',
        address: '',
        seats: 1,
        transmission: 'manual',
        regularPrice: 50,
        discountPrice: 50,
        offer: false,
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    console.log(formData);
    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7){
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for (let i = 0; i<files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls), 
                });
                setImageUploadError(false);
                setUploading(false);
            }).catch((err) => {
                setImageUploadError('Image upload failed. Try Again!');
                setUploading(false);
            });
            
        }
    };

    const storeImage = async (file) =>{
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`)
                },
                (error)=>{
                    reject(error);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
      };

    const handleChange = (e) => {
        if (e.target.id === 'automatic' || e.target.id === 'manual'){
            setFormData({ ...formData, transmission: e.target.id})
        }

        if(e.target.id === 'offer'){
            setFormData({...formData, offer: e.target.checked});
        }

        if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
            setFormData({ ...formData, [e.target.id]: e.target.value});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        if (formData.imageUrls.length < 1) 
        return setError('You must upload at least one image');

        if (+formData.regularPrice < +formData.discountPrice) 
        return setError('Discount price must be lower than regular price');
           setLoading(true);
           setError(false); 
           const res = await fetch('/api/listing/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData, userRef: currentUser._id})
           });

           const data = await res.json();
           setLoading(false);
           if(data.success === false) {
            setError(data.message);
           }
           navigate(`/listing/${data._id}`)
        } catch (error) {
           setError(error.message)
           setLoading(false); 
        }
    }

  return (
   <main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-white text-4xl font-semibold text-center mt-9 mb-5'>Create Your Car Listing</h1>
    <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col flex-1'>
            <input onChange={handleChange} value={formData.name} type='text' placeholder="Name" id='name' className='m-4 border rounded-lg p-3' required/>
            <textarea onChange={handleChange} value={formData.description} type='text' placeholder="Description... Add Email at End" id='description' className='m-4 border rounded-lg p-3' required/>
            <input onChange={handleChange} value={formData.address} type='text' placeholder="Address" id='address' className='m-4 border rounded-lg p-3' required/>
            <div className='flex gap-10 flex-wrap mt-4'>
                <div className='flex gap-2 '>
                    <input onChange={handleChange} checked={formData.transmission === 'automatic' } type='checkbox' id='automatic' className='w-5'/>
                    <span className='text-white'>Automatic</span>
                </div>
                <div className='flex gap-2 '>
                    <input onChange={handleChange} checked={formData.transmission === 'manual' } type='checkbox' id='manual' className='w-5'/>
                    <span className='text-white'>Manual</span>
                </div>
                <div className='flex gap-2 '>
                    <input onChange={handleChange} checked={formData.offer} type='checkbox' id='offer' className='w-5'/>
                    <span className='text-white'>Offer</span>
                </div>
            </div>
            <div className='flex flex-wrap gap-9'>
                <div>
                    <input onChange={handleChange} value={formData.seats} className='p-3 border border-gray-800 mt-4 rounded-md mr-4 ' type='number' id='seats' min={1} max={10} required />
                    <span className='text-white text-lg'>Seats</span>
                </div>
                <div>
                    <input onChange={handleChange} value={formData.regularPrice} className='p-3 border border-gray-800 mt-4 rounded-md mr-4 ' type='number' id='regularPrice' min={50} max={100000000} required />
                    <span className='text-white text-lg'>Regular Price ($/day)</span>
                </div>
                {formData.offer && (
                    <div>
                    <input onChange={handleChange} value={formData.discountPrice}  className='p-3 border border-gray-800 mt-4 rounded-md mr-4 ' type='number' id='discountPrice' min={50} max={100000000} required />
                    <span className='text-white text-lg'>Discounted Price ($/day)</span>
                    </div>
                )}
                
            </div>
        </div>
        <div className='flex flex-col flex-1'>
            <p className='font-semibold ml-2 mb-3 flex flex-wrap text-white'>Images:
            <span className='text-gray-400 ml-2'>The first image will be the main cover of your listing (max 6)</span>
            </p>
            <input onChange={(e)=>setFiles(e.target.files)} className='p-3 text-white border mb-3' type='file' id='images' accept='image/*' multiple />
            <button disabled={uploading} onClick={handleImageSubmit} className='p-3 rounded-lg border text-white w-36 border-green-500 bg-green-500 hover:opacity-95 disabled:opacity-100'>{uploading ? 'Uploading...' : 'Upload'}</button>
            <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
            {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                <div key={url} className='flex justify-between p-3 border-blue-700 border-4 m-2 item-center'>
                <img src={url} alt='listing IMG' className='w-40 h-40 object-contain rounded-lg' />
                <button onClick={() => handleRemoveImage(index)} className='text-red-700 pr-3 font-semibold hover:opacity-75'>Delete</button>
                </div>
            ))}
            <button disabled={loading || uploading} className='disabled:opacity-60 text-white p-3 bg-blue-700 rounded-lg mt-8'>{loading ? 'Creating...' : 'Create Listing'}</button>
            {error && <p className='text-red-700'>{error}</p>}
        </div>
        
    </form>
   </main>
  )
}
