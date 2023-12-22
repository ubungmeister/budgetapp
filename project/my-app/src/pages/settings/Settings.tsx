import UserUpdate from '../../compnents/settings/UserUpdateForm';
import { useUser } from '../../hooks/UseQueries';

const Settings = () => {
  const { data: userData } = useUser();

  return (
    <div>
      <h1 className="p-10">Account settings</h1>
      <UserUpdate userData={userData} />
    </div>
  );
};

export default Settings;
