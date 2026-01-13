require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(morgan("tiny"));
const cors = require("cors");
app.use(cors());
app.use(express.static("dist"));
const mongoose = require("mongoose");
const Person = require("./models/person");

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(express.json());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/info", (req, res) => {
  Person.countDocuments({}).then((count) => {
    res.send(`
      <div
        <p>Phonebook has info for ${count} people</p>
    <p>${new Date()}</p>
  </div>
    `);
  });
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "content missing" });
  }

  const person = new Person({
    name: name,
    number: number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
