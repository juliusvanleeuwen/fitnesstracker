const express = require("express");
const router = express.Router();
const HouseController = require("../controllers/house.controller");
const checkAuth = require("../middleware/check-auth");

//Crud controller
const crudController = require("../controllers/crud.controller");
const House = require("../models/meals");
const houseCrud = new crudController(House);

router.get("/", HouseController.fetchAllHouses);
router.get("/:id", HouseController.fetchHouseById);
router.post("/", checkAuth, HouseController.createHouse);
router.post("/add-user/:id", checkAuth, HouseController.addUserToHouse);
router.post(
  "/add-email/:houseId",
  checkAuth,
  HouseController.addUserToHouseWithEmail
);
router.put("/:id", checkAuth, houseCrud.update);
router.delete("/:id", checkAuth, houseCrud.delete);

module.exports = router;
