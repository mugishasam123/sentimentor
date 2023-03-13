const express = require('express');
const analyseHandler= require("../controllers/sentiment.controller");


const router = express.Router();

router.post('/s-analyzer', analyseHandler);

module.exports = router;