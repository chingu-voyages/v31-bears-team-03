module.exports.isUserAuthenticated = (req, res, next) => {
    if (req.user) {
      console.log('req.user', req.user)
      next();
    } else {
      res.status(401).send('You must login first!');
    }
  };
  