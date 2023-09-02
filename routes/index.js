const router = require('express').Router();

const userRouter = require('./user');
const movieRouter = require('./movie');
const { NotFoundError } = require('../errors');

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', (req, res, next) => { next(new NotFoundError('Страница не найдена')); });

module.exports = router;
