
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');

const app = express();
// Enable CORS
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// Graceful shutdown
process.on('SIGINT', async () => {
  try {
      await mongoose.connection.close();
      console.log('Mongoose connection disconnected due to app termination');
      process.exit(0);
  } catch (err) {
      console.error('Error while closing Mongoose connection:', err);
      process.exit(1);
  }
});
module.exports = app;