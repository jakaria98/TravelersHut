const ReportedPlace = require("../model/ReportedPlace");
const { serverError, everythingOk } = require("../utils/error");

module.exports = {
  getAllReport(req, res) {
    ReportedPlace.find()
      .then((reports) => everythingOk(res, reports))
      .catch((error) => serverError(res, error));
  },
  getSingleReport(req, res) {
    let { reportID } = req.params;
    ReportedPlace.findById(reportID)
      .then((report) => everythingOk(res, report))
      .catch((error) => serverError(res, error));
  },
  deleteReport(req, res) {
    let { reportID } = req.params;
    ReportedPlace.findByIdAndDelete(reportID)
      .then((report) => everythingOk(res, report))
      .catch((error) => serverError(res, error));
  },
};
