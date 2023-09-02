const express = require("express");
const apiRouter = express.Router();
const db = require("./db");

// 3 base paths are /api/minions, /api/ideas, and /api/meetings
const minionsRouter = express.Router({ mergeParams: true });
apiRouter.use("/minions", minionsRouter);

const ideasRouter = express.Router({ mergeParams: true });
apiRouter.use("/ideas", ideasRouter);

const meetingsRouter = express.Router({ mergeParams: true });
apiRouter.use("/meetings", meetingsRouter);

// minions
minionsRouter.get("/", (req, res, next) => {
  const allMinions = db.getAllFromDatabase("minions");
  res.status(200).json(allMinions);
  next();
});

minionsRouter.get("/:minionId", (req, res, next) => {
  const minion = db.getFromDatabaseById("minions", req.params.minionId);
  res.status(200).json(minion);
  next();
});

minionsRouter.post("/", (req, res, next) => {
  const newMinion = db.addToDatabase("minions", req.body);
  // altered function to return null if valid minion not created
  if (newMinion) {
    res.status(201).json(newMinion);
  } else {
    res.status(500).send("Invalid minion for creation.");
  }
});

// start on next route...

// ideas

// meetings

module.exports = apiRouter;
