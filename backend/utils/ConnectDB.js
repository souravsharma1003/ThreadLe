const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');
  } catch (e) {
    console.log('Error connecting to DB');
  }
};

module.exports = connectToDB;