function AllExceptionHandler(app) {
  app.use((err, req, res, next) => {
    console.error("❌ Error:", err);

    if (typeof err === "string") {
      return res.status(400).json({ message: err });
    }

    res.status(err.status || 500).json({
      message: err.message || "خطای سرور رخ داده است ❌",
    });
  });
}

module.exports = AllExceptionHandler;
