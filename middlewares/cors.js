const allowedCors = [
  'http://localhost:3001',
  'http://localhost:3000',
  'http://api.movies.supercyanide.nomoredomains.rocks',
  'https://api.movies.supercyanide.nomoredomains.rocks',
  'http://movies.supercyanide.nomoreparties.sbs',
  'https://movies.supercyanide.nomoreparties.sbs',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
