const http = require("http");
const express = require("express");
const { Console } = require("console");
const app = express();

let persons = [
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: "3",
  },
  {
    id: "3618effd-454c-45f2-a853-fee968d44b22",
    name: "Katherin Waterson",
    number: 234123432,
  },
  {
    id: "ffaf8c7f-c7d4-4caf-8b0c-ec80d5e1ccbe",
    name: "Ada Lovelace",
    number: 0,
  },
  {
    id: "982",
    name: "Katherine Waterston",
    number: "1233234493",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const info = persons.length;

  const localDateTime = new Date();
  console.log(localDateTime.toString());
  const message = `Phonebook has info for ${info} people. <br/><br/>${localDateTime}`;
  response.send(message);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  }
  response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = 3002;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
