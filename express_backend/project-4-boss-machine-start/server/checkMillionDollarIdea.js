const checkMillionDollarIdea = (req, res, next) => {
  const ideaValue = req.idea.numWeeks * req.idea.weeklyRevenue;
  if (ideaValue >= 1000000) {
    res.status(200).send();
    next();
  } else {
    res.status(400).send();
    next();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
