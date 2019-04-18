'use strict';



const response  = (dbResponse)=> {
	let temp = [];
	dbResponse.forEach((obj) => {
		temp.push({
			id: obj._id,
			candidateId: obj.candidate_id,
			userName: obj.user_name,
			firstName: obj.fname,
			lastName: obj.lname,
			mobileNo: obj.mobile,
			country: obj.country
		})
	})
	return temp;
}

module.exports = response;