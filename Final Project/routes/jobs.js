const express = require('express');
const router = express.Router();

const { getAllObjects, getObject, createObject, updateObject, deleteObject,} = require('../controllers/objects');

router.route('/').get(getAllObjects).post(createObject);
router.route('/:id').get(getObject).patch(updateObject).delete(deleteObject);

module.exports = router;