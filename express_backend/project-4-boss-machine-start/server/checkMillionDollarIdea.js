const db = require("./db");

const checkMillionDollarIdea = (req, res, next) => {
  if (req.params && req.params.ideaId) {
    if (isNaN(req.params.ideaId)) {
      res.status(404).send("ID must be an integer value");
    } else {
      const idea = db.getFromDatabaseById("ideas", req.params.ideaId);
      if (idea) {
        const pass = valueIdea(req.body);
        if (pass) {
          next();
        } else {
          res.status(400).send();
        }
      } else {
        res
          .status(404)
          .send(`Unable to check value of idea ${req.params.ideaId}`);
      }
    }
  } else {
    const pass = valueIdea(req.body);
    if (pass) {
      next();
    } else {
      res.status(400).send();
    }
  }
};

const valueIdea = (reqBody) => {
  const ideaValue = Number(reqBody.numWeeks) * Number(reqBody.weeklyRevenue);
  if (ideaValue >= 1000000) {
    return true;
  } else {
    return false;
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
