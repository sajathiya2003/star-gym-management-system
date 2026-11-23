import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaDumbbell, FaUser, FaCalendarAlt, FaImages, FaPhoneAlt } from 'react-icons/fa';
import { GiGymBag } from 'react-icons/gi';
import './Navbar.css';
import { FaUserShield, FaCog, FaCrown, FaLock, FaUserTie } from 'react-icons/fa';

function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);


  
  // ✅ Hide navbar on admin, trainer, and customer routes
  useEffect(() => {
    const isAdminRoute = location.pathname.startsWith('/admin');
    const isTrainerRoute = location.pathname.startsWith('/trainer');
    const isCustomerRoute = location.pathname.startsWith('/Customer');
    setShowNavbar(!isAdminRoute && !isTrainerRoute && !isCustomerRoute);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Don't render navbar if route is admin, trainer, or customer dashboard
  if (!showNavbar) {
    return null;
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo-container">
        {/* Logo Image */}
        <img src="" alt="" className="" /> 

        {/* Logo Text */}
        <div className="logo-text">
          <span className="logo-main">STAR</span>
          <span className="logo-sub">GYM FITNESS</span>
        </div>
      </Link>
      
      <div className="nav-links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          <FaDumbbell className="nav-icon" />
          <span>Home</span>
        </Link>

        <Link 
          to="/about" 
          className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
        >
          <FaUser className="nav-icon" />
          <span>About Us</span>
        </Link>
        
        <Link 
          to="/workouts" 
          className={`nav-link ${location.pathname === '/workouts' ? 'active' : ''}`}
        >
          <FaDumbbell className="nav-icon" />
          <span>Workouts</span>
        </Link>
        
        <Link 
          to="/trainers" 
          className={`nav-link ${location.pathname === '/trainers' ? 'active' : ''}`}
        >
          <FaUser className="nav-icon" />
          <span>Trainers</span>
        </Link>
        
        <Link 
          to="/booking" 
          className={`nav-link ${location.pathname === '/booking' ? 'active' : ''}`}
        >
          <FaCalendarAlt className="nav-icon" />
          <span>Booking</span>
        </Link>
        
        <Link 
          to="/membership" 
          className={`nav-link ${location.pathname === '/membership' ? 'active' : ''}`}
        >
          <GiGymBag className="nav-icon" />
          <span>Membership</span>
        </Link>
        
        <Link 
          to="/gallery" 
          className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}
        >
          <FaImages className="nav-icon" />
          <span>Features</span>
        </Link>
        
        <Link 
          to="/contact" 
          className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
        >
          <FaPhoneAlt className="nav-icon" />
          <span>Contact</span>
        </Link>
        
        <div className="auth-buttons">
          <Link to="/auth/login" className="login-btn">
            <FaUser className="btn-icon" />
            <span>User Login</span>
          </Link>

        <Link to="/auth/Admin" className="login-btn">
  <FaUserShield className="btn-icon" />
  <span>Admin Login</span>
</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;