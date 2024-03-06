// const { send_slack_notification } = require("./slack_notifications");
// const { inspect } = require("util");
// const { AxiosError } = require("axios");

// const handleResponse = (res, data) => res.json(data);
// const handleError = (res, err) => {
//   // Format Axios error
//   console.log("Error=>", err);
//   if (err instanceof AxiosError) {
//     const { code, response } = err;

//     const error_message = {
//       code: code,
//       data: response.config.data,
//       message: JSON.stringify(response.data),
//     };

//     // this is an axios error

//     send_slack_notification({
//       channel: "#airwallex-dev-errors",
//       text: error_message,
//     });
//   } else {
//     send_slack_notification({
//       channel: "#airwallex-dev-errors",
//       text: inspect(err, {
//         depth: 5,
//       }),
//     });
//   }

//   return res.status(500).send({
//     error: err.message,
//     data: null,
//     code: 500,
//   });
// };

// function routes_response_handler(route_fn) {
//   return function (req, res) {
//     route_fn(req, res)
//       .then((data) => handleResponse(res, data))
//       .catch((err) => handleError(res, err));
//   };
// }

// module.exports = {
//   routes_response_handler,
// };

// responseHandler.js

// responseHandler.js

const sendJsonResponse = (res, success, data, message, statusCode) => {
  res.status(statusCode).json({ success, data, message });
};

const responseHandler = (req, res, next) => {
  // Create a new response object with response methods
  const response = {
    send: function (body) {
      if (typeof body === "object") {
        return sendJsonResponse(
          res,
          true,
          body,
          "Success",
          res.statusCode || 200
        );
      } else {
        res.send(body);
      }
    },
    json: function (body) {
      return sendJsonResponse(
        res,
        true,
        body,
        "Success",
        res.statusCode || 200
      );
    },
    error: function (error, statusCode = 500) {
      return sendJsonResponse(
        res,
        false,
        null,
        error.message || "Internal Server Error",
        statusCode
      );
    },
  };

  // Attach the response object to the res object
  res.response = response;

  // Wrap the 'end' method to ensure the socket connection is closed after a response is sent
  const originalEnd = res.end;
  res.end = function (chunk, encoding) {
    res.end = originalEnd;
    if (chunk) {
      res.write(chunk, encoding);
    }
    res.end();
  };

  // Try-catch block to handle errors in route handlers
  try {
    next();
  } catch (error) {
    response.error(error);
  }
};

const errorHandler = (err, req, res, next) => {
  console.log("Middleware Error Hadnling", err);
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
    data: null,
  });
};

module.exports = { responseHandler, errorHandler };
