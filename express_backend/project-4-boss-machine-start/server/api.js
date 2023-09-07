const express = require("express");
const apiRouter = express.Router();
const db = require("./db");
const checkMillionDollarIdea = require("./checkMillionDollarIdea");

// 3 base paths are /api/minions, /api/ideas, and /api/meetings
const minionsRouter = express.Router({ mergeParams: true });
apiRouter.use("/minions", minionsRouter);

const ideasRouter = express.Router({ mergeParams: true });
apiRouter.use("/ideas", ideasRouter);

const meetingsRouter = express.Router({ mergeParams: true });
apiRouter.use("/meetings", meetingsRouter);

// bonus for minion work
const workRouter = express.Router({ mergeParams: true });
minionsRouter.use("/:minionId/work", workRouter);

// minions
minionsRouter.get("/", (req, res, next) => {
  const allMinions = db.getAllFromDatabase("minions");
  res.status(200).json(allMinions);
  next();
});

minionsRouter.get("/:minionId", (req, res, next) => {
  if (isNaN(req.params.minionId)) {
    res.status(404).send("ID must be an integer value");
  } else {
    const minion = db.getFromDatabaseById("minions", req.params.minionId);
    if (minion) {
      res.status(200).json(minion);
      next();
    } else {
      res.status(404).send(`Unable to find minion ${req.params.minionId}`);
      next();
    }
  }
});

minionsRouter.post("/", (req, res, next) => {
  const newMinion = db.addToDatabase("minions", req.body);
  // altered function to return null if valid minion not created
  if (newMinion) {
    res.status(201).json(newMinion);
    next();
  } else {
    res.status(500).send("Invalid minion for creation.");
    next();
  }
});

minionsRouter.put("/:minionId", (req, res, next) => {
  if (isNaN(req.params.minionId)) {
    res.status(404).send("ID must be an integer value");
  } else {
    const updatedMinion = db.updateInstanceInDatabase("minions", req.body);
    if (updatedMinion) {
      res.status(200).json(updatedMinion);
      next();
    } else {
      res.status(404).send(`Failed to update minion ${req.params.minionId}`);
      next();
    }
  }
});

minionsRouter.delete("/:minionId", (req, res, next) => {
  if (isNaN(req.params.minionId)) {
    res.status(404).send("ID must be an integer value");
  } else {
    const deletedMinion = db.deleteFromDatabasebyId(
      "minions",
      req.params.minionId
    );
    if (deletedMinion) {
      res.status(204).send(`Deleted minion ${req.params.minionId}`);
      next();
    } else {
      res.status(404).send(`Failed to delete minion ${req.params.minionId}`);
      next();
    }
  }
});

// ideas
ideasRouter.get("/", (req, res, next) => {
  const allIdeas = db.getAllFromDatabase("ideas");
  res.status(200).json(allIdeas);
  next();
});

ideasRouter.get("/:ideaId", (req, res, next) => {
  if (isNaN(req.params.ideaId)) {
    res.status(404).send("ID must be an integer value");
  } else {
    const idea = db.getFromDatabaseById("ideas", req.params.ideaId);
    if (idea) {
      res.status(200).json(idea);
      next();
    } else {
      res.status(404).send(`Unable to find idea ${req.params.ideaId}`);
      next();
    }
  }
});

ideasRouter.post("/", checkMillionDollarIdea);
ideasRouter.post("/", (req, res, next) => {
  const newIdea = db.addToDatabase("ideas", req.body);
  // altered function to return null if valid idea not created
  if (newIdea) {
    res.status(201).json(newIdea);
    next();
  } else {
    res.status(500).send("Invalid idea for creation.");
    next();
  }
});

ideasRouter.put("/:ideaId", checkMillionDollarIdea);
ideasRouter.put("/:ideaId", (req, res, next) => {
  if (isNaN(req.params.ideaId)) {
    res.status(404).send("ID must be an integer value");
  } else {
    const updatedIdea = db.updateInstanceInDatabase("ideas", req.body);
    if (updatedIdea) {
      res.status(200).json(updatedIdea);
      next();
    } else {
      res.status(404).send(`Failed to update idea ${req.params.ideaId}`);
      next();
    }
  }
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
  if (isNaN(req.params.ideaId)) {
    res.status(404).send("ID must be an integer value");
  } else {
    const deletedIdea = db.deleteFromDatabasebyId("ideas", req.params.ideaId);
    if (deletedIdea) {
      res.status(204).send(`Deleted idea ${req.params.ideaId}`);
      next();
    } else {
      res.status(404).send(`Failed to delete idea ${req.params.ideaId}`);
      next();
    }
  }
});

// meetings
meetingsRouter.get("/", (req, res, next) => {
  const allMeetings = db.getAllFromDatabase("meetings");
  res.status(200).json(allMeetings);
  next();
});

meetingsRouter.post("/", (req, res, next) => {
  const newMeeting = db.createMeeting();
  const addedMeeting = db.addToDatabase("meetings", newMeeting);
  // altered function to return null if valid meeting not created
  if (addedMeeting) {
    res.status(201).json(addedMeeting);
    next();
  } else {
    res.status(500).send("Invalid meeting for creation.");
    next();
  }
});

meetingsRouter.delete("/", (req, res, next) => {
  const deletedMeetings = db.deleteAllFromDatabase("meetings");
  if (deletedMeetings) {
    res.status(204).send(`Deleted all meetings`);
    next();
  } else {
    res.status(404).send(`Failed to delete all meetings`);
    next();
  }
});

// work
workRouter.get("/", (req, res, next) => {
  if (isNaN(req.params.minionId)) {
    res.status(404).send("ID must be an integer value");
  } else {
    const allWork = db.getAllFromDatabase("work");
    // filter to minion
    const minionWork = allWork.filter(
      (work) => work.minionId === req.params.minionId
    );
    if (minionWork.length > 0) {
      res.status(200).json(minionWork);
      next();
    } else {
      res.status(404).send(`No work found for minion ${req.params.minionId}`);
      next();
    }
  }
});

workRouter.post("/", (req, res, next) => {
  // altered function to return null if valid work not created
  const newWork = db.addToDatabase("work", req.body);
  if (newWork) {
    res.status(201).json(newWork);
    next();
  } else {
    res.status(500).send("Invalid work for creation.");
    next();
  }
});

workRouter.put("/:workId", (req, res, next) => {
  if (isNaN(req.params.workId)) {
    res.status(404).send("ID must be an integer value");
  } else {
    // check minion exists
    const minion = db.getFromDatabaseById("minions", req.params.minionId);
    if (minion) {
      // check that work is for appropriate minion
      const currentWork = db.getFromDatabaseById("work", req.params.workId);
      if (currentWork.minionId === req.body.minionId) {
        const updatedWork = db.updateInstanceInDatabase("work", req.body);
        if (updatedWork) {
          res.status(200).json(updatedWork);
          next();
        } else {
          res.status(404).send(`Failed to update work ${req.params.workId}`);
          next();
        }
      } else {
        res
          .status(400)
          .send(
            `Failed to update work ${req.params.workId} for minion ${req.body.minionId} as it currently belongs to minion ${currentWork.minionId}`
          );
      }
    } else {
      res
        .status(404)
        .send(`Unable to update work for minion ${req.params.minionId}`);
    }
  }
});

workRouter.delete("/:workId", (req, res, next) => {
  if (isNaN(req.params.workId)) {
    res.status(404).send("ID must be an integer value");
  } else {
    const deletedWork = db.deleteFromDatabasebyId("work", req.params.workId);
    if (deletedWork) {
      res.status(204).send(`Deleted work ${req.params.workId}`);
      next();
    } else {
      res.status(404).send(`Failed to delete work ${req.params.workId}`);
      next();
    }
  }
});

module.exports = apiRouter;
