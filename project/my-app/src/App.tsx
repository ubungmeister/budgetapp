import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home} from './pages/home';
import SignUp from "./pages/auth/signUp";
import SignIn from "./pages/auth/signIn";
import Header from './compnents/layout/Header';
import { useCookies } from 'react-cookie';
import AdminPage from './pages/adminPage';
import Sidebar from './compnents/layout/Sidebar';




function App() {

    const [cookies, setCookie] = useCookies(['token']);
    console.log(cookies);
     const isLoggedIn = !!cookies.token;

  return (
    <div className=" bg-white bg-cover min-h-screen">
      {isLoggedIn?(
        <>
      <Router>
       <Header/>
        <div className="flex">
           <Sidebar/>
                <div className="flex-1 bg-white">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
                </div>
        </div>
     </Router>
        </>
      ):(
      <Router>
      <Routes>
        <Route path="/auth/signUp" element={<SignUp/>} />
        <Route path="/auth/signIn" element={<SignIn/>} />
        </Routes>
      </Router>  
      )
    }
    </div>
  );
}
//test

export default App;
