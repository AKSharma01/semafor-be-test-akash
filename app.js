'use strict';

global.rootDir = __dirname;
require("dotenv").config();
const utils = require("./utils");
const express = require("express");
const routes = require("./routes");
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const app = express();

app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next();
});
// console.log("routes: ", routes);
app.use("/api", routes);

app.listen(3000, () => {
	console.log("server is running...............");
})