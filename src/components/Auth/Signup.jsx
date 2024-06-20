import { Link, useNavigate } from 'react-router-dom';
import axios from '@/components/utils/axios';
import { useEffect, useState } from 'react';
import toast from "react-hot-toast";

function Signup() {

  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    axios
      .get('votes/avatars/')
      .then(response => setAvatars(response.data))
  }, [])

  // Handle form
  const defaultFormData = {
    username: '',
    email: '',
    password: '',
    avatar: null,
  }
  const [formData, setFormData] = useState(defaultFormData);
   
  // Errors
   const [errors, setErrors] = useState([]);

  
  function handleAvatarClick(event){
    setFormData({
      ...formData,
      avatar: Number(event.currentTarget.id)
    })
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    setErrors([]);
    
    const newErrors = []
    if (formData.username === '')
      newErrors.push('You did not write an username!');
    if (formData.email === '')
      newErrors.push('You did not write a mail!');
    if (formData.password === '')
      newErrors.push('You did not write a password!');
    if (formData.avatar === null)
      newErrors.push('You did not choose an avatar!');
    setErrors(newErrors);
    
    if (!errors.length) {
      axios
        .post('users/', formData)
        // eslint-disable-next-line no-unused-vars
        .then((response) => {
          toast.success('Profile successfully created.');
          navigate('/login')
        })
        .catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              setErrors([...errors, `${property}: ${error.response.data[property]}`])
            } 
            console.log(JSON.stringify(error.response.data))
          } else if (error.message) {
            setErrors([...errors, 'Something went wrong. Please try again.'])
            console.log(JSON.stringify(error))
          }
        })
    }
  }
  
 

  return (
    <main className="text-white w-screen">
        <div className="p-8 w-3/4 mx-auto">
          
          <h2 className="text-3xl mt-10 mb-10 font-semibold uppercase">Create your profile</h2>
          
          <div className="mb-10">
            
            <form onSubmit={handleSubmit}>
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

              <h3 className='mt-4'>Choose an avatar</h3>
              
              <div className='mt-8 flex flex-wrap'>
                {avatars.map((avatar) => (
                  <div onClick={handleAvatarClick} id={avatar.id} key={avatar.id} className='m-4'>
                    <img
                      className={`w-[150px] h-[150px] hover:rounded-sm hover:border-primary hover:border-2
                                  ${avatar.id == formData.avatar ? 'border-primary border-2' : ''}`}
                      src={avatar.get_image} alt="avatar"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5">
                {errors.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>

              <button
                type='submit'
                className='mt-4 rounded-xl px-6 py-3 bg-primary border-2 border-black text-white hover:bg-green-400 transition-all'
              // eslint-disable-next-line react/no-unescaped-entities
              >Roll'em!</button>
            </form>
          </div>
          
          <div className="text-gray-500">Already have an account? <span className="underline text-white ml-4"><Link to="/login">Back to login</Link></span></div>
        
        </div>
    </main>
  )
}

export default Signup