require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { createUser, login } = require('./controllers/user');

const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const { requestLogger, errorLogger } = require('./middlewares/logs');
const validation = require('./middlewares/validation');

const routes = require('./routes');

const { PORT = 3000, DB_ADDRESS, NODE_ENV } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_ADDRESS : 'mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(express.json());

app.use(requestLogger);

app.post('/signin', validation.loginData, login);
app.post('/signup', validation.createUserData, createUser);

app.use(auth);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT);
