const Workout = require("../models/workouts");
const Exercise = require("../models/exercises");
const Muscle = require("../models/muscles");
const User = require("../models/users");
require("../models/users");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = class WorkoutController {
  static async getAll(req, res) {
    try {
      const workout = await Workout.find().find({
        user: req.userData.userId,
      }).populate({
        path : 'exercises'
      }).populate('muscles');

      res.status(200).json(workout);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async getById(req, res) {
    if (ObjectId.isValid(req.params.id)) {
      const workout = await Workout.findOne({ _id: req.params.id })
      .populate({
        path : 'exercises'
      });;

      if (workout != null) {
        res.status(201).json(workout);
      } else {
        res.status(404).send({ message: "Not found" });
      }
    } else {
      res.status(400).json({ message: "No valid id" });
    }
  }

  static async create(req, res) {
    const workout = new Workout(req.body);
    workout.user = req.userData.userId;

    if(workout.date === null) {
      workout.date = Date.now();
    }

    try {
      workout.save().then((createdWorkout) => {
        res
          .status(201)
          .json({ message: "Created successfully", result: createdWorkout });
      });
    } catch (err) {
      res.status(400).json({ message: "Something went wrong", object: workout });
    }
  }

  static async addExercise(req, res) {
    const workout = await Workout.findById(req.params.workoutId)

    if(workout === null) {
      return;
    }

    workout.exercises.push(req.params.exerciseId);

    try {
      workout.save().then((savedWorkout) => {
        res
          .status(201)
          .json({ message: "Created successfully", result: savedWorkout });
      });
    } catch (err) {
      res.status(400).json({ message: "Something went wrong", object: House });
    }
  }

  static async addMuscle(req, res) {
    const workout = await Workout.findById(req.params.workoutId)
    const muscle = await Muscle.findById(req.params.muscleId)

    if(workout === null && muscle === null) {
      return;
    }

    workout.muscles.push(req.params.muscleId);

    try {
      workout.save().then((savedWorkout) => {
        res
          .status(201)
          .json({ message: "Created successfully", result: savedWorkout });
      });
    } catch (err) {
      res.status(400).json({ message: "Something went wrong", object: workout });
    }
  }

  static async removeMuscle(req, res) {
    const workout = await Workout.findById(req.params.workoutId)
    const muscle = await Muscle.findById(req.params.muscleId)

    if(workout === null && muscle === null) {
      return;
    }

    workout.muscles.pull(req.params.muscleId);

    try {
      workout.save().then((savedWorkout) => {
        res
          .status(201)
          .json({ message: "Created successfully", result: savedWorkout });
      });
    } catch (err) {
      res.status(400).json({ message: "Something went wrong", object: House });
    }
  }

  static async removeExercise(req, res) {
    const workout = await Workout.findById(req.params.workoutId)
    const exercise = await Exercise.findById(req.params.exerciseId)

    if(workout === null && exercise === null) {
      return;
    }

    workout.exercises.pull(req.params.exerciseId)

    try {
      workout.save().then((savedWorkout) => {
        res
          .status(201)
          .json({ message: "Created successfully", result: savedWorkout });
      });
    } catch (err) {
      res.status(400).json({ message: "Something went wrong", object: House });
    }
  }
};
