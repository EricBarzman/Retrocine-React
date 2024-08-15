import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

import { auth } from '@/firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { getAvatars, createUser } from "@/lib/apis";
import { updateToken, updateUserId } from '@/store/userSlice';


function Signup() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatarId: '',
  });
  
  const [avatars, setAvatars] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(()=> {
    document.title = `Sign up | Retrocine`;
    getAvatars().then(result => setAvatars(result));
  }, [])

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  function handleAvatarClick(e){
    setFormData({
      ...formData,
      avatarId: e.currentTarget.id
    })
  }

  async function handleSubmit() {

    setErrors([]);

    const newErrors = []
    if (formData.username === '')
      newErrors.push('You did not write an username!');
    if (formData.email === '')
      newErrors.push('You did not write a mail!');
    if (formData.password === '')
      newErrors.push('You did not write a password!');
    if (formData.avatar === '')
      newErrors.push('You did not choose an avatar!');
    setErrors(newErrors);
    
    if(newErrors.length > 0) return;

    if (newErrors.length === 0) {

      try {  
        // Register on Firebase
        const result = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        
        // Create a user in Sanity
        await createUser({ firebaseId: result.user.uid, ...formData })

        // Store token
        dispatch(updateToken(result.user.accessToken));
        dispatch(updateUserId({ userId: result.user.uid}));

        toast.success("Account successfully created!");
        navigate('/')
        
      } catch (error) {
        toast.error(error)
      }
    }
  }
  
  return (
    <main className="text-white w-screen">
        <div className="p-8 w-3/4 mx-auto">
          
          <h2 className="text-3xl mt-10 mb-10 font-semibold uppercase">Create your profile</h2>
          
          <div className="mb-10">
            
            <div className='flex flex-col w-1/3'>  
              <input
                type="text"
                name='username'
                className='bg-black py-3 px-6 mb-4 rounded-xl border'
                placeholder='Your username...'
                onChange={handleChange}
              />

              <input
                type="email"
                name='email'
                className='bg-black py-3 px-6 mb-4 rounded-xl border'
                placeholder='Your mail...'
                onChange={handleChange}
              />

              <input
                type="password"
                name='password'
                className='bg-black py-3 px-6 mb-4 rounded-xl border'
                placeholder='Your password...'
                onChange={handleChange}
              />
            </div>

            <div className='mt-8 flex flex-wrap'>
              {avatars.map((avatar) => (
                  <div
                  onClick={handleAvatarClick}
                  id={avatar._id}
                  key={avatar._id}
                  className='m-4'
                  >
                      <img
                          className={`w-[150px] h-[150px] hover:rounded-sm hover:border-primary hover:border-2 ${avatar._id == formData.avatarId ? 'border-primary border-2' : ''}`}
                          src={`https://cdn.sanity.io/${avatar.imageUrl}`}
                          alt={avatar.label}
                      />
                  </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col">
              {errors.map((error) => (
                <p className='rounded-lg p-4 mb-2 bg-red-500' key={error}>{error}</p>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              className='mt-4 rounded-xl px-6 py-3 bg-primary border-2 border-black text-white hover:bg-green-400 transition-all'
            // eslint-disable-next-line react/no-unescaped-entities
            >Roll'em!
            </button>
          </div>
          
          <div className="text-gray-500">Already have an account? <span className="underline text-white ml-4"><Link to="/login">Back to login</Link></span></div>
        
        </div>
    </main>
  )
}

export default Signup