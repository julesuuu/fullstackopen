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

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ error: "malformatted id" });
    });
});

app.delete("/api/persons/:id", (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(400).send({ error: "malformed id" });
    });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  /*
  if (!body.name) {
    return res.status(400).json({
      error: "name is missing",
    });
  }
  if (!body.number) {
    return res.status(400).json({
      error: "number is missing",
    });
  }
  if (nameExists) {
    return res.status(400).json({
      error: "name must be unique",
    });
  } */

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
