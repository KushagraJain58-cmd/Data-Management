const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
	name: String,
	phoneNumber: String,
	email: String,
	hobbies: String
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
