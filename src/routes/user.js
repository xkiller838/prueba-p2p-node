import express from 'express';
const router = express.Router();
const userController = require('../controllers/user');

router.get("/", userController.index)

router.post("/api/user/create", userController.create)

router.post("/api/user/chat", userController.chat)

module.exports = router