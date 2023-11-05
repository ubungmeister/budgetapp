import { useEffect, useState } from 'react';

import AddItemControls from '../../compnents/_basic/helpers/AddItemControls';
import ItemsList from '../../compnents/_basic/helpers/ItemsList';
import TasksForm from '../../compnents/tasks/TasksForm';
import { getTasks } from '../../compnents/tasks/api';
import { OptionType, TaskProps } from '../../compnents/tasks/types';
import { getUsers } from '../../compnents/users/api';

const Tasks = () => {
  const userID = window.localStorage.getItem('userID');

  const [isAdmin, setIsAdmin] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);
  const [search, setSearch] = useState<string>('');
  const [filteredTasks, setFilteredTasks] = useState<TaskProps[]>([]);
  const [users, setUsers] = useState<OptionType[]>([]); // TODO: type this

  useEffect(() => {
    if (!userID) return;

    const userRole = window.localStorage.getItem('userRole');
    if (userRole !== 'ADMIN') {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }

    const getData = async () => {
      const fetchedTasks = await getTasks(userID);
      setTasks(fetchedTasks?.data.tasks);
      const fetchedUsers = await getUsers();
      const mappedUsers = fetchedUsers.map((user: any) => ({
        label: user.username,
        value: user.id,
      }));
      setUsers(mappedUsers);
    };

    getData();
  }, []);

  useEffect(() => {
    if (search === '') {
      setFilteredTasks(tasks); // Reset filtered users to original list
      return;
    }
    const filteredTasks = tasks.filter((task) => {
      return task.name.toLowerCase().includes(search.toLowerCase());
    });

    setFilteredTasks(filteredTasks);
  }, [search, tasks, isActive]);

  const activeTasks = isActive
    ? filteredTasks.filter((task) => task.isActive)
    : filteredTasks;

  return (
    <div className="pt-8 pl-6 space-y-3">
      <AddItemControls
        setIsActive={setIsActive}
        isActive={isActive}
        setFormOpen={setFormOpen}
        setSelectedTask={setSelectedTask}
      />
      <div className="px-5 pt-2">
        <hr />
      </div>
      <div className="flex flex-row pt-4 space-x-5">
        <ItemsList
          items={activeTasks}
          setSelectedItem={setSelectedTask}
          setFormOpen={setFormOpen}
          setSearch={setSearch}
          itemName={'Tasks'}
        />
        <TasksForm
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectedTask={selectedTask}
          isAdmin={isAdmin}
          users={users}
        />
      </div>
    </div>
  );
};

export default Tasks;
