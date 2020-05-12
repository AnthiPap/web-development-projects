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
	const url = "https://us18.api.mailchimp.com/3.0/Lists/d5b8f1e010"
	const options = {
		method: "POST",
		auth:"anpa:a9a24ece91a3f7b4faff4fe4827d39b4-us18"
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
