import { Link } from "react-router-dom"

function Nav() {
  return (
    <header className="px-4 py-5 bg-black text-white mx-auto text-xl flex flex-wrap md:flex-nowrap items-end justify-between">
        
        <div className="flex ml-4 items-end">
            {/* Logo */}
            <h1>
                <Link to='/' className="text-2xl font-bold text-primary"><span className="text-4xl">R</span>ETROCINE</Link>
            </h1>
            
            {/* Search options */}
            <ul className="flex ml-4 text-base items-center justify-between">
            
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

        {/* My account */}
        <div className="ml-4">
            <Link to='/my-account'>
                <img src="http://localhost:8000/media/avatars/kubrick.jpg" className="w-[50px] h-[50px]" alt="avatar" />
            </Link>
        </div>

    </header>
  )
}

export default Nav