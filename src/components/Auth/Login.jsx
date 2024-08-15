import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { auth } from "@/firebase/firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth";

import { updateToken } from "@/store/userSlice";
import { updateSanityUserId, updateUserId } from "../../store/userSlice";
import { getUserInfo } from "../../lib/apis";

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');   
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    
    const newErrors = []
    if (email === '')
      newErrors.push('You did not write your email!');
    if (password === '')
      newErrors.push('You did not write a password!');
    setErrors(newErrors);
    
    if (newErrors.length > 0) return 0;

    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const firebaseUserId = result.user.uid
      const token = result.user.accessToken

      dispatch(updateToken(token));
      dispatch(updateUserId({ firebaseUserId }));
      const user = await getUserInfo(firebaseUserId);
      dispatch(updateSanityUserId({ sanityUserId: user._id }));
      dispatch({ type: 'FETCH_FAVORITES' });

      navigate('/')
    
    } catch (error) {
      toast.error('Email or password incorrect');
    }
    
  }
  

  return (
    <main className="text-white w-screen h-screen">
        <div className="p-10 w-3/4 mx-auto">
          
          <h2 className="text-3xl mt-10 mb-10 font-semibold uppercase">Choose your profile</h2>
          
          <div className="mb-10">
            
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col w-1/3'>
                
                <input
                  type="email"
                  className='bg-black py-3 px-6 mb-4 rounded-xl border'
                  placeholder='Your email...'
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  type="password"
                  className='bg-black py-3 px-6 mb-4 rounded-xl border'
                  placeholder='Your password...'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-5">
                {errors.map((error) => (
                  <p className='rounded-lg p-4 mb-2 bg-red-500' key={error}>{error}</p>
                ))}
              </div>

              <button
                type='submit'
                className='mt-4 rounded-xl px-6 py-3 bg-primary border-2 border-black text-white hover:bg-green-400 transition-all'
              >
                Log in
              </button>
            </form>
          </div>
          
          <div className="text-gray-500">
            No account yet? <span className="underline text-white ml-4"><Link to="/signup">Sign up</Link></span>
          </div>
        
        </div>
    </main>
  )
}

export default Login