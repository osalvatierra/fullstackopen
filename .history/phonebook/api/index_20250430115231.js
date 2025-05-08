const http = require("http");
const express = require("express");
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
  response.json(persons.length);
});

const PORT = 3002;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
