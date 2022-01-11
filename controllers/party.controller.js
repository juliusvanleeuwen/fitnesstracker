const Party = require('../models/parties')
const House = require('../models/houses')
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = class TaskController {
    // fetch all Tasks
    static async fetchPartiesOfHouse(req, res) {
        if (ObjectId.isValid(req.params.id)) {
            const parties = await Party.find({ house: req.params.id });
      
            if (parties != null) {
              res.status(201).json(parties);
            } else {
              res.status(404).send({ message: "Not found" });
            }
          } else {
            res.status(400).json({ message: "No valid id" });
          }
    }

    static async createParty(req, res) {
      const party = await new Party(req.body);
      party.user = req.userData.userId;
      party.house = req.params.id;
      party.open = true
  
      const house = await House.findById(req.params.id);
      if (house === null) {
        return res.status(400).json("House doesn't exist.");
      }
    
      try {
        party.save().then((createdParty) => {
          return res.status(201).json({ message: "Created successfully", result: createdParty });
        });
      } catch (err) {
        return res.status(400).json({ message: "Something went wrong", object: err });
      }
    }

    static async changePartyStatus(req, res) {
      const party = await Party.findById(req.params.id);

      if(party.open){
        party.open = false;
        party.save();
        res.status(200).json('Status changed to closed.')
      } else {
        party.open = true;
        party.save();
        res.status(200).json('Status changed to opened.')
      }
    }

}