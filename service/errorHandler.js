const headers = require('../service/headers');

const errorHandler = (res, error) => {
  res.writeHead(400, headers);
  res.write(
    JSON.stringify({
      status: 'false',
      message: error,
    })
  );
  res.end();
}

module.exports = errorHandler;