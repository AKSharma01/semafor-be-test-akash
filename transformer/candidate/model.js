'use strict';



const model  = (requestBody)=> {
	return {
		candidate_id: requestBody.id,
		user_name: requestBody.userName,
		fname: requestBody.firstName,
		lname: requestBody.lastName,
		mobile: requestBody.mobileNo,
		country: requestBody.country
	}
}

module.exports = model;