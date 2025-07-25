const validateUser = (req, res, next) => {
  try {

    next();
  } catch (error) {}
};

module.exports = {
    validateUser
};
