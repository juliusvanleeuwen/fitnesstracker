const House = require("../models/houses");
require("../models/users");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = class HouseController {
  // fetch all Houses
  static async fetchAllHouses(req, res) {
    try {
      const house = await House.find().populate("user");

      res.status(200).json(house);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async fetchAllUserHouses(req, res) {
    try {
      const house = await House.find().populate("user").find({user: req.userData.userId});

      res.status(200).json(house);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async fetchAllUserHousesExceptSelected(req, res) {
    try {
      const house = await House.find().populate("user").find({user: req.userData.userId, _id: {$ne: req.params.selectedHouse}});

      res.status(200).json(house);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async fetchHouseById(req, res) {
    if (ObjectId.isValid(req.params.id)) {
      const house = await House.findOne({ _id: req.params.id }).populate(
        "user"
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

  static async createHouse(req, res) {
    const house = new House(req.body);
    house.user.push(req.userData.userId);

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
