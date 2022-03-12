const Set = require("../models/sets");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = class SetController {
  static async getAll(req, res) {
    try {
      const sets = await Set.find().find({ $and: [ { $and: [{user: req.userData.userId },{exercise: req.params.exerciseId}] } ] })
      .populate({
        path : 'exercise'
      });

      res.status(200).json(sets);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async getById(req, res) {
    if (ObjectId.isValid(req.params.id)) {
      const set = await Set.findOne({ _id: req.params.id }).populate({
        path : 'exercise'
      });

      if (set != null) {
        res.status(201).json(set);
      } else {
        res.status(404).send({ message: "Not found" });
      }
    } else {
      res.status(400).json({ message: "No valid id" });
    }
  }

  static async create(req, res) {
    const set = new Set(req.body);
    set.user = req.userData.userId;
    set.exercise = req.params.exerciseId;

    try {
      set.save().then((createdSet) => {
        res
          .status(201)
          .json({ message: "Created successfully", result: createdSet });
      });
    } catch (err) {
      res.status(400).json({ message: "Something went wrong", object: set });
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
