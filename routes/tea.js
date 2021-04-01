const express = require("express"); //import express
// 1. create an express router object to set up our routes
const router = express.Router();
// 2. import our tea controller from our controllers/tea.js file
const teaController = require("../controllers/tea");
// 3. create our routes with the controller fn as the callback to handle the request
router.get("/tea", teaController.getAllTea);
router.post("/tea", teaController.uploadImg, teaController.newTea);
router.delete("/tea", teaController.deleteAllTea);

router.get("/tea/:name", teaController.getOneTea);
router.post("/tea/:name", teaController.newComment);
router.delete("/tea/:name", teaController.deleteOneTea);
// 4. export to use in server.js
module.exports = router;
