const Task = require("../model/task.model");

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
      user: req.user.id,
    });
    await newTask.save();
    res.status(201).json({ success: true, message: "Task created", task: newTask });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all tasks for the authenticated user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.tid);


    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ success: false, message: "Task not found or not authorized" });
    }

 
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.dueDate = req.body.dueDate || task.dueDate;

    // Save  updated task
    const updatedTask = await task.save();

    return res.status(200).json({ success: true, message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error updating task", error: error.message });
  }
};


// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.tid);
    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    await Task.findByIdAndDelete(req.params.tid);
    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
