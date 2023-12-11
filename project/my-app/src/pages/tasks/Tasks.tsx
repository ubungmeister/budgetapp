import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import AddItemControls from '../../compnents/_basic/library/controls/AddItemControls';
import ItemsList from '../../compnents/_basic/library/list/ItemsList';
import TasksForm from '../../compnents/tasks/TasksForm';
import { TaskProps } from '../../compnents/tasks/types';
import { useTasks, useUsers } from '../../hooks/UseQueries';

// Tasks page is used by Admin to Add and Edit Tasks, and Users to view their Tasks and submit them

const Tasks = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskProps | null>(null);
  const [search, setSearch] = useState<string>('');

  const location = useLocation();

  const { data: tasks } = useTasks();
  const { data: users } = useUsers();

  const queryClient = useQueryClient();

  useEffect(() => {
    const userRole = window.localStorage.getItem('userRole');
    if (userRole !== 'ADMIN') {
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
    }
    queryClient.invalidateQueries(['tasks']);
  }, [setFormOpen, formOpen, tasks]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get('taskId');

    if (taskId) {
      // Fetch the task details and open the form
      const selectedTask = tasks?.find((task: TaskProps) => task.id === taskId);
      setSelectedTask(selectedTask || null);
      setFormOpen(true);
    }
  }, [location]);

  const filteredTasks = tasks?.filter((task) => {
    return task.name.toLowerCase().includes(search.toLowerCase());
  });

  const activeTasks = isActive
    ? filteredTasks?.filter((task) => task.isActive)
    : filteredTasks;

  const optionsUsers = users?.map((user: any) => ({
    label: user.username,
    value: user.id,
  }));

  return (
    <div className="pt-8 pl-6 space-y-3">
      <AddItemControls
        setIsActive={setIsActive}
        isActive={isActive}
        setFormOpen={setFormOpen}
        setSelectedTask={setSelectedTask}
        isDisabled={isAdmin}
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
          isAdmin={isAdmin}
        />
        <TasksForm
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectedTask={selectedTask}
          isAdmin={isAdmin}
          users={optionsUsers || []}
        />
      </div>
    </div>
  );
};

export default Tasks;
