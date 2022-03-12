const Muscle = require("../models/muscles");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = class TaskController {
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
};
