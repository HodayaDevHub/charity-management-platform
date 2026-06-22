require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const { ErrorHandler} = require('./middlewares/auth');

const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const donationRoutes = require('./routes/donationRoutes');
const fundraiserRoutes = require('./routes/fundraiserRoutes');

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/groups', groupRoutes);
app.use('/donations', donationRoutes);
app.use('/fundraisers', fundraiserRoutes);

// app.use(ErrorHandler);

const dbURI = process.env.MONGO_URI || process.env.dbURI;
const PORT = process.env.PORT || 3000;

if (!dbURI) {
    console.error('Missing MONGO_URI or dbURI in environment.');
    process.exit(1);
}

mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Connection error:', err);
  });
