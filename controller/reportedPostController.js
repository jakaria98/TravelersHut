const ReportedPost = require("../model/ReportedPost");
const { everythingOk, serverError, notFound } = require("../utils/error");

const router = require("express").Router();

module.exports = {
  deleteReport(req, res) {
    let { reportID } = req.params;
    ReportedPost.findByIdAndDelete(reportID)
      .then((report) => {
        if (report) {
          return everythingOk(res, report);
        } else {
          return notFound(res, "nothing found");
        }
      })
      .catch((error) => serverError(res, error));
  },
  getAllReport(req, res) {
    ReportedPost.find()
      .then((reports) => everythingOk(res, reports))
      .catch((error) => serverError(res, error));
  },
  getSingleReport(req, res) {
    let { reportID } = req.params;
    ReportedPost.findById(reportID)
      .then((report) => {
        if (report) {
          return everythingOk(res, report);
        } else {
          return notFound(res, "No Such Report");
        }
      })
      .catch((error) => serverError(res, error));
  },
};
