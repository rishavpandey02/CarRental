import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Login() {
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
      const res = await fetch('/api/auth/login', {
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
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-sembold my-6 text-white'>Login</h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type="email" placeholder='email' className='border-blue-900 border-2 p-3 rounded-lg bg-black text-white' id='email'onChange={handleChange}/>
            <input type="password" placeholder='password' className='border-blue-900 border-2 p-3 rounded-lg bg-black text-white' id='password'onChange={handleChange}/>

            <button 
            disable={loading} 
            className='bg-blue-700 text-white py-2 rounded-lg hover:opacity-80 disabled: opacity-80'> 
            {loading ? 'Loading...' : 'Login'}
            
            </button>
        </form>
        <div className='flex gap-2 mt-4'>
            <p>Dont have an account?</p>
            <Link to={"/signup"}>
                <span className='text-red-500 hover:underline'>Sign Up</span>
            </Link>
        </div>
        {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
