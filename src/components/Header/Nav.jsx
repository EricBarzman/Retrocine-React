import { Link, useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { updateSearchInput } from "@/store/searchSlice";

import { getUserInfo } from "@/lib/apis";

function Nav() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [searchInput, setSearchInput] = useState('');
    const [user, setUser] = useState(null);

    const storeUser = useSelector((state) => state.user)

    useEffect(()=> {
        getUserInfo(storeUser.firebaseUserId).then(user => setUser(user))        
    }, [storeUser.firebaseUserId])

    function handleSearch(event) {
        event.preventDefault();
        dispatch(updateSearchInput(searchInput));
        navigate(`/search/`);
    }

    return (
    <header className="px-4 py-5 bg-black text-white mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between">
        
        <div className="flex ml-4 items-end">
            
            {/* Logo */}
            <h1>
                <Link to='/' className="text-2xl font-bold text-primary">
                    <span className="text-4xl">R</span>ETROCINE
                </Link>
            </h1>
            
            {/* Search options */}
            <ul className="hidden md:flex ml-4 md:text-sm lg:text-base items-center justify-between">
            
                <li className="font-light px-4 hover:-translate-y-2 duration-500 transition-all">
                    <Link to='/'>Home</Link>
                </li>

                <li className="font-light px-4 hover:-translate-y-2 duration-500 transition-all">
                    <Link to='/movies'>Movies</Link>
                </li>
            
                <li className="font-light px-4 hover:-translate-y-2 duration-500 transition-all">
                    <Link to='/pick-of-the-week'>Pick of the week</Link>
                </li>
            
                <li className="font-light px-4 hover:-translate-y-2 duration-500 transition-all">
                    <Link to='/popular'>Popular</Link>
                </li>
            
                <li className="font-light px-4 hover:-translate-y-2 duration-500 transition-all">
                    <Link to='/my-favorites'>My favorites</Link>
                </li>
            </ul>
        </div>

        <div className="flex items-end justify-around mr-6">

            <div className="hidden md:flex mr-4 items-center">     
                <form onSubmit={handleSearch}>
                    <input
                        className={`bg-black text-base py-2 px-4 rounded-full
                            border-[1px] relative flex-wrap-reverse z-10 w-64`}
                        type="text"
                        name="search"
                        value={searchInput}
                        onChange={(e) => {
                            setSearchInput(e.target.value)
                        }}
                        placeholder="Search by title"
                    />
                </form>
                <FaMagnifyingGlass className="cursor-pointer ml-3"/>
            </div>

            {/* My account */}
            <div className="ml-4">
                <Link to='/my-account'>
                    <img src={`https://cdn.sanity.io/${user?.avatar.imageUrl}`} className="w-[50px] h-[50px]" alt="profile" />
                </Link>
            </div>
        </div>

    </header>
  )
}

export default Nav