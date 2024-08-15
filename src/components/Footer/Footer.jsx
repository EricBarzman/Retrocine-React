import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
        <div className="container px-4 mx-auto">
            <div className="flex flex-wrap flex-row items-center justify-between gap-16">
                <div className="flex flex-col py-6 px-3">
                    <Link to='/about' className="my-3">About</Link>
                    <Link to='/terms-of-use' className="my-3">Terms of Use</Link>
                    <Link to='/contact-us' className="my-3">Contact us</Link>
                </div>
            </div>
        </div>
    </footer>
  )
}
