const express = require("express");
const router = express.Router();
const MuscleController = require("../controllers/muscle.controller");
const checkAuth = require("../middleware/check-auth");

//Crud controller
const crudController = require("../controllers/crud.controller");
const Muscle = require("../models/muscles");
const muscleCrud = new crudController(Muscle);

router.get("/", MuscleController.getAll);
router.get("/mine", checkAuth, MuscleController.getById);
router.get("/:id", MuscleController.getAll);
router.post("/", checkAuth, MuscleController.create);
router.put("/:id", checkAuth, muscleCrud.update);
router.delete("/:id", checkAuth, muscleCrud.delete);

module.exports = router;
