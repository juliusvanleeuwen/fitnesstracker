const express = require("express");
const router = express.Router();
const SetController = require("../controllers/set.controller");
const checkAuth = require("../middleware/check-auth");

//Crud controller
const crudController = require("../controllers/crud.controller");
const Set = require("../models/sets");
const setCrud = new crudController(Set);

router.get("/:exerciseId", checkAuth, SetController.getAll);
router.get("/find/:id", SetController.getById);
router.post("/addSet/:exerciseId", checkAuth, SetController.create);
router.put("/:id", checkAuth, setCrud.update);
router.delete("/:id", checkAuth, setCrud.delete);

module.exports = router;