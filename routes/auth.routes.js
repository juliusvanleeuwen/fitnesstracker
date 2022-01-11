const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const checkAuth = require("../middleware/check-auth");

//Crud controller
const crudController = require("../controllers/crud.controller");
const User = require("../models/users");
const userCrud = new crudController(User);

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.put("/:id", checkAuth, userCrud.update);
router.delete("/:id", checkAuth, userCrud.delete);
router.get("/", checkAuth, AuthController.fetchCurrentUser);
router.get("/find/:id", checkAuth, AuthController.fetchUserById);
router.get("/all", AuthController.fetchAllUsers);

module.exports = router;
