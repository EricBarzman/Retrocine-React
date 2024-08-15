import { Routes, Route, useLocation } from 'react-router-dom';

import ScrollToTop from './ScrollToTop';
import Nav from './Header/Nav';
import Footer from './Footer/Footer';
import Home from './Home/Home';
import About from './Footer/About';
import Terms_of_use from './Footer/Terms_of_use';
import Contact from './Footer/Contact';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import Index from './Movies/Index/Index'
import MoviePage from './Movies/MoviePage/MoviePage';
import Pick_of_the_week from './Movies/PickOfTheWeek/Pick_of_the_week';
import My_Account from './MyAccount/My_Account';
import My_Favorites from './MyAccount/My_Favorites';
import Popular from '@/components/Movies/Popular/Popular';
import Search from '@/components/Movies/Search/Search';


import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function App() {

  // Check if user is logged first
  const navigate = useNavigate();
  const user = useSelector((state) => state.user)
  const { logged } = user;

  useEffect(() => {
    if (!logged) navigate('/login')
  }, [])

  const location = useLocation();
  
  return (
    <div className='bg-black'>
      <ScrollToTop />

      {/* Don't show Nav when login or signup */}
      {(location.pathname !== '/login' && location.pathname !== '/signup') ? <Nav /> : null}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search/" element={<Search />} />
        <Route path="/movies/" element={<Index />} />
        <Route path="/movies/:movie_slug" element={<MoviePage />} />
        <Route path="/pick-of-the-week" element={<Pick_of_the_week />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/my-favorites" element={<My_Favorites />} />
        <Route path="/my-account" element={<My_Account />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms-of-use" element={<Terms_of_use />} />
        <Route path="/contact-us" element={<Contact />} />
      </Routes>
      
      {/* Don't show footer when login or signup */}
      {(location.pathname !== '/login' && location.pathname !== '/signup') ? <Footer /> : null}
    </div>
  )
}