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
router.get("/workout/:workoutId", checkAuth, ExerciseController.getForWorkout);
router.post("/:workoutId", checkAuth, ExerciseController.createExercise);
router.post("/", checkAuth, ExerciseController.createCommon);
router.post("/:exerciseId/addMuscle/:muscleId", checkAuth, ExerciseController.addMuscle);
router.post("/:id", checkAuth, ExerciseController.create);
router.put("/:id", checkAuth, exerciseCrud.update);
router.delete("/:id", checkAuth, exerciseCrud.delete);

module.exports = router;
