'use strict';



const response  = (dbResponse)=> {
	return {
		id: dbResponse._id,
		candidateId: dbResponse.candidate_id,
		userName: dbResponse.user_name,
		firstName: dbResponse.fname,
		lastName: dbResponse.lname,
		mobileNo: dbResponse.mobile,
		country: dbResponse.country
	}
}

module.exports = response;