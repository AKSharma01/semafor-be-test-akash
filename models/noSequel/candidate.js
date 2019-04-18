'use strict';

const mongoose = require('mongoose');

const constants = require(rootDir + "/utils/constants");

const Schema = mongoose.Schema;

let CandidateSchema = new Schema({
	candidate_id: {
		type: Number,
		validate: {
			validator: function(v) {
				return Number.isInteger(v);
			},
			message: props => `${props.value} is not a valid id`
		},
		required: [true, 'User id required']
	},
	user_name: {
		type: String,
		validate: {
			validator: function(value) {
				return /[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9][^-\s]$/.test(value);
			},
			message: props => `${props.value} is not a valid username! (hint: does't include space (length 6-18)")`
		},
		required: [true, 'username required']
	},
	fname: {
		type: String,
		validate: {
			validator: function(value) {
				return /[a-zA-Z]/.test(value);
			},
			message: props => `${props.value} is not a valid fname!`
		},
		required: [true, 'fname required']
	},
	lname: {
		type: String,
		validate: {
			validator: function(value) {
				return /[a-zA-Z]/.test(value);
			},
			message: props => `${props.value} is not a valid lname!`
		},
		required: [true, 'lname required']
	},
	mobile: {
		type: Number,
		validate: {
			validator: function(value) {
				return /^\d{10}$/.test(value);
			},
			message: props => `${props.value} is not a valid phone number!`
		},
		required: [true, 'phone number required']
	},
	country: {
		type: String,
		validate: {
			validator: function(value) {
				return /[a-zA-Z]/.test(value);
			},
			message: props => `${props.value} is not a valid country code!`
		},
		required: [true, 'Country code required']
	}
}, {
	versionKey: false
})

// CountrySchema.pre('save', function(doc, next) {
// 	console.log("doc: ", doc);
// 	// Unless you comment out the `return` above, 'after next' will print
// 	next();
// });

module.exports = mongoose.model(constants.CANDIDATE_COLLECTIONS, CandidateSchema);