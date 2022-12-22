const {
  findByFullname,
  findByPhone,
  findByEmail,
} = require('../controllers/search');

const router = require('express').Router();

router.post('/fullname', findByFullname);
router.post('/phone', findByPhone);
router.post('/email', findByEmail);

module.exports = router;
