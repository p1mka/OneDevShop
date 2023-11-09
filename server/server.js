const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const auth = require("./middlewares/auth");
const ROLES = require("./constants/roles");
const hasRole = require("./middlewares/has-role");

const { login, register } = require("./controllers/user");
const {
  getProducts,
  getProductById,
  addReview,
  deleteReview,
} = require("./controllers/product");

const mapProduct = require("./helpers/map-product");
const mapProducts = require("./helpers/map-products");
const mapUser = require("./helpers/map-user");
const mapReview = require("./helpers/map-review");

const port = 3090;
const app = express();

app.set("views", "pages");

app.use(express.static("../client/build"));
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/products", async (req, res) => {
  const productsList = await getProducts();

  res.send({ error: null, data: mapProducts(productsList) });
  console.log("Список товаров отправлен!");
});

app.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(
      req.body.email,
      req.body.login,
      req.body.password
    );
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, data: mapUser(user) });
    console.log(`Пользователь ${user.login} зарегистрирован!`);
  } catch (e) {
    if (e.code === 11000 && e.keyPattern.login) {
      res.send({ error: `Этот логин уже занят...`, data: null });
    }
    if (e.code === 11000 && e.keyPattern.email) {
      res.send({ error: `Этот e-mail уже зарегистрирован...`, data: null });
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, data: mapUser(user) });
    console.log(`Пользователь ${user.login} залогинен!`);
  } catch (e) {
    res.send({ error: e.message || "Что-то пошло не так... ", data: null });
  }
});

app.post("/logout", async (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({ error: null });
});

app.get(`/products/:id`, async (req, res) => {
  const product = await getProductById(req.params.id);

  res.send({ error: null, data: mapProduct(product) });
});

app.use(auth);

app.post(`/products/:id/reviews`, async (req, res) => {
  const { newReview, newRating } = await addReview(req.params.id, {
    content: req.body.review,
    author: req.user.id,
    reviewRating: req.body.reviewRating,
  });
  res.send({
    error: null,
    data: { newReview: mapReview(newReview), newRating },
  });
});

app.delete(
  "/products/:productId/reviews/:reviewId",
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    const newRating = await deleteReview(
      req.params.productId,
      req.params.reviewId
    );
    res.send({ error: null, data: newRating });
  }
);

mongoose
  .connect(
    "mongodb+srv://p1mka:Maznov0712@cluster0.pmbbp7d.mongodb.net/onedevshop?retryWrites=true&w=majority"
  )
  .then(() =>
    app.listen(port, () => console.log(`Сервер запущен на порту ${port}`))
  );
