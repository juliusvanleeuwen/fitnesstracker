const Muscle = require("../models/muscles");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = class MuscleController {
  static async getAll(req, res) {
    try {
      const muscles = await Muscle.find().find({ user: req.userData.userId });

      res.status(200).json(muscles);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async getCommon(req, res) {
    try {
      const muscles = await Muscle.find().find({ user: null });

      res.status(200).json(muscles);
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
    const muscle = new Muscle(req.body);
    muscle.user = req.userData.userId;

    try {
      muscle.save().then((createdMuscle) => {
        res
          .status(201)
          .json({ message: "Created successfully", result: createdMuscle });
      });
    } catch (err) {
      res.status(400).json({ message: "Something went wrong", object: muscle });
    }
  }

  static async createCommon(req, res) {
    const muscle = new Muscle(req.body);
    muscle.user = null;

    try {
      muscle.save().then((createdMuscle) => {
        res
          .status(201)
          .json({ message: "Created successfully", result: createdMuscle });
      });
    } catch (err) {
      res.status(400).json({ message: "Something went wrong", object: muscle });
    }
  }
};
