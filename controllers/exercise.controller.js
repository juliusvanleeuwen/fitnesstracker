const Exercise = require("../models/exercises");
const Muscle = require("../models/muscles");
const Workout = require("../models/workouts");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = class Exerciseontroller {
  static async getAll(req, res) {
    try {
      const exercises = await Exercise.find().find({ user: req.userData.userId || null })

      res.status(200).json(exercises);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async fillSelectOption(req, res) {
    try {
      const exercises = await Exercise.find().find({ user: req.userData.userId || null });

      res.status(200).json(exercises);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async getById(req, res) {
    if (ObjectId.isValid(req.params.id)) {
      const house = await House.findOne({ _id: req.params.id }).populate(
        "owners"
      );

      if (House != null) {
        res.status(201).json(house);
      } else {
        res.status(404).send({ message: "Not found" });
      }
    } else {
      res.status(400).json({ message: "No valid id" });
    }
  }

  static async create(req, res) {
    const exercise = new Exercise(req.body);
    exercise.user = req.userData.userId;

    try {
      exercise.save().then((createdExercise) => {
        res
          .status(201)
          .json({ message: "Created successfully", result: createdExercise });
      });
    } catch (err) {
      res.status(400).json({ message: "Something went wrong", object: House });
    }
  }

  static async createCommon(req, res) {
    const exercise = new Exercise(req.body);

    try {
      exercise.save().then((createdExercise) => {
        res
          .status(201)
          .json({ message: "Created successfully", result: createdExercise });
      });
    } catch (err) {
      res.status(400).json({ message: "Something went wrong", object: House });
    }
  }

  static async createExercise(req, res) {
    const exercise = await new Exercise(req.body);
    const workout = await Workout.findById(req.params.workoutId);

    workout.exercises.push(exercise._id);
    workout.save();
    exercise.user = req.userData.userId;

    console.log(exercise._id)

    try {
      exercise.save().then((createdExercise) => {
        res
          .status(201)
          .json({ message: "Created successfully", result: createdExercise });
      });
    } catch (err) {
      res.status(400).json({ message: "Something went wrong", object: House });
    }
  }

  static async addMuscle(req, res) {
    const exercise = await Exercise.findById(req.params.exerciseId)
    const muscle = await Muscle.findById(req.params.muscleId)

    if(exercise === null && muscle === null) {
      return;
    }

    exercise.muscles.push(req.params.muscleId)

    try {
      exercise.save().then((createdExercise) => {
        res
          .status(201)
          .json({ message: "Created successfully", result: createdExercise });
      });
    } catch (err) {
      res.status(400).json({ message: "Something went wrong", object: House });
    }
  }
};
