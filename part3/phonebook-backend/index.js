const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(morgan("tiny"));
const cors = require("cors");
app.use(cors());
app.use(express.static("dist"));

const date = new Date();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(express.json());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/info", (req, res) => {
  res.send(
    `
    <div
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${date}</p>
    </div>
    `
  );
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

const generateId = () => {
  const maxId = 1000000;
  return Math.floor(Math.random() * maxId);
};

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  const nameExists = persons.some((person) => person.name === name);

  if (!name) {
    return res.status(400).json({
      error: "name is missing",
    });
  }
  if (!number) {
    return res.status(400).json({
      error: "number is missing",
    });
  }
  if (nameExists) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: generateId(),
    name: name,
    number: number,
  };

  persons = persons.concat(person);
  res.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
