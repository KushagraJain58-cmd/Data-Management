// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const { connectDB } = require('./config/db');
// const nodemailer = require('nodemailer');

// dotenv.config();
// connectDB();
// const app = express();
// const port = 3001;

// app.use(cors());
// app.use(express.json());

// const dataSchema = new mongoose.Schema({
// 	name: String,
// 	phoneNumber: String,
// 	email: String,
// 	hobbies: String
// });

// const Data = mongoose.model('Data', dataSchema);

// // API routes
// app.get('/api/data', async (req, res) => {
// 	try {
// 		const data = await Data.find();
// 		res.json(data);
// 	} catch (error) {
// 		console.error('Error fetching data:', error);
// 		res.status(500).json({ error: 'Internal Server Error' });
// 	}
// });

// app.post('/api/data', async (req, res) => {
// 	try {
// 		const newData = new Data(req.body);
// 		await newData.save();
// 		res.status(201).json(newData);
// 	} catch (error) {
// 		console.error('Error adding data:', error);
// 		res.status(500).json({ error: 'Internal Server Error' });
// 	}
// });

// app.delete('/api/data/:id', async (req, res) => {
// 	try {
// 		await Data.findByIdAndDelete(req.params.id);
// 		res.status(204).send();
// 	} catch (error) {
// 		console.error('Error deleting data:', error);
// 		res.status(500).json({ error: 'Internal Server Error' });
// 	}
// });

// app.post('/api/data/delete', async (req, res) => {
// 	try {
// 		const { rows } = req.body;
// 		await Data.deleteMany({ _id: { $in: rows } });
// 		res.status(204).send();
// 	} catch (error) {
// 		console.error('Error deleting rows:', error);
// 		res.status(500).json({ error: 'Internal Server Error' });
// 	}
// });

// app.post('/api/email', async (req, res) => {
// 	try {
// 		const { rows } = req.body;
// 		const data = await Data.find({ _id: { $in: rows } });
// 		const emailContent = data
// 			.map((item) => {
// 				return `
//         Name: ${item.name}
//         Phone Number: ${item.phoneNumber}
//         Email: ${item.email}
//         Hobbies: ${item.hobbies}
//         ------------------------------
//       `;
// 			})
// 			.join('');

// 		const transporter = nodemailer.createTransport({
// 			service: 'gmail',
// 			auth: {
// 				user: process.env.EMAIL_USER,
// 				pass: process.env.EMAIL_PASSWORD
// 			}
// 		});

// 		const mailOptions = {
// 			from: process.env.EMAIL_USER,
// 			to: 'info@redpositive.in',
// 			subject: 'Selected Data',
// 			text: emailContent
// 		};

// 		await transporter.sendMail(mailOptions);
// 		res.status(200).send();
// 	} catch (error) {
// 		console.error('Error sending email:', error);
// 		res.status(500).json({ error: 'Internal Server Error' });
// 	}
// });

// // Start the server
// app.listen(port, () => {
// 	console.log(`Server is running on port ${port}`);
// });

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
const port = 3001;

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
