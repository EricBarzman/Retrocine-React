import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from '@/components/utils/axios'

import { updateToken } from "@/store/userSlice";

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultFormData = {
    username: '',
    password: '',
  }
  const [formData, setFormData] = useState(defaultFormData);   
  const [errors, setErrors] = useState([]);

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
      newErrors.push('You did not write a username!');
    if (formData.password === '')
      newErrors.push('You did not write a password!');
    setErrors(newErrors);
    
    if (!errors.length) {
      axios
        .post('token/login/', formData)
        .then((response) => {
          const token = response.data.auth_token;
          axios.defaults.headers.common['Authorization'] = "Token " + token;
          dispatch(updateToken(token));
          dispatch({ type: 'FETCH_FAVORITES' });
          dispatch({ type: 'FETCH_USER_INFOS' });
          navigate('/')
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
    <main className="text-white w-screen h-screen">
        <div className="p-10 w-3/4 mx-auto">
          
          <h2 className="text-3xl mt-10 mb-10 font-semibold uppercase">Choose your profile</h2>
          
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
                  type="password"
                  name='password'
                  className='bg-black py-3 px-6 mb-4 rounded-xl border'
                  placeholder='Your password...'
                  onChange={handleChange}
                />
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
              >Log in</button>
            </form>
          </div>
          
          <div className="text-gray-500">No account yet? <span className="underline text-white ml-4"><Link to="/signup">Sign up</Link></span></div>
        
        </div>
    </main>
  )
}

export default Login