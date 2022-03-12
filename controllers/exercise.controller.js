const Exercise = require("../models/exercises");
const Workout = require("../models/workouts");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = class ListController {
  static async getAll(req, res) {
    try {
      const house = await House.find().find({ owners: req.userData.userId });

      res.status(200).json(house);
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
    if (req.params.id !== null) {
      const workout = await Exercise.findById(req.params.id);
      if (workout == null) return;
      exercise.workouts.push(req.params.id);
    }

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
