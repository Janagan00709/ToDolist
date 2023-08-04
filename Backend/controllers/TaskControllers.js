/** @format */

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
});

const TaskModel = mongoose.model("Task", taskSchema);

module.exports.getTasks = async (req, res) => {
  const tasks = await TaskModel.find();
  res.send(tasks);
};

module.exports.saveTask = (req, res) => {
  const { task } = req.body;

  TaskModel.create({ task })
    .then((data) => {
      console.log("Saved Successfully!");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "unable to create the list!" });
    });
};

module.exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  TaskModel.findByIdAndUpdate(id, { task })
    .then(() => res.send("Updated successfully...!"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Unable to update the list!" });
    });
};

module.exports.deleteTask = (req, res) => {
  const { id } = req.params;

  TaskModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted successfully..."))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Unable to delete the list!" });
    });
};
