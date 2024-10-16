import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    dueDate: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch(
          "https://digital-login-backend.onrender.com/api/tasks",
          {
            method: "GET",
            credentials: "include",
          }
        );
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

  // Function to handle task delete
  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(
        `https://digital-login-backend.onrender.com/api/tasks/${taskId}`,
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

  // Function to handle task editing
  const handleEdit = (task) => {
    setEditingTask(task._id);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      dueDate: new Date(task.dueDate).toISOString().substr(0, 10),
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://digital-login-backend.onrender.com/api/tasks/${editingTask}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.success) {
        setTasks(
          tasks.map((task) => (task._id === editingTask ? data.task : task))
        );
        setEditingTask(null);
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">
        Your Tasks
      </h1>

      {/* Form for editing a task */}
      {editingTask && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-lg max-w-lg mx-auto">
          <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 w-full"
            >
              Update Task
            </button>
          </form>
        </div>
      )}

      {/* Task List */}
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
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(task)}
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
            <div className="flex gap-2 mt-5">
              <p>Go to create task page</p>
              <Link to="/createtask">
                <span className="text-blue-700">Create Task</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
