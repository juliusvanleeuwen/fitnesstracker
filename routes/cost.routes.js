const express = require("express");
const router = express.Router();
const CostController = require("../controllers/cost.controller");
const checkAuth = require("../middleware/check-auth");

//Crud controller
const crudController = require("../controllers/crud.controller");
const Cost = require("../models/costs");
const crud = new crudController(Cost);

router.post("/:partyId", checkAuth, CostController.createCost);
router.get("/all/:partyId", checkAuth, CostController.fetchCostsForParty);
router.get("/all", checkAuth, crud.getAll);
router.get("/:partyId/totalprice", checkAuth, CostController.getTotalCosts);
router.delete("/:id", checkAuth, crud.delete);
router.put("/:id", checkAuth, crud.update);

module.exports = router;
