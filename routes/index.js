'use strict';

const app = require("express")();
const candidate_v1 = require("./candidate");


// app.get("/v1", (req, res) => {
// 	console.log("asdfjoahsdfohsibf");
// })
app.use("/v1/candidate", candidate_v1);

module.exports = app;