import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { handleLogout } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";

function My_Account() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=> {
        document.title = `My Account | Retrocine`;
    }, [])

    function clickLogout() {
        dispatch(handleLogout());
        navigate('/login')
    }

    return (
        <main className="bg-white text-black h-screen p-6">
        <div className="">Something different!</div>
        
        <button
            className='mt-4 rounded-xl px-6 py-3 bg-primary text-white hover:bg-green-400 transition-all'
            onClick={clickLogout}
        >
                Log out
        </button>

        </main>
    )
}

export default My_Account