const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const {
  createUser,
  findByEmailOrPhone,
  findByEmail,
  updatePasswordByEmail,
  userModel
} = require('../models/authModel');
dotenv.config();

const signJwt = (payload, expiresIn = '1h') =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !password || (!email && !phone))
      return res.status(400).json({ message: 'Name, password and email/phone required' });

    const hashed = await bcrypt.hash(password, 10);
    await createUser(name, email || null, phone || null, hashed);
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    if (err && err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Email or Phone already exists' });
    }
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'Username and password required' });

    const user = await findByEmailOrPhone(username);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signJwt({ id: user.id, email: user.email });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

exports.me = async (req, res) => {
  res.json({ user: req.user });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email required' });

    const user = await findByEmail(email);
    if (!user) return res.status(200).json({ message: 'If account exists, email sent' });

    const token = signJwt({ email }, '15m');
    const resetUrl = `http://localhost:4200/reset-password/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset your password',
      html: `<p>Use this link within 15 minutes:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
    });

    res.json({ message: 'If account exists, email sent' });
  } catch (err) {
    res.status(500).json({ message: 'Email send failed', error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ message: 'Invalid request' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashed = await bcrypt.hash(newPassword, 10);
    await updatePasswordByEmail(decoded.email, hashed);
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

exports.getUsersAll = (req, res) => {
  userModel.getUsers((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

