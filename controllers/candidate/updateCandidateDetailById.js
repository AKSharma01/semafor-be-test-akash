'use strict';

const utils = require(rootDir + "/utils");
const candidateTransformer = require(rootDir + "/transformer/candidate");

const mongoDB = utils.mongoDB;
const response = utils.response;
const constants = utils.constants;


const newCandidate = (req, res) => {
	req.checkBody("firstName", "please enter you first name").optional().isString();
	req.checkBody("lastName", "please enter you last name").optional().isString();
	req.checkBody("mobileNo", "please enter you mobile no").optional().isInt();
	req.checkBody("country", "please enter you country").optional().isString();

	req.sanitize('user').trim();

	const validate = req.validationErrors();
	if(validate){
		console.log("validate: ", validate);
		return response.failed(res, constants.ERROR_400.STATUS, constants.ERROR_400.MESSAGE, validate);
	}
	if(!req.params.id || !Number.isInteger(parseInt(req.params.id))) {
		let validate =  ["id needs to be number"];
		return response.failed(res, constants.ERROR_400.STATUS, constants.ERROR_400.MESSAGE, validate);
	}
	
	let query = candidateTransformer.model(req.body);

	mongoDB.db.candidate.findOne({
		candidate_id: parseInt(req.params.id)
	}).then((existingCandidate) => {
		if(!existingCandidate)
			throw({
				message: "candidate id not found"
			});

			query.fname? existingCandidate.fname = query.fname: "";
			query.lname? existingCandidate.lname = query.lname: "";
			query.mobile? existingCandidate.mobile = query.mobile: "";
			query.country? existingCandidate.country = query.country: "";

			return existingCandidate.save();
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