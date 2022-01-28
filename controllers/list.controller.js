const List = require("../models/lists");
const House = require("../models/houses");
var ObjectId = require("mongoose").Types.ObjectId;

module.exports = class ListController {
    // fetch all lists
    static async fetchAllLists(req, res) {
        try {
            const list = await List.find().populate("house").populate("owners");
            res.status(200).json(list);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async fetchListsOfHouse(req, res) {
        try {
            const list = await List.find().populate({
                path: "house",
                match: {
                    _id: req.params.id,
                },
            });
            res.status(200).json(list);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async fetchListsOfUsers(req, res) {
        try {
            const list = await List.find().populate({
                path: "house",
                match: {
                    user: req.userData.userId,
                },
            });
            res.status(200).json(list);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    static async fetchListById(req, res) {
        if (ObjectId.isValid(req.params.id)) {
            const list = await List.findById(req.params.id).populate("house");

            if (list != null) {
                res.status(201).json({ message: "Fetched sucessfully", object: list });
            } else {
                res.status(404).send({ message: "Not found" });
            }
        } else {
            res.status(400).json({ message: "No valid id" });
        }
    }

    static async createList(req, res) {
        const list = await new List(req.body);
        list.user = req.userData.userId;

        const house = await House.findById(req.params.id);
        if (house === null) {
            res.status(400).json("House doesn't exist.");
        }

        list.house = req.params.id;

        try {
            list.save().then((createdList) => {
                res
                    .status(201)
                    .json({ message: "Created successfully", result: createdList });
            });
        } catch (err) {
            res.status(400).json({ message: "Something went wrong", object: list });
        }
    }
};