const mainRouter = require("express").Router();

mainRouter.get("/", (req, res) => {
  res.json({ message: "Hello from backend" });
});

module.exports = mainRouter;
