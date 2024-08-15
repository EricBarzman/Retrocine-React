import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "@/store/userSlice";

import { getAvatars, updateUserAvatar, getUserInfo } from '@/lib/apis';

function My_Account() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeUser = useSelector((state) => state.user)

  const [user, setUser] = useState(null);
  const [avatars, setAvatars] = useState([]);
  const [chosenAvatarId, setChosenAvatarId] = useState('');


  useEffect(()=> {
    document.title = `My Account | Retrocine`;

    getUserInfo(storeUser.firebaseUserId).then(result => {
      setUser(result)
    });

    getAvatars().then(result => {    
      setAvatars(result);
    });
  }, [user])


  function clickLogout() {
    dispatch(handleLogout());
    navigate('/login');
  }

  async function submitAvatar() {
    try {
        await updateUserAvatar({
            userId: user._id,
            avatarObj: {
                _type: "reference",
                _ref: chosenAvatarId
            }
        });
        toast.success("Avatar changed!");
        getUserInfo(storeUser.firebaseUserId).then(result => {
          setUser(result);
        });
        window.location.reload();
        
    } catch(error) {
        toast.error(error)
    }
  } 

    return (
        <main className="container mx-auto px-2 md:px-4 py-10 text-white">
        
            <div className="text-white p-4 flex items-center mb-8">
                <div className="md:w-[143px] w-28 h-28">
                    <img 
                        src={`https://cdn.sanity.io/${user?.avatar.imageUrl}`}
                        alt={user?.avatar.label}
                        width={200}
                    />
                </div>

                <div className="ml-12 font-bold text-lg capitalize">
                    {user?.username}
                </div>
            </div>

            {/* <div className="mb-10">
                <h2 className="font-bold mb-2">About</h2>
                {user.about !== null && <p className="font-normal">{user.about}</p>}
            </div> */}

            <h3 className='mt-4 font-bold'>Choose a new avatar</h3>
              
            <div className='mt-8 flex flex-wrap'>
                {avatars.map((avatar) => (
                    <div
                    onClick={(e) => setChosenAvatarId(e.currentTarget.id)}
                    id={avatar._id}
                    key={avatar._id}
                    className='m-4'
                    >
                        <img
                            className={`w-[150px] h-[150px] hover:rounded-sm hover:border-primary hover:border-2
                                ${avatar._id == chosenAvatarId ? 'border-primary border-2' : ''}`}
                            src={`https://cdn.sanity.io/${avatar.imageUrl}`}
                            alt={avatar.label}
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