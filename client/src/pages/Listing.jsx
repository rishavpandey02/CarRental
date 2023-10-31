import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle';
import { FaMapMarkedAlt } from 'react-icons/fa'
import { GiCarSeat } from 'react-icons/gi'
import { Link } from 'react-router-dom'



export default function listing() {
  SwiperCore.use([Navigation]);
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    const params = useParams();
    
    
    useEffect(() => {
        const fetchListing = async () => {
          try {
            setLoading(true);
            const res = await fetch(`/api/listing/get/${params.listingId}`);
            const data = await res.json();
            if (data.success === false) {
              setError(true);
                return;
            }
            setListing(data);
            setLoading(false);
          } catch (error) {
            setError(true);
            setLoading(false);
          }
           
        };
        fetchListing();
    }, [params.listingId]);
  return (
    <main>
      {loading && <p className='text-center my-7'>Loading...</p>}
      {error && (<p className='text-center my-7 text-2xl'>Something went wrong!</p>)}
      {listing && !loading && !error && ( <div className='mt-1'>
          <Swiper navigation>
            {listing.imageUrls.map((url) =>(
              <SwiperSlide key={url}>
                <div className='h-[550px]' style={{background:`url(${url}) center no-repeat`, backgroundSize:'cover'}}></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='flex flex-row flex-wrap gap-5 m-4'>
            <div className='w-3/4 p-9'>
            <p className='text-white text-3xl font-semibold mb-2'>
            {listing.name} - ${''}
              {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
                / day
            </p> 
              <p className='text-white flex items-center gap-2 mb-2  '>
                <FaMapMarkedAlt className='text-green-500' />
                {listing.address}
              </p>
              <h1 className='text-white text-4xl font-semibold underline mb-2'>Description:</h1>
              <p className='text-white'>{listing.description}</p>
            </div>
            <div className='p-9'>
              <div>
            <p className='text-white text-center bg-red-700 rounded-lg mb-4 text-2xl'>FOR HIRE</p>
            <p className='text-white text-center bg-green-500 rounded-lg mb-4 text-2xl'>${+listing.regularPrice - +listing.discountPrice} discount </p>
            </div>
            <p className='text-white text-2xl mb-4'>
              <span className='mr-3 font-semibold'>Transmission:</span>
              {listing.transmission === 'manual' ? 'Manual' : 'Automatic'}</p>
              <p className='text-white flex gap-2 text-2xl'>
              <GiCarSeat />
              {listing.seats > 1
                  ? `${listing.seats} Seats `
                  : `${listing.seats} Seat `}
              </p>
            
            </div>
            
          </div>
          
          </div>
      )}
    </main>
  )
}
