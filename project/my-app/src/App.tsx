import { useCookies } from 'react-cookie';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './App.css';
import Header from './compnents/layout/Header';
import Sidebar from './compnents/layout/Sidebar';
import AdminPage from './pages/admin/Admin';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Budget from './pages/budget/Budget';
import CashFlow from './pages/cash-flow/CashFlow';
import Goals from './pages/goals/Goals';
import Overview from './pages/overview/Overview';
import PocketMoney from './pages/pocket-money/PocketMoney';
import Users from './pages/users/Users';

function App() {
  const [cookies, setCookie] = useCookies(['token']);
  console.log(cookies);
  const isLoggedIn = !!cookies.token;

  return (
    <div className=" bg-white bg-cover min-h-screen">
      {isLoggedIn ? (
        <>
          <Router>
            <Header />
            <div className="flex">
              <Sidebar />
              <div className="flex-1 bg-white">
                <Routes>
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/budget" element={<Budget />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/pocket-money" element={<PocketMoney />} />
                  <Route path="/cash-flow" element={<CashFlow />} />
                  <Route path="/goals" element={<Goals />} />
                  <Route path="/overview" element={<Overview />} />
                  <Route path="/" element={<Overview />} />
                </Routes>
              </div>
            </div>
          </Router>
        </>
      ) : (
        <Router>
          <Routes>
            <Route path="/auth/signUp" element={<SignUp />} />
            <Route path="/auth/signIn" element={<SignIn />} />
            <Route path="/" element={<SignIn />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}
//test

export default App;
