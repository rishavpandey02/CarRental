import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice';
import {useNavigate} from 'react-router-dom';

export default function GoogleAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)

            const res =await fetch('/api/auth/google', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL}),
            })
            const data = await res.json()
            dispatch(signInSuccess(data));
            navigate('/')
        } catch (error) {
            console.log('couldnt sign in with google account', error)
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-white p-2 rounded-lg font-semibold text-blue-800 hover:opacity-95 w-52 mx-auto'>SIGN IN WITH GOOGLE</button>
  )
}
