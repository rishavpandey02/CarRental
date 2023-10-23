import React from 'react';
import { Link } from 'react-router-dom';


export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-sembold my-6 text-white'>SignUp</h1>

        <form className='flex flex-col gap-4'>
            <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username'/>
            <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email'/>
            <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password'/>

            <button className='bg-blue-700 text-white py-2 rounded-lg hover:opacity-80 disabled: opacity-80'>SIGN UP</button>
        </form>
        <div className='flex gap-2 mt-4'>
            <p>Already have an account?</p>
            <Link to={"/sign-in"}>
                <span className='text-red-500 hover:underline'>Sign In</span>
            </Link>
        </div>
    </div>
  )
}
