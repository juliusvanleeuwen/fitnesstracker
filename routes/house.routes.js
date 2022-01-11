const express = require("express");
const router = express.Router();
const HouseController = require("../controllers/house.controller");
const checkAuth = require("../middleware/check-auth");

//Crud controller
const crudController = require("../controllers/crud.controller");
const House = require("../models/houses");
const houseCrud = new crudController(House);

router.get("/", checkAuth, HouseController.fetchAllHouses);
router.get("/mine", checkAuth, HouseController.fetchAllUserHouses);
router.get("/mine/:selectedHouse", checkAuth, HouseController.fetchAllUserHousesExceptSelected);
router.get("/:id", checkAuth, HouseController.fetchHouseById);
router.post("/", checkAuth, HouseController.createHouse);
router.put("/:id", checkAuth, houseCrud.update);
router.delete("/:id", checkAuth, houseCrud.delete);

module.exports = router;
