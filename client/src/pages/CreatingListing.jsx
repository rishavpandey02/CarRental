import React from 'react'

export default function CreatingListing() {
  return (
   <main className='p-3 max-w-4xl mx-auto'>
    <h1 className='text-white text-4xl font-semibold text-center mt-9 mb-5'>Create Your Car Listing</h1>
    <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col flex-1'>
            <input type='text' placeholder="Name" id='name' className='m-4 border rounded-lg p-3' required/>
            <input type='text' placeholder="Description" id='description' className='m-4 border rounded-lg p-3' required/>
            <input type='text' placeholder="Address" id='address' className='m-4 border rounded-lg p-3' required/>
            <div className='flex gap-10 flex-wrap mt-4'>
                <div className='flex gap-2 '>
                    <input type='checkbox' id='automatic' className='w-5'/>
                    <span className='text-white'>Automatic</span>
                </div>
                <div className='flex gap-2 '>
                    <input type='checkbox' id='manual' className='w-5'/>
                    <span className='text-white'>Manual</span>
                </div>
                <div className='flex gap-2 '>
                    <input type='checkbox' id='manual' className='w-5'/>
                    <span className='text-white'>Offer</span>
                </div>
            </div>
            <div className='flex flex-wrap gap-9'>
                <div>
                    <input className='p-3 border border-gray-800 mt-4 rounded-md mr-4 ' type='number' id='seats' min={1} max={10} required />
                    <span className='text-white text-lg'>Seats</span>
                </div>
                <div>
                    <input className='p-3 border border-gray-800 mt-4 rounded-md mr-4 ' type='number' id='regularPrice' min={1} max={10} required />
                    <span className='text-white text-lg'>Regular Price ($/day)</span>
                </div>
                <div>
                    <input className='p-3 border border-gray-800 mt-4 rounded-md mr-4 ' type='number' id='discountPrice' min={1} max={10} required />
                    <span className='text-white text-lg'>Discounted Price ($/day)</span>
                </div>
            </div>
        </div>
        <div className='flex flex-col flex-1'>
            <p className='font-semibold ml-2 mb-3 flex flex-wrap text-white'>Images:
            <span className='text-gray-400 ml-2'>The first image will be the main cover of your listing (max 6)</span>
            </p>
            <input className='p-3 text-white border mb-3' type='file' id='images' accept='image/*' multiple />
            <button className='p-3 rounded-lg border text-white w-36 border-green-500 bg-green-500 hover:opacity-95 disabled:opacity-100'>Upload</button>
            <button className='text-white p-3 bg-blue-700 rounded-lg mt-8'>Creating Listing</button>
        </div>
        
    </form>
   </main>
  )
}
