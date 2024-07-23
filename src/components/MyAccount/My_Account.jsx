import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import axios from '@/components/utils/axios';
import { handleLogout } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";

function My_Account() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [avatars, setAvatars] = useState([]);

  const [chosenAvatar, setChosenAvatar] = useState();

  useEffect(()=> {
    document.title = `My Account | Retrocine`;
    axios
      .get('votes/avatars/')
      .then(response => setAvatars(response.data))
  }, [])

  function clickLogout() {
    dispatch(handleLogout());
    navigate('/login');
  }

  function submitAvatar() {
    try {
        axios
        .post('votes/change-avatar/', { avatar : chosenAvatar})
        .then(() => toast.success("Avatar changed!"))
        dispatch({ type: 'FETCH_USER_INFOS' });
    } catch(error) {
        toast.error(error)
    }
  } 

    return (
        <main className="container mx-auto px-2 md:px-4 py-10 text-white">
        
            <div className="text-white p-4 flex items-center mb-8">
                <div className="md:w-[143px] w-28 h-28">
                    <img src={user.avatar} alt={user.username} width={200} />
                </div>

                <div className="ml-12 font-bold text-lg capitalize">
                    {user.username}
                </div>
            </div>

            {/* <div className="mb-10">
                <h2 className="font-bold mb-2">About</h2>
                {user.about !== null && <p className="font-normal">{user.about}</p>}
            </div> */}

            <h3 className='mt-4 font-bold'>Choose an avatar</h3>
              
            <div className='mt-8 flex flex-wrap'>
                {avatars.map((avatar) => (
                    <div
                    onClick={(e) => setChosenAvatar(Number(e.currentTarget.id))}
                    id={avatar.id}
                    key={avatar.id}
                    className='m-4'
                    >
                        <img
                            className={`w-[150px] h-[150px] hover:rounded-sm hover:border-primary hover:border-2 ${avatar.id == chosenAvatar ? 'border-primary border-2' : ''}`}
                            src={avatar.get_image}
                            alt="avatar"
                        />
                    </div>
                ))}
            </div>
              
            <div className="mb-10">
                <button
                    className="mt-4 rounded-xl px-6 py-3 bg-primary text-white hover:bg-green-400 transition-all"
                    onClick={submitAvatar}
                >
                    Change Avatar
                </button>
            </div>
            
            <button
                className='mt-4 rounded-xl px-6 py-3 bg-blue-600 text-white hover:bg-blue-400 transition-all'
                onClick={clickLogout}
            >
                    Log out
            </button>

        </main>
    )
}

export default My_Account