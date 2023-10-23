import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className='bg-slate-800'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to="/">
        <div className=''>
        <h1 className="font-bold text-sm sm:text-sm flex flex-wrap">
            <span className='text-white text-3xl'>Luxe</span>
            <span className='text-blue-700 text-3xl'>Wheels</span>
        </h1>
        </div>
        </Link>
        <form className='flex items-center rounded-lg p-2 bg-white'>
            <input type="text" placeholder='Search...' className='bg-transparent p-1 focus:outline-none w-24 sm:w-64' />
            <FaSearch className='text-slate-600'/>
        </form>
        <ul className='flex gap-4 text-white'>
            <Link to="/">
            <li className='hidden sm:inline hover:underline'>Home</li>
            </Link>
            <Link to="/about">
            <li className='hidden sm:inline hover:underline'>About Us</li>
            </Link>
            <Link to="/Login">
            <li className='hover:underline'>Sign in</li>
            </Link>
        </ul>
        </div>
        
    </header>
  )
}
