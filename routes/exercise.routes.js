const express = require("express");
const router = express.Router();
const ExerciseController = require("../controllers/exercise.controller");
const checkAuth = require("../middleware/check-auth");

//Crud controller
const crudController = require("../controllers/crud.controller");
const Exercise = require("../models/exercises");
const exerciseCrud = new crudController(Exercise);

router.get("/", checkAuth, ExerciseController.getAll);
router.get("/:id", checkAuth, ExerciseController.getById);
router.post("/", checkAuth, exerciseCrud.create);
router.post("/:id", checkAuth, ExerciseController.create);
router.put("/:id", checkAuth, exerciseCrud.update);
router.delete("/:id", checkAuth, exerciseCrud.delete);

module.exports = router;
