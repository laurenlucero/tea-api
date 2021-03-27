//import tea model
const Tea = require("../models/tea");

//GET '/tea'
const getAllTea = (req, res, next) => {
  res.json({ message: "GET all tea" });
};

//POST tea
const newTea = (req, res) => {
  //check if the tea name already exists in db
  Tea.findOne({ name: req.body.name }, (data) => {
    //if tea not in db, add it
    if (data === null) {
      //create a new tea object using the Tea model and req.body
      const newTea = new Tea({
        name: req.body.name,
        image: req.body.image, // placeholder for now
        description: req.body.description,
        keywords: req.body.keywords,
        origin: req.body.origin,
        brew_time: req.body.brew_time,
        temperature: req.body.temperature,
      });

      // save this object to database
      newTea.save((err, data) => {
        if (err) return res.json({ Error: err });
        return res.json(data);
      });
      //if tea is in db, return a message to inform it exists
    } else {
      return res.json({ message: "Tea already exists" });
    }
  });
};

//DELETE '/tea'
const deleteAllTea = (req, res, next) => {
  res.json({ message: "DELETE all tea" });
};

//GET '/tea/:name'
const getOneTea = (req, res, next) => {
  res.json({ message: "GET 1 tea" });
};

//POST '/tea/:name'
const newComment = (req, res, next) => {
  res.json({ message: "POST 1 tea comment" });
};

//DELETE '/tea/:name'
const deleteOneTea = (req, res, next) => {
  res.json({ message: "DELETE 1 tea" });
};

//export controller functions
module.exports = {
  getAllTea,
  newTea,
  deleteAllTea,
  getOneTea,
  newComment,
  deleteOneTea,
};
