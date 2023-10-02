const mongoose = require("mongoose");
const Recipe = require("./models/recipe");

mongoose
  .connect("mongodb://localhost:27017/dbFamilyRecipes")
  .then(() => {
    console.log("Connection Open");
  })
  .catch(() => console.log(err));

const seedRecipes = [
  {
    title: "Granola",
    image: "https://source.unsplash.com/collection/1027750",
    description: "A highly customizable granola for you to make around the Holiays",
    ingredients: ["Oats", "Avocado Oil", "Cashews"],
    steps: ["Pour everything into a bowl", "Bake", "Profit"],
    author: "6512de57e5a2706fb837cce9",
  },
  {
    title: "Gravy",
    image: "https://source.unsplash.com/collection/1027750",
    description: "A basic gravy recipe which you can use as a template.",
    ingredients: ["Milk", "Butter", "Flour", "Meat"],
    steps: ["Make roux", "Add milk", "Profit"],
    author: "6512de57e5a2706fb837cce9",
  },
];

const seedDB = async () => {
  await Recipe.deleteMany({});

  Recipe.insertMany(seedRecipes)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

seedDB();
