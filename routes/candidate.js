'use strict';


const controller = require(rootDir + "/controllers/candidate");
const app = require("express");
const router = app.Router()


router.post("/", controller.newCandidate);
router.get("/", controller.getAllCandidates);
router.get("/:id", controller.getCandidateById);
router.put("/:id", controller.updateCandidateDetailById);


module.exports = router;