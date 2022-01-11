const express = require("express");
const router = express.Router();
const JoinController = require("../controllers/join.controller");

router.post("/party/:id", JoinController.joinParty);
router.get("/party/:id", JoinController.FetchJoinsForParty);
router.delete("/party/:id", JoinController.deleteUser);

module.exports = router;
