const House = require("../models/houses");
const User = require("../models/users");
require("../models/users");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = class HouseController {
  // fetch all Houses
  static async fetchAllHouses(req, res) {
    try {
      const house = await House.find().populate("owners");

      res.status(200).json(house);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async fetchAllUserHouses(req, res) {
    try {
      const house = await House.find().find({owners: req.userData.userId});

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
    house.creator = req.userData.userId;
    house.owners.push(req.userData.userId);

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

  static async addUserToHouse(req, res) {
    if(!ObjectId.isValid(req.params.id)) {
      await res.status(404).json("not a valid house Id")
    }
    const house = await House.findOne({ _id: req.params.id })

      if(house.creator == req.userData.userId) {
        House.updateOne(
          { _id: req.params.id },
          { $addToSet: { owners: req.body.user } }
       ).then(result => {
         res.status(200).json({ house });
       })
      } else {
        await res.status(401).json("not yours.")
      }
  }

  static async addUserToHouseWithEmail(req, res) {
    if(!ObjectId.isValid(req.params.houseId)) {
      await res.status(404).json("not a valid house Id")
    }
    const house = await House.findOne({ _id: req.params.houseId })
    const user = await User.findOne({email: req.body.email})

      if(house.creator == req.userData.userId) {
        House.updateOne(
          { _id: req.params.houseId },
          { $addToSet: { owners: user._id } }
       ).then(result => {
         res.status(200).json({ house });
       })
      } else {
        await res.status(401).json("not yours.")
      }
  }
};