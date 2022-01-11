const Task = require("../models/tasks");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = class TaskController {
  // fetch all Tasks
  static async fetchAllTasks(req, res) {
    try {
      const task = await Task.find();
      res.status(200).json(task);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async fetchTaskForList(req, res) {
    if (ObjectId.isValid(req.params.id)) {
      const task = await Task.find({ list: req.params.id });

      if (Task != null) {
        res.status(201).json({ message: "Fetched sucessfully", object: task });
      } else {
        res.status(404).send({ message: "Not found" });
      }
    } else {
      res.status(400).json({ message: "No valid id" });
    }
  }

  static async fetchTaskById(req, res) {
    if (ObjectId.isValid(req.params.id)) {
      const task = await Task.findById(req.params.id);

      if (task != null) {
        res.status(201).json({ message: "Fetched sucessfully", object: task });
      } else {
        res.status(404).send({ message: "Not found" });
      }
    } else {
      res.status(400).json({ message: "No valid id" });
    }
  }

  static async createTask(req, res) {
    const task = await new Task({
      task: req.body.task,
      status: req.body.status,
      deadline: req.body.deadline,
      user: req.userData.userId,
      list: req.params.listId,
    });

    try {
      task.save().then((newTask) => {
        res
          .status(201)
          .json({ message: "Created successfully", result: newTask });
      });
    } catch (err) {
      res.status(400).json({ message: "Something went wrong", object: Task });
    }
  }
};