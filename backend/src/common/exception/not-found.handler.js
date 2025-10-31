function NotFoundHandler(app) {
  app.use((req, res) => {
    res.status(404).json({
      message: "Not found fucking route !!!",
    });
  });
}

module.exports = NotFoundHandler;
