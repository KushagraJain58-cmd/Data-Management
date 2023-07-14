const Data = require('../models/dataModel');

const getData = async (req, res) => {
	try {
		const data = await Data.find();
		res.json(data);
	} catch (error) {
		console.error('Error fetching data:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const addData = async (req, res) => {
	try {
		const newData = new Data(req.body);
		await newData.save();
		res.status(201).json(newData);
	} catch (error) {
		console.error('Error adding data:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const deleteData = async (req, res) => {
	try {
		await Data.findByIdAndDelete(req.params.id);
		res.status(204).send();
	} catch (error) {
		console.error('Error deleting data:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const deleteRows = async (req, res) => {
	try {
		const { rows } = req.body;
		await Data.deleteMany({ _id: { $in: rows } });
		res.status(204).send();
	} catch (error) {
		console.error('Error deleting rows:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const sendEmail = async (req, res) => {
	try {
		const { rows } = req.body;
		const data = await Data.find({ _id: { $in: rows } });
		const emailContent = data
			.map((item) => {
				return `
        Name: ${item.name}
        Phone Number: ${item.phoneNumber}
        Email: ${item.email}
        Hobbies: ${item.hobbies}
        ------------------------------
      `;
			})
			.join('');

		// Code for sending email

		res.status(200).send();
	} catch (error) {
		console.error('Error sending email:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

module.exports = {
	getData,
	addData,
	deleteData,
	deleteRows,
	sendEmail
};
