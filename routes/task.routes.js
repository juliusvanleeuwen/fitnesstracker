const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/task.controller");
const checkAuth = require("../middleware/check-auth");

//Crud controller
const crudController = require("../controllers/crud.controller");
const Task = require("../models/tasks");
const taskCrud = new crudController(Task);

router.post("/:listId", checkAuth, TaskController.createTask);
router.get("/", checkAuth, TaskController.fetchAllTasks);
router.put("/:id", checkAuth, taskCrud.update);
router.get("/:id", checkAuth, TaskController.fetchTaskById);
router.get("/list/:id", checkAuth, TaskController.fetchTaskForList);
router.delete("/:id", checkAuth, taskCrud.delete);

module.exports = router;
