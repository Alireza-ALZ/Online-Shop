const { default: mongoose } = require("mongoose");

mongoose
  .connect(`mongodb://localhost:${process.env.DB_URL}`)
  .then(() => {
    console.log("Connected to mongodb successfully");
  })
  .catch((error) => {
    if (error) console.log(error.message || "Fuck DB !");
  });
