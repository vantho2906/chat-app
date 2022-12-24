const { SearchMiddleware } = require('../middlewares/search');

const router = require('express').Router();

router.post('/fullname', SearchMiddleware.findByFullname);
router.post('/phone', SearchMiddleware.findByPhone);
router.post('/email', SearchMiddleware.findByEmail);

module.exports = router;
