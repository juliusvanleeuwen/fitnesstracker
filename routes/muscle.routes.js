const express = require("express");
const router = express.Router();
const MuscleController = require("../controllers/muscle.controller");
const checkAuth = require("../middleware/check-auth");

//Crud controller
const crudController = require("../controllers/crud.controller");
const Muscle = require("../models/muscles");
const muscleCrud = new crudController(Muscle);

router.get("/", checkAuth, MuscleController.getAll);
router.get("/common", checkAuth, MuscleController.getCommon);
router.get("/:id", MuscleController.getAll);
router.post("/", checkAuth, MuscleController.create);
router.post("/common", checkAuth, MuscleController.createCommon);
router.put("/:id", checkAuth, muscleCrud.update);
router.delete("/:id", checkAuth, muscleCrud.delete);

module.exports = router;
