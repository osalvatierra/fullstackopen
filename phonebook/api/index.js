import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
import express from "express";
import Person from "./models/person.js";
import morgan from "morgan";
import cors from "cors";

const app = express();

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(express.json());
app.use(requestLogger);
app.use(morgan("tiny"));
app.use(cors());

app.post("/api/persons", async (request, response, next) => {
  const body = request.body;

  try {
    const existingPerson = await Person.findOne({ name: body.name });

    if (existingPerson) {
      return response.status(400).json({
        error: "Name already exists",
      });
    }

    const person = new Person({
      name: body.name,
      number: body.number,
    });

    const savedPerson = await person.save();
    response.json(savedPerson);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Server error" });
  }
});

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});
app.get("/info", async (request, response) => {
  try {
    const count = await Person.countDocuments({});
    const localDateTime = new Date();
    console.log(localDateTime.toString());

    const message = `Phonebook has info for ${count} people. <br/><br/>${localDateTime}`;
    response.send(message);
  } catch (error) {
    response.status(500).send("Error retrieving data from database");
  }
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;

  Person.findById(id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    }); // Handles invalid ObjectId format errors
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  const updatedPerson = { name, number };

  Person.findByIdAndUpdate(request.params.id, updatedPerson, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        response.status(404).json({ error: "person not found" });
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      if (result) {
        response.status(204).end();
      } else {
        response.status(404).json({ error: "person not found" });
      }
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.name, error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);
