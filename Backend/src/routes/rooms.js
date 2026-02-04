const express = require('express');
const router = express.Router();
const { auth, requireRole } = require('../middlewares/auth');
const roomController = require('../controllers/roomController');

router.get('/', auth, roomController.list);
router.get('/:id', auth, roomController.get);
router.post('/', auth, requireRole('admin'), roomController.create);
router.put('/:id', auth, requireRole('admin'), roomController.update);
router.delete('/:id', auth, requireRole('admin'), roomController.remove);

module.exports = router;