import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home} from './pages/home';
import SignUp from "./pages/auth/signup";
import SignIn from "./pages/auth/signin";
import Header from './compnents/layout/Header';
import { useCookies } from 'react-cookie';
import AdminPage from './pages/adminPage';




function App() {

    const [cookies, setCookie] = useCookies(['token']);
    console.log("cookie",cookies);

  return (
    <div className="App">
     <Router>
      {cookies.token && <Header/>}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth/signUp" element={<SignUp/>} />
        <Route path="/auth/signIn" element={<SignIn/>} />
        <Route path="/admin" element={<AdminPage/>} />
      </Routes>
     </Router>
    </div>
  );
}
//test

export default App;
