"use client";
import { SyntheticEvent, useState } from "react";
import SingleForm from "./components/SingleForm";

export default function Home() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (e) => {
    e.preventDefault();
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: Math.floor(Math.random() * Date.now()),
        name: newTask,
        completed: false,
      },
    ]);
    setNewTask("");
  };

  function handleCompleteTask(id) {
    const updateTask = tasks.map((task) => {
      if (id === task.id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTasks(updateTask);
  }

  function handleRemoveTask(id) {
    const removeTask = tasks.filter((task) => task.id !== id);
    setTasks(removeTask);
  }
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <SingleForm value={newTask} change={setNewTask} btn={handleAddTask} />
          {tasks.length > 0 ? (
            <ol className="space-y-2 mt-4">
              {tasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between">
                  <span className="text-black">
                    {task.name} {task.completed ? "✅" : "❌"}
                  </span>
                  <div className="flex items-center gap-x-2">
                    <button
                      onClick={(e) => handleCompleteTask(task.id)}
                      className="px-2 py-1 border text-xs text-black"
                    >
                      Mark as {task.completed ? "incomplete" : "complete"}
                    </button>
                    <button
                      onClick={(e) => handleRemoveTask(task.id)}
                      className="px-2 py-2 border text-xs text-black"
                    >
                      remove
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </div>
    </>
  );
}
