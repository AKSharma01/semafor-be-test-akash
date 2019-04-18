'use strict';

const utils = require(rootDir + "/utils");
const candidateTransformer = require(rootDir + "/transformer/candidate");

const mongoDB = utils.mongoDB;
const response = utils.response;
const constants = utils.constants;


const newCandidate = (req, res) => {
	req.checkBody("id", "please enter the value").notEmpty();
	req.checkBody("userName", "please enter you username").notEmpty();
	req.checkBody("firstName", "please enter you first name").notEmpty();
	req.checkBody("lastName", "please enter you last name").notEmpty();
	req.checkBody("mobileNo", "please enter you mobile no").notEmpty();
	req.checkBody("country", "please enter you country").notEmpty();

	req.sanitize('user').trim();

	const validate = req.validationErrors();
	if(validate){
		console.log("validate: ", validate);
		return response.failed(res, constants.ERROR_400.STATUS, constants.ERROR_400.MESSAGE, validate);
	}
	
	let query = candidateTransformer.model(req.body);

	mongoDB.db.candidate.find({
		$or: [{
			candidate_id: parseInt(query.candidate_id)
		}, {
			user_name: query.user_name
		}]
	}).then((existingCandidate) => {
		if(existingCandidate.length > 0)
			throw({
				message: "candidate id or user name can't be same"
			});

			return mongoDB.db.candidate.create(query);
		}).then((candidateObject) => {

			let responseObject = candidateTransformer.response(candidateObject);
			return response.success(res, responseObject, constants.SUCCESS_200.STATUS, "user logged in successfully");
		}).catch((error) => {

			let errorHint = [];
			if(error.errors)
				Object.keys(error.errors).forEach((column) => {
					errorHint.push(error.errors[column].message);
				});
			else
				errorHint.push(error.message)
			return response.failed(res, constants.ERROR_400.STATUS, constants.ERROR_400.MESSAGE, errorHint);
		})

}

module.exports = newCandidate;