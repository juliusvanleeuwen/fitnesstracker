const Join = require("../models/joins");
const Party = require("../models/parties");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = class ListController {
  // fetch all lists
  static async joinParty(req, res) {
    if (ObjectId.isValid(req.params.id)) {
      const party = await Party.findById(req.params.id);

      if(!party.open){
        res.status(400).json('Party is closed!')
      }

      const join = new Join(req.body);
      join.party = req.params.id;
      await join.save();
      res.status(200).json({message: "Joined successfully", result: join})

    } else {
      res.status(400).json({message: "Invalid ID"});
    }
  }

  static async FetchJoinsForParty(req, res) {
    if (ObjectId.isValid(req.params.id)) {
      const people = await Join.find({party: req.params.id})
      res.status(200).json(people)

    } else {
      res.status(400).json({message: "Invalid ID"});
    }
  }

  static async deleteUser(req, res) {
    if (ObjectId.isValid(req.params.id)) {
      const result = await Join.findByIdAndDelete({_id: req.params.id})
      res.status(200).json('Deleted')
    } else {
      res.status(400).json({message: "Invalid ID"});
    }
  }
};
