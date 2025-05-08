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

  const timestamp = Date.now();
  const utcDate = new Date(timestamp);

  const localDateTime = new Date(
    Date.UTC(
      utcDate.getFullYear(),
      utcDate.getMonth() + 1, // Month is 0-indexed, so add 1
      utcDate.getDate(),
      utcDate.getHours(),
      utcDate.getMinutes()
    )
  );
  console.log(localDateTime);
  response.json(`Phonebook has info for ${info} people. `);
});

const PORT = 3002;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
