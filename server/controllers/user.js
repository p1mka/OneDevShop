const User = require("../models/user");
const { generate } = require("../helpers/token");
const bcrypt = require("bcrypt");

const register = async (email, login, password) => {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    login,
    password: passwordHash,
  });

  const token = await generate({ id: user.id });
  return { user, token };
};

const login = async (login, password) => {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("Пользователь с таким логином не зарегистрирован!");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Неверный пароль!");
  }

  const token = await generate({ id: user.id });
  return { user, token };
};

module.exports = { login, register };
