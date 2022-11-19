let path = require("path");

// Error handle function
const ErrorHandler = (err, req, res, next) => {
  console.log("Middleware Error Handler");
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  //   res.status(errStatus).json({
  //     // success: false,
  //     // status: errStatus,
  //     // message: errMsg,

  //   });
  res.sendFile(path.join(__dirname + "./../views/error.html"));
};

module.exports = ErrorHandler;
