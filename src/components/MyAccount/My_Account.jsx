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
            className="px-6 py-3 mt-10 bg-primary text-white rounded-lg hover:border-solid-2 hover:border-blue-400"
            onClick={clickLogout}
        >
                Log out
        </button>

        </main>
    )
}

export default My_Account