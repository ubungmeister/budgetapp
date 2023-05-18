import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home} from './pages/home';
import SignUp from "./pages/auth/signup";
import SignIn from "./pages/auth/signin";


function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth/signUp" element={<SignUp/>} />
        <Route path="/auth/signIn" element={<SignIn/>} />
      </Routes>
     </Router>
    </div>
  );
}
//test

export default App;
