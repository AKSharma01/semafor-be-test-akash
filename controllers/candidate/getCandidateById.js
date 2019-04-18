'use strict';


const utils = require(rootDir + "/utils");
const candidateTransformer = require(rootDir + "/transformer/candidate");

const mongoDB = utils.mongoDB;
const response = utils.response;
const constants = utils.constants;


const getAllCandidates = (req, res) => {
	// console.log("query: ", req)
	
	if(!req.params.id || !Number.isInteger(parseInt(req.params.id))){
		let validate =  ["id needs to be number"];
		return response.failed(res, constants.ERROR_400.STATUS, constants.ERROR_400.MESSAGE, validate);
	}

	mongoDB.db.candidate.findOne({
		candidate_id: req.params.id
	}).then((candidateObject) => {
		console.log("allCandidate: ", candidateObject);
		let candidateResponse = candidateTransformer.response(candidateObject);
		return response.success(res, candidateResponse, constants.SUCCESS_200.STATUS, "user logged in successfully");
	})
	.catch((error) => {
		let errorHint = [];
		if(error.errors)
			Object.keys(error.errors).forEach((column) => {
				errorHint.push(error.errors[column].message);
			});
		else
			errorHint.push(error.message)
		return response.failed(res, constants.ERROR_417.STATUS, constants.ERROR_417.MESSAGE, errorHint);
	})
}

module.exports = getAllCandidates;