import { useEffect, useState } from 'react';

import AddItemControls from '../../compnents/_basic/helpers/AddItemControls';
import ItemsList from '../../compnents/_basic/helpers/ItemsList';
import { getTasks } from '../../compnents/tasks/api';
import { TaskProps } from '../../compnents/tasks/types';

const Tasks = () => {
  const userID = window.localStorage.getItem('userID');

  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);
  const [search, setSearch] = useState<string>('');
  const [filteredTasks, setFilteredTasks] = useState<TaskProps[]>([]);

  console.log('tasks', tasks);
  useEffect(() => {
    if (!userID) return;

    const getData = async () => {
      const fetchedTasks = await getTasks(userID);
      return fetchedTasks;
    };

    (async () => {
      const fetchedTasks = (await getData()) as any;
      setTasks(fetchedTasks.data.tasks);
    })();
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
        />
      </div>
    </div>
  );
};

export default Tasks;
