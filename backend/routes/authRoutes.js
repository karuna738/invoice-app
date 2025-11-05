// import express from "express";
// import {
//   register,
//   login,
//   me,
//   forgotPassword,
//   resetPassword,
// } from "../controllers/authController.js";
// import { requireAuth } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.get("/me", requireAuth, me);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password/:token", resetPassword);

// export default router;


const express = require('express');
const {
  register,
  login,
  me,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', requireAuth, me);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router; // ✅ CommonJS export

