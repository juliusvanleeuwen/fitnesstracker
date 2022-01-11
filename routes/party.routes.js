const express = require("express");
const router = express.Router();
const PartyController = require("../controllers/party.controller");
const checkAuth = require("../middleware/check-auth");

//Crud controller
const crudController = require("../controllers/crud.controller");
const Party = require("../models/parties");
const partyCrud = new crudController(Party);

// router.post("/:listId", checkAuth, PartyController.createTask);

//Get all parties of the house
router.get("/:id", checkAuth, PartyController.fetchPartiesOfHouse);
router.get("/one/:id", checkAuth, partyCrud.getOne);
router.put("/:id", checkAuth, partyCrud.update);
router.post("/:id", checkAuth, PartyController.createParty);
router.post("/status/:id", checkAuth, PartyController.changePartyStatus);
// router.get("/:id", checkAuth, PartyController.fetchTaskById);
// router.get("/list/:id", checkAuth, PartyController.fetchTaskForList);
router.delete("/:id", checkAuth, partyCrud.delete);

module.exports = router;