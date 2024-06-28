// server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');
require('./db/config'); // Import the database connection configuration
const User = require('./db/users'); // Correctly import the User model

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

const secretKey = 'dummy_secret_key'; // Dummy secret key

const decryptPayload = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

// Sign-up route
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).send({ message: 'Email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    const result = await newUser.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Sign-in route
app.post('/signin', async (req, res) => {
  try {
    const { payload } = req.body;

    if (!payload) {
      return res.status(400).send({ message: 'Payload is required.' });
    }

    const decryptedData = decryptPayload(payload);
    const { email, password } = decryptedData;

    console.log(email);
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }
     
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ _id: user._id }, 'jwtSecretKey', { expiresIn: '10h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
