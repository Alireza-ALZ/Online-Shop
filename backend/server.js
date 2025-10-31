const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mainRouter = require("./src/app.routes");
const NotFoundHandler = require("./src/common/exception/not-found.handler");
const AllExceptionHandler = require("./src/common/exception/all-exception.handler");

async function main() {
  const app = express();
  const frontendPath = path.join(__dirname, "../frontend");

  dotenv.config();

  require("./src/config/mongodb.config");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(express.static(frontendPath));

  app.use(mainRouter);

  NotFoundHandler(app);
  AllExceptionHandler(app);

  app.listen(process.env.PORT, () => {
    console.log(`Server is online : http://localhost:${process.env.PORT}`);
  });
}

main();
