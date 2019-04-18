'use strict';


const utils = require(rootDir + "/utils");
const candidateTransformer = require(rootDir + "/transformer/candidate");

const mongoDB = utils.mongoDB;
const response = utils.response;
const constants = utils.constants;


const getAllCandidates = (req, res) => {
	mongoDB.db.candidate.find()
		.then((allCandidate) => {
			console.log("allCandidate: ", allCandidate);
			let responseList = candidateTransformer.arrayResponse(allCandidate);
			return response.success(res, responseList, constants.SUCCESS_200.STATUS, "user logged in successfully");
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