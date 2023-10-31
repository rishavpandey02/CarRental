import { Link } from 'react-router-dom';

export default function ListingItem({ listing }) {
    return (
      <div className='mb-9 bg-gray-600 shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] '>
        <Link to={`/listing/${listing._id}`}>
          <img src={listing.imageUrls[0]} alt='MainIMG' />
        </Link>
  
        <p className='text-white'>{listing.name}</p>
  
        <div className='flex flex-wrap gap-4'>
          <p className='text-sm text-white truncate w-full'>{listing.address}</p>
        </div>
  
        <p className='text-sm text-white line-clamp-2'>
          Description: {listing.description}
        </p>
  
        <p className='text-white mt-2 font-semibold'>
          ${listing.offer
            ? listing.discountPrice.toLocaleString('en-US')
            : listing.regularPrice.toLocaleString('en-US')}
        </p>
  
        <div className='text-white flex gap-4'>
          <div className='font-bold text-xs'>
            {listing.bedrooms > 1
              ? `${listing.seats} seats`
              : `${listing.seats} seat`}
          </div>
        </div>
      </div>
    );
  }
  