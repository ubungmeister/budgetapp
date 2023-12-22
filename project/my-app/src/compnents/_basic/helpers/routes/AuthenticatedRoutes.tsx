import { Route, Routes } from 'react-router-dom';

import Budget from '../../../../pages/admin/budget/Budget';
import AdminPage from '../../../../pages/admin/overview/AdminOverview';
import PocketMoney from '../../../../pages/admin/pocket-money/PocketMoney';
import Users from '../../../../pages/admin/users/Users';
import Settings from '../../../../pages/settings/Settings';
import Tasks from '../../../../pages/tasks/Tasks';
import CashFlow from '../../../../pages/user/cash-flow/CashFlow';
import Goals from '../../../../pages/user/goals/Goals';
import Overview from '../../../../pages/user/overview/Overview';
import Header from '../../../layout/header/Header';
import Sidebar from '../../../layout/sidebar/Sidebar';
import NotFound from '../routes/NotFound';

export const AuthenticatedRoutes = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-white">
          <Routes>
            <Route path="/admin/overview" element={<AdminPage />} />
            <Route path="/admin/budget" element={<Budget />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/pocket-money" element={<PocketMoney />} />
            <Route path="/" element={<Overview />} />
            <Route path="/cash-flow" element={<CashFlow />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
