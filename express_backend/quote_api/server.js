const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

const quoteApiRouter = express.Router();

quoteApiRouter.get("/random", (req, res, next) => {
  const quote = getRandomElement(quotes);
  res.status(200).json({ quote: quote });
});

quoteApiRouter.get("/", (req, res, next) => {
  const person = req.query.person;
  if (person) {
    const selectedQuotes = quotes.filter(
      (quote) => quote.person.toLowerCase() == person.toLowerCase()
    );
    if (selectedQuotes.length > 0) {
      res.status(200).json({ quotes: selectedQuotes });
    } else {
      res.status(404).send("No quotes found for this author.");
    }
  } else {
    res.status(200).json({ quotes: quotes });
  }
});

quoteApiRouter.post("/", (req, res, next) => {
  const person = req.query.person;
  const quoteText = req.query.quote;

  if (!person || !quoteText) {
    res.status(400).send("Not enough infromation to create quote.");
  } else {
    const newQuote = { person: person, quote: quoteText };
    quotes.push(newQuote);
    res.status(201).json({ quote: newQuote });
  }
});

app.use("/api/quotes", quoteApiRouter);
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
