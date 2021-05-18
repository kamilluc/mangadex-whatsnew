var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());

const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../db/mangaDB.db",
});

class Manga extends Model {}
Manga.init(
  {
    id: { type: DataTypes.STRING, primaryKey: true },
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
  },
  { sequelize, modelName: "Manga" }
);
const mangaList = [];

(async () => {
  await sequelize.sync();

  const mangas = await Manga.findAll();
  for (const manga of mangas) {
    const { id, name, url, imgUrl } = manga;
    mangaList.push({ id, name, url, imgUrl });
  }
  // console.log(name);
  //   const jane = await Manga.create({
  //     username: 'janedoe',
  //     birthday: new Date(1980, 6, 20)
  //   });
  //   console.log(jane.toJSON());
})();

app.get("/mangas", (req, res, next) => {
  res.json(mangaList);
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
  console.log("http://localhost:3000/mangas");
});
