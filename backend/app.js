require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookie = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');
const { createUser, login } = require('./controllers/user');
const auth = require('./middlewares/auth');
const { validateCreateUser, validateLogin } = require('./middlewares/validator');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;
// const secret = process.env.JWT_SECRET;

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  autoIndex: true,
  useUnifiedTopology: false,
});

app.use(express.json());
app.use(cookie());

app.use(cors({ origin: 'https://mesto.bymaria.nomoreparties.co', credentials: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://mesto.bymaria.nomoreparties.co');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  );
  next();
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);
// app.use(auth);
app.get('/signout', auth, (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});
app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);
app.use('*', auth, (req, res, next) => next(new NotFoundError('Запрашиваемая страница не найдена.')));
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка.' : message });
  next();
});

app.listen(PORT);
