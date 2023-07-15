const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const model = require('./models/dataModel.js');
const dataRoutes = require('./routes/dataRoutes');
const { getData, addData, deleteData, deleteRows, sendEmail } = require('./controllers/dataControllers');

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', dataRoutes);

// app.get('/api/data', getData);
// app.post('/api/data', addData);
// app.delete('/api/data/:id', deleteData);
// app.post('/api/data/delete', deleteRows);
// app.post('/api/email', sendEmail);

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
// 			to: 'jainkushagra582@gmail.com',
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

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
