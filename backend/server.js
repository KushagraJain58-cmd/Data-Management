const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const model = require('./models/dataModel.js');
const { getData, addData, deleteData, deleteRows, sendEmail } = require('./controllers/dataControllers');

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/data', getData);
app.post('/api/data', addData);
app.delete('/api/data/:id', deleteData);
app.post('/api/data/delete', deleteRows);
app.post('/api/email', sendEmail);

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
