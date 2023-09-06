const checkMillionDollarIdea = (req, res, next) => {
  if (req.params && req.params.ideaId && isNaN(req.params.ideaId)) {
    res.status(404).send("ID must be an integer value");
  } else {
    const ideaValue =
      Number(req.body.numWeeks) * Number(req.body.weeklyRevenue);
    if (ideaValue >= 1000000) {
      next();
    } else {
      res.status(400).send();
    }
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
