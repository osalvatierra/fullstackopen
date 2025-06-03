const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://osalvatierra:YhG23YHt6WskEU6@cluster0.9edkxra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: Number,
  id: String,
});

const Contact = mongoose.model("phonebooks", phonebookSchema);

const contact = new Contact({
  name: "Richard Miller",
  number: 9892230943,
  id: "83948289478498",
});

contact.save().then((result) => {
  console.log("contact saved!");
  mongoose.connection.close();
});
