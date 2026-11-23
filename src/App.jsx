import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import UserSidebar from './components/UserSidebar';
import TrainerSidebar1 from './components/TrainerSidebar1';

import AdminLayout from './Layout/AdminLayout';
import CustomerLayout from './Layout/CustomerLayout';

import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Review from './pages/Review';
import Booking from './pages/Booking';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Membership from './pages/membership';
import Trainers from './pages/Trainers';
import Workouts from './pages/Workouts';
import RegistrationForm from './pages/Auth/RegistrationForm/RegistrationForm';
import Login from './pages/Auth/Login/Login';
import Admin from './pages/Auth/Login/Admin';
import Classes from './pages/Admin/Classes';
import Dashboard from './pages/Admin/Dashboard';
import Payments from './pages/Admin/Payments';
import Reports from './pages/Admin/Reports';
import Profile from './pages/Admin/Profile';
import Schedule from './pages/Trainer/Schedule';
import Progress from './pages/Trainer/Progress';
import MyClients from './pages/Trainer/MyClients';
import Trainerdashboard from './pages/Trainer/trainerdashboard';
import Trainerworkouts from './pages/Trainer/trainerworkouts';
import Sessiontracker from './pages/Trainer/session-tracker';
import Trainerprofile from './pages/Trainer/trainerprofile';
import Customerdashboard from './pages/Customer/Customerdashboard';
import CustomerNutrition from './pages/Customer/CustomerNutrition';
import Customerprogress from './pages/Customer/Customerprogress';
import Customerworkout from './pages/Customer/Customerworkout';
import Customerprofile from './pages/Customer/Customerprofile';
import Customerschedule from './pages/Customer/Customerschedule';

import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {

  
  return (
    <Router>
      <Navbar />
      <Sidebar/>
      <TrainerSidebar1/>
      <UserSidebar/>

     
     

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/review" element={<Review />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/Trainers" element={<Trainers />} />
        <Route path="/Workouts" element={<Workouts />} />
        <Route path="/Admin/Classes" element={<Classes />} />
        <Route path="/Admin/Dashboard" element={<Dashboard />} />#
        <Route path="/Admin/Payments" element={<Payments />} />
        <Route path="/Admin/Reports" element={<Reports />} />
        <Route path="/Admin/Profile" element={<Profile />} />
        
        <Route path="/Trainer/Schedule" element={<Schedule />} />
        <Route path="/Trainer/Progress" element={<Progress />} />
        <Route path="/Trainer/MyClients" element={<MyClients />} />
        <Route path="/Trainer/trainerworkouts" element={<Trainerworkouts />} />
        <Route path="/Trainer/trainerdashboard" element={<Trainerdashboard />} />
        <Route path="/Trainer/session-tracker" element={<Sessiontracker />} />
        <Route path="/Trainer/trainerprofile" element={<Trainerprofile />} />

        <Route path="/Customer/Customerdashboard" element={<Customerdashboard />} />
        <Route path="/Customer/CustomerNutrition" element={<CustomerNutrition />} />
        <Route path="/Customer/Customerprogress" element={<Customerprogress />} />
        <Route path="/Customer/Customerworkout" element={<Customerworkout />} />
        <Route path="/Customer/Customerprofile" element={<Customerprofile />} />
        <Route path="/Customer/Customerschedule" element={<Customerschedule />} />

        <Route path="/membership" element={<Membership />} />
        <Route path="/auth/RegistrationForm" element={<RegistrationForm />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/Admin" element={<Admin />} />
      

        <Route path="/AdminLayout" element={<AdminLayout/> } />
       <Route path="/CustomerLayout" element={<CustomerLayout/> } />
     
       
       
        {/* Add a catch-all route for 404 pages if needed */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
