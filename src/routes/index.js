const express = require('express');
const authMiddleware = require('../middleware/auth');
const gastosController = require('../controllers/gastosController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);

router.use(authMiddleware);


const grupoController = require('../controllers/grupoController');

router.post('/grupos', grupoController.create);

router.get('/gastos', gastosController.list);
router.post('/gastos', gastosController.create);
router.put('/gastos/:id', gastosController.update);
router.delete('/gastos/:id', gastosController.remove);

module.exports = router;
