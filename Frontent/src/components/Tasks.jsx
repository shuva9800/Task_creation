import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:4000/api/tasks", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          setTasks(data.tasks);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    }
    fetchTasks();
  }, [navigate]);

  //delete task
  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/tasks/${taskId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Your Tasks</h1>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-white p-6 rounded-lg shadow-lg transition hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{task.description}</p>
              <p className="text-sm text-gray-500">Status: {task.status}</p>
              <p className="text-sm text-gray-500">
                Due Date: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => handleDelete(task._id)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
