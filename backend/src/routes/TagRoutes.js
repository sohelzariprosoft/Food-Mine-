const express = require("express");
const routeErrorWraper = require('../utils/errors/WrapAllRoutes')
const router = express.Router();
const tagController = require("../controllers/TagController");

router.get("/", tagController.getTags);
router.post("/addtag", tagController.addTag);
router.delete("/:id", tagController.deleteTag)

routeErrorWraper(router)
module.exports = router;