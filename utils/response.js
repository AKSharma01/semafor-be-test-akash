'use strict';


const constants = require("./constants");

const success = (response, data = null, statusCode, message = "") => {
	let responseObj = {};
	data? responseObj.data = data: null;
	responseObj.status = statusCode? statusCode: constants.SUCCESS_200.STATUS;
	responseObj.message = message? message: constants.SUCCESS_200.MESSAGE; 
	response.statusCode = responseObj.status;
	response.json(responseObj);
}


const failed = (response, statusCode, message, hint=null) => {
	let responseObj = {};
	responseObj.data = null;
	responseObj.hint = hint;
	responseObj.status = statusCode? statusCode: constants.ERROR_400.status;
	responseObj.message = message? message: constants.ERROR_400.message;
	console.log("error : ", responseObj);
	response.statusCode = responseObj.status;
	response.json(responseObj);
}


module.exports = {
	success, 
	failed
}