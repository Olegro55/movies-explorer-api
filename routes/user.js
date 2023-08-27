const router = require('express').Router();
const validation = require('../middlewares/validation');

const {
  getUser,
  updateUser,
} = require('../controllers/user');

router.get('/me', getUser);

router.patch('/me', validation.updateUserData, updateUser);

module.exports = router;
