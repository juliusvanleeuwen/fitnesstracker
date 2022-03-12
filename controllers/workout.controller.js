const Workout = require("../models/workouts");
const User = require("../models/users");
require("../models/users");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = class WorkoutController {
  static async getAll(req, res) {
    try {
      const workout = await Workout.find().find({
        user: req.userData.userId,
      });

      res.status(200).json(workout);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async getById(req, res) {
    if (ObjectId.isValid(req.params.id)) {
      const workout = await Workout.findOne({ _id: req.params.id });

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
    const house = new House(req.body);
    house.user = req.userData.userId;

    try {
      house.save().then((createdHouse) => {
        res
          .status(201)
          .json({ message: "Created successfully", result: createdHouse });
      });
    } catch (err) {
      res.status(400).json({ message: "Something went wrong", object: House });
    }
  }
};
