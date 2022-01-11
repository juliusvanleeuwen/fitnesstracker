const express = require("express");
const router = express.Router();
const ListController = require("../controllers/list.controller");
const checkAuth = require("../middleware/check-auth");

//Crud controller
const crudController = require("../controllers/crud.controller");
const List = require("../models/lists");
const listCrud = new crudController(List);

router.get("/", checkAuth, ListController.fetchAllLists);
router.get("/mine", checkAuth, ListController.fetchListsOfUsers);
router.get("/:id", checkAuth, ListController.fetchListById);
router.get("/house/:id", checkAuth, ListController.fetchListsOfHouse);
router.post("/:id", checkAuth, ListController.createList);
router.put("/:id", checkAuth, listCrud.update);
router.delete("/:id", checkAuth, listCrud.delete);

module.exports = router;
