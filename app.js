

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRouter = require('./routes/employee');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: 'https://crud-app-frontend-olive.vercel.app/',
  credentials: true
}))
  app.use(express.json());
app.use(express.urlencoded({ extended: true }));



mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

app.use(employeeRouter);


app.get('/', (req, res) => {
  res.send('Connection Successful');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
