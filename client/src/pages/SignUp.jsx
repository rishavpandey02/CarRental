import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleAuth from '../components/GoogleAuth';


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-sembold my-6 text-white'>SignUp</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type="text" placeholder='username' className='border-blue-900 border-2 p-3 rounded-lg bg-black text-white' id='username' onChange={handleChange}/>
            <input type="email" placeholder='email' className='border-blue-900 border-2 p-3 rounded-lg bg-black text-white' id='email'onChange={handleChange}/>
            <input type="password" placeholder='password' className='border-blue-900 border-2 p-3 rounded-lg bg-black text-white' id='password'onChange={handleChange}/>

            <button 
            disable={loading} 
            className='w-52 mx-auto bg-blue-700 text-white py-2 rounded-lg hover:opacity-80 disabled: opacity-80'> 
            {loading ? 'Loading...' : 'Sign Up'}
            
            </button>
            <GoogleAuth/>
        </form>
        <div className='flex gap-2 mt-4'>
            <p className='text-white'>Already have an account?</p>
            <Link to={"/login"}>
                <span className='text-red-500 hover:underline'>Sign In</span>
            </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
