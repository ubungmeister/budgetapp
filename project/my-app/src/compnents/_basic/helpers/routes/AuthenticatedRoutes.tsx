import { Route, Routes } from 'react-router-dom';

import AdminPage from '../../../../pages/admin/Admin';
import Budget from '../../../../pages/budget/Budget';
import CashFlow from '../../../../pages/cash-flow/CashFlow';
import Goals from '../../../../pages/goals/Goals';
import Overview from '../../../../pages/overview/Overview';
import PocketMoney from '../../../../pages/pocket-money/PocketMoney';
import Users from '../../../../pages/users/Users';
import Header from '../../../layout/Header';
import Sidebar from '../../../layout/Sidebar';

export const AuthenticatedRoutes = () => {
  return (
    <>
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
    </>
  );
};
