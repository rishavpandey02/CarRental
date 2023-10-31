import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

export const Header = () => {
  const {currentUser} = useSelector(state => state.user)
  return (
    <header className='bg-slate-800'>
        <div className='flex justify-between items-center max-w-12xl mx-auto p-3'>
        <Link to="/">
        <div className=''>
        <h1 className="font-bold text-sm sm:text-sm flex flex-wrap">
            <span className='text-white text-3xl'>Luxe</span>
            <span className='text-blue-700 text-3xl'>Wheels</span>
        </h1>
        </div>
        </Link>
        
        <ul className='flex gap-4 text-white'>
            <Link to="/">
            <li className='hidden sm:inline hover:underline'>Home</li>
            </Link>
            <Link to="/about">
            <li className='hidden sm:inline hover:underline'>About Us</li>
            </Link>
            <Link to="/profile">
              {currentUser ? (
                <img className='rounded-full h-7 w-7' src={currentUser.avatar} alt='Profile' />
              ) : ( 
            <li className='hover:underline'>Sign in</li>
            )}
            </Link>
        </ul>
        </div>
        
    </header>
  )
}
