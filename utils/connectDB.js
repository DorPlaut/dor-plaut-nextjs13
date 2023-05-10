const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      console.log('Connecting to MongoDB...');
      await mongoose.connect(process.env.MONGO_URI, {});
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
