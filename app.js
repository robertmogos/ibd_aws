var express = require('express'), http = require('http');
var app = express();

var AWS = require("aws-sdk");

AWS.config.update({
    region: process.env.DYNAMO_REGION,
    endpoint: process.env.DYNAMO_ENDPOINT
});

app.get('/', function (req, res) {
    res.send('Wow');
});

app.get('/users', function (req, res) {
	
});

app.get('/user/:userId', function (req, res) {
	var docClient = new AWS.DynamoDB.DocumentClient();
	var params = {
    	TableName: "users",
    	Key:{
        	"userid": req.params["userId"]
    	}
	};

	docClient.get(params, function(err, data) {
		if (err) {
		    res.send("Unable to read item. Error JSON:" + JSON.stringify(err, null, 2));
		} else {
	    	res.send("GetItem succeeded:" + JSON.stringify(data, null, 2));
		}
	});
});

app.listen(process.env.PORT, function () {
    console.log("Eventually server successfully started!");
});