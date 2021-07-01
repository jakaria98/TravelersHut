module.exports = {
  serverError(res, error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error Occurred",
    });
  },
  everythingOk(res, message) {
    res.status(200).json(message);
  },
  createdSuccessfully(res) {
    res.status(201).json({
      message: "created successfully",
    });
  },
  accepted(res) {
    res.status(202).json({
      message: "accepted",
    });
  },
  badRequest(res, message) {
    res.status(400).json({
      message,
    });
  },
  notFound(res, message) {
    res.status(404).json({
      message,
    });
  },
};
