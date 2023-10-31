import { Link } from "react-router-dom"
import mainImg from '../assets/mainImg.jpg'
import { useState, useEffect } from "react"
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [automaticListings, setAutomaticListings] = useState([]);
  const [manualListings, setManualListings] = useState([]);
  
  useEffect(() => {
  const fetchOfferListings = async () => {
    try {
      const res = await fetch('/api/listing/get?offer=true&limit=4');
      const data = await res.json();
      setOfferListings(data);
      fetchAutomaticListings(); 
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAutomaticListings = async () => {
    try {
      const res = await fetch('/api/listing/get?transmission=automatic&limit=4');    
      const data = await res.json();
      setAutomaticListings(data);
      fetchManualListings()  
    } catch (error) {
      console.log(error)
    }
  };

  const fetchManualListings = async () => {
    try {
      const res = await fetch('/api/listing/get?transmission=manual&limit=4');
      const data = await res.json();
      setManualListings(data);
    } catch (error) {
      log(error)
    }
  }

  fetchOfferListings()
}, []);

  return (
    <div>
        <div className='px-3 max-w-6xl mx-auto flex flex-col gap-6 text-white m-9 text-3xl lg:text-6xl line'>
            <h1>Find your next <span className='text-blue-700 font-semibold'>Quality Car's</span> 
            <br/>
            you wish to Hire! </h1>
            <div>
                <p className="text-blue-300">LuxeWheels will ensure that you have a pleasurable experience, via our wide range of vehicles.</p>
            </div>
        </div>

        <div className="h-5/6">
          <img src={mainImg} alt="Main img of home screen" className=" h-5/6 object-contain" />
        </div>

        <div className="mx-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
            {
              offerListings && offerListings.length > 0 && (
              <div className="">
                  <div>
                    <h2 className="text-white text-2xl">Recent Offers:</h2>
                  </div>
                  <div>
                    {
                      offerListings.map((listing) => (
                        <ListingItem listing={listing} key={listing._id} />
                      ))
                    }
                  </div>
              </div>
               )};

            </div>

            <div className="mx-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
            {
              automaticListings && automaticListings.length > 0 && (
              <div className="">
                  <div>
                    <h2 className="text-white text-2xl">Automatic Cars:</h2>
                  </div>
                  <div>
                    {
                      automaticListings.map((listing) => (
                        <ListingItem listing={listing} key={listing._id} />
                      ))
                    }
                  </div>
              </div>
               )};

            </div>

            <div className="mx-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
            {
              manualListings && manualListings.length > 0 && (
              <div className="">
                  <div>
                    <h2 className="text-white text-2xl">Manual Cars:</h2>
                  </div>
                  <div>
                    {
                      manualListings.map((listing) => (
                        <ListingItem listing={listing} key={listing._id} />
                      ))
                    }
                  </div>
              </div>
               )};

            </div>
    </div>
  )
}
