'use strict';

const newCandidate = require("./newCandidate");
const getAllCandidates = require("./getAllCandidates");
const getCandidateById = require("./getCandidateById");
const updateCandidateDetailById = require("./updateCandidateDetailById");


module.exports = {
	newCandidate,
	getAllCandidates,
	getCandidateById,
	updateCandidateDetailById
}