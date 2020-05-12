const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res) {
	res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const userEmail = req.body.userEmail;

	const data = {
		members: [
		{
			email_address: userEmail,
			status: "subscribed",
			merge_fields: {
				FNAME: firstName,
				LNAME: lastName
				}
			}
		]
	};

	const jsonData = JSON.stringify(data);
	const url = "https://us1X.api.mailchimp.com/3.0/Lists/LIST_ID"
	const options = {
		method: "POST",
		auth:"USER_NAME:API_KEY"
	}

	const request = https.request(url, options, function(response){
		if (response.statusCode === 200) {
			res.sendFile(__dirname + "/success.html");
		} else {
			res.sendFile(__dirname + "/failure.html");
		}
	})
	request.write(jsonData);
	request.end();
})

app.post("/failure", function(req, res) {
	res.redirect("/");
})


app.listen(process.env.PORT || 3000, function() {
	console.log("Server is running on port 3000");
})
