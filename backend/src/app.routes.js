const mainRouter = require("express").Router();

mainRouter.get("/", (req, res) => {
  res.json({ message: "Hello from backend" });
});
mainRouter.get("/test", (req, res) => {
  res.json({ testMessage: "Backend Test" });
});

module.exports = mainRouter;
