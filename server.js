const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 8000;
require("dotenv").config();

let db,
  dbConnectionStr =
    "mongodb+srv://sara-swingle:ZfACdS1WMhNVG1Kp@beverages.qkf3dfw.mongodb.net/?retryWrites=true&w=majority",
  dbName = "beverages";

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
  (client) => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  }
);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (request, response) => {
  db.collection("caffeinated")
    .find()
    .sort({ units: -1 })
    .toArray()
    .then((data) => {
      response.render("index.ejs", { info: data });
    })
    .catch((error) => console.error(error));
});

app.post("/addDrink", (request, response) => {
  db.collection("caffeinated")
    .insertOne({
      type: request.body.type,
      subtype: request.body.subtype,
      name: request.body.name,
      content: request.body.content,
      measurement: request.body.measurement,
      units: 0,
    })
    .then((result) => {
      console.log("Drink added!");
      response.redirect("/");
    })
    .catch((error) => console.error(error));
});

app.put("/addOneUnit", (request, response) => {
  db.collection("caffeinated")
    .updateOne(
      {
        type: request.body.type,
        subtype: request.body.subtype,
        name: request.body.name,
        content: request.body.content,
        measurement: request.body.measurement,
        units: 0,
      },
      {
        $set: {
          units: request.body.unitsS + 1,
        },
      },
      {
        sort: { _id: -1 },
        upsert: true,
      }
    )
    .then((result) => {
      console.log("Added One Unit");
      response.json("Unit Added");
    })
    .catch((error) => console.error(error));
});

app.delete("/deleteDrink", (request, response) => {
  db.collection("caffeinated")
    .deleteOne({ name: request.body.nameS })
    .then((result) => {
      console.log("Drink Deleted");
      response.json("Drink Deleted");
    })
    .catch((error) => console.error(error));
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
