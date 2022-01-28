const Cost = require("../models/costs");
const Party = require("../models/parties");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = class CostController {
    // fetch all Costs
    static async fetchAllCosts(req, res) {
        try {
            const task = await Cost.find();
            res.status(200).json(task);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async getTotalCosts(req, res) {
        if (!ObjectId.isValid(req.params.partyId)) {
            res.status(404).json("No valid ID");
        }

        const totalCost = 5;

        res.status(200).json(totalCost[0].TotalSum)
    }

    static async fetchCostsForParty(req, res) {
        if (!ObjectId.isValid(req.params.partyId)) {
            res.status(404).json("No valid ID");
        }
        const costs = await Cost.find({ party: req.params.partyId }).populate("user");

        res.status(200).json({ costs });
    }

    static async createCost(req, res) {
        const cost = await new Cost(req.body);
        if (!ObjectId.isValid(req.params.partyId)) {
            return res.status(400).json('Invalid ID');
        }
        cost.party = req.params.partyId
        cost.user = req.userData.userId
        try {
            cost.save().then((newCost) => {
                res
                    .status(201)
                    .json({ message: "Created successfully", result: newCost });
            });
        } catch (err) {
            res.status(400).json({ message: "Something went wrong", object: Cost });
        }
    }

    static async fetchCostById(req, res) {
        if (ObjectId.isValid(req.params.id)) {
            const task = await Cost.findById(req.params.id);

            if (task != null) {
                res.status(201).json({ message: "Fetched sucessfully", object: task });
            } else {
                res.status(404).send({ message: "Not found" });
            }
        } else {
            res.status(400).json({ message: "No valid id" });
        }
    }

};