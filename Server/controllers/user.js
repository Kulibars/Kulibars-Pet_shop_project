const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate } = require("../helpers/token");
const ROLES = require("../constants/roles");

async function register(login, password) {
  const existingUser = await User.findOne({ login });
  if (!login) {
    throw new Error("логин отсутствует");
  }

  if (existingUser) {
    throw new Error("Пользователь с таким логином уже есть");
  }

  if (!password) {
    throw new Error("пароль отсутствует");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    login,
    password: passwordHash,
  });

  const token = generate({ id: user.id });

  return { user, token };
}

async function login(login, password) {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error("неверный логин или пароль");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("неверный логин или пароль");
  }

  const token = generate({ id: user.id });

  return { token, user };
}

module.exports = {
  register,
  login,
};
