const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const app = express();
const port = 6000;
app.use(express.json());
app.use(cors());

const sequelize = new Sequelize({
  database: "CaveaDemoBase",
  username: "postgres",
  password: "password",
  host: "localhost",
  dialect: "postgreSQL",
});

const Item = sequelize.define("Item", {
  id: {
    type: Sequelize.NUMBER,
    allowNull: false,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.NUMBER,
    allowNull: false,
  },
});

app.get("/inventories", function (req, res) {
  let page = req.params.page - 1;
  let location = req.params.location;
  let result;
  if (location == "ყველა") {
    //select all the items
  } else if (page) {
    //select only sorted items
  }
  res.send(JSON.stringify(result));
});

app.post("/inventories", function (req, res) {
  let name = req.body.name;
  let location = req.body.location;
  let price = req.body.price;

  //insertion seq code

  res.send(JSON.stringify("post successful"));
});

app.delete("/inventories/:inventoryID", function (req, res) {
  let id = req.params.inventoryID;

  //delete sequelize code

  res.send(JSON.stringify("waishala"));
});

app.listen(port, () => console.log(`listening on port ${port}`));
