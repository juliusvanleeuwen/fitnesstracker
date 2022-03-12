const express = require("express");
const router = express.Router();
const WorkoutController = require("../controllers/workout.controller");
const checkAuth = require("../middleware/check-auth");

//Crud controller
const crudController = require("../controllers/crud.controller");
const Workout = require("../models/workouts");
const workoutCrud = new crudController(Workout);

router.get("/", checkAuth, WorkoutController.getAll);
router.get("/:id", WorkoutController.getById);
router.post("/", checkAuth, WorkoutController.create);
router.post("/:workoutId/addExercise", checkAuth, WorkoutController.addExercise);
router.post("/:workoutId/removeExercise/:exerciseId", checkAuth, WorkoutController.removeExercise);
router.post("/:workoutId/addMuscle/:muscleId", checkAuth, WorkoutController.addMuscle);
router.post("/:workoutId/removeMuscle/:muscleId", checkAuth, WorkoutController.removeMuscle);
router.put("/:id", checkAuth, workoutCrud.update);
router.delete("/:id", checkAuth, workoutCrud.delete);

module.exports = router;
