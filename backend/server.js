const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const app = express();
const port = 8000;
app.use(express.json());
app.use(cors());

const sequelize = new Sequelize({
  database: "CaveaDemoBase",
  username: "postgres",
  password: "password",
  host: "localhost",
  dialect: "postgres",
});

const Inventory = sequelize.define(
  "Inventory",
  {
    id: {
      type: Sequelize.NUMBER,
      unique: true,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
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
  },
  {
    tableName: "caveademotable",
    timestamps: false,
  }
);

app.get("/inventories/", function (req, res) {
  let page = parseInt(req.query.page, 10) - 1;
  let location = req.query.location;

  if (isNaN(page) || page < 0) {
    return res.status(400).send("Invalid page number");
  }

  if (location == "ყველა") {
    Inventory.findAndCountAll({
      offset: page * 20,
      limit: 20,
      order: [["name", "ASC"]],
    })
      .then((result) => {
        const { count, rows } = result;
        res.send(JSON.stringify({ data: rows, totalCount: count }));
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    Inventory.findAndCountAll({
      where: { location: location },
      offset: page * 20,
      limit: 20,
      order: [["name", "ASC"]],
    })
      .then((result) => {
        const { count, rows } = result;
        res.send(JSON.stringify({ data: rows, totalCount: count }));
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.post("/inventories", function (req, res) {
  let name = req.body.name;
  let location = req.body.location;
  let price = req.body.price;

  Inventory.create({
    name: name,
    location: location,
    price: price,
  }).catch((err) => {
    if (err) {
      console.log(err);
    }
  });

  res.send(JSON.stringify("post successful"));
});

app.delete("/inventories/:inventoryID", function (req, res) {
  let id = req.params.inventoryID;

  Inventory.destroy({ where: { id: id } });
  res.send("Deleted");
});

app.listen(port, () => console.log(`listening on port ${port}`));

//მართალია ეს კოდი პრაქტიკაში არ გამოდგება, მაგრამ დატესტვის მიზნით ლოკალურ სეტაპზე გამოსადეგია.

app.get("/inventories/populate/:amount/", function (req, res) {
  const numberOfItems = req.params.amount;
  const dummyNames = ["Nika", "Luka", "Andria", "Vaniko"];
  const dummyLocations = [
    "კავეა სითი მოლი",
    "კავეა ისთ ფოინთი",
    "მთავარი ოფისი",
    "კავეა გალერეა",
    "კავეა თბილისი მოლი",
  ];

  const items = [];

  for (let i = 0; i < numberOfItems; i++) {
    items.push({
      name: dummyNames[Math.floor(Math.random() * dummyNames.length)],
      location:
        dummyLocations[Math.floor(Math.random() * dummyLocations.length)],
      price: Math.random() * 100,
    });
  }

  Inventory.bulkCreate(items)
    .then(() => {
      console.log("Items inserted successfully");
    })
    .catch((err) => {
      console.error("Error inserting items:", err);
    });
});
