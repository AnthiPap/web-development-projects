const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

const articleSchema = {
	title: String,
	content: String
};

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
.get(function(req,res) {
	Article.find(function(err,foundArticles){
		if(!err) {
			res.send(foundArticles);
		} else {
			res.send(err);
		}
	});
})

.post(function(req,res) {
	const title = req.body.title;
	const content = req.body.content;

	const newArticle = new Article ({
		title: title,
		content: content
	});

	newArticle.save(function(err) {
		if (!err) {
			res.send("Article saved.");
		} else {
			res.send(err);
		}
	});
})

.delete(function(req,res) {
	Article.deleteMany({}, function(err) {
		if (!err) {
			res.send("Deleted all articles.");
		} else {
			res.send(err);
		}
	});
});

app.route("/articles/:articleTitle")
.get(function(req,res) {
	const reqTitle = req.params.articleTitle;
	Article.findOne({title: reqTitle}, function(err, foundArticle){
		if (!err) {
			res.send(foundArticle); 
		} else {
			res.send(err);
		}
	});
})
.put(function(req,res) {
	const reqTitle = req.params.articleTitle;
	Article.update(
		{title: reqTitle},
		{title: req.body.title, content: req.body.content}, 
		{overwrite:true}, function(err,updatedArticle) {
			if (!err) {
				res.send(updatedArticle);
			} else {
				res.send(err);
			}
		})
})
.patch(function(req,res) {
	const reqTitle = req.params.articleTitle;
	Article.update(
		{title: reqTitle},
		{$set: req.body},
		function(err) {
			if (!err) {
				res.send("Updated article");
			} else {
				res.send(err);
			}
		}
		)
})
.delete(function(req,res) {
	const reqTitle = req.params.articleTitle;
	Article.deleteOne({title:reqTitle}, function(err) {
		if (!err) {
			res.send("Article with name '" + reqTitle +"' is deleted.");
		} else {
			res.send(err);
		}
	})
});

app.listen(3000, function() {
	console.log("Server started on port 3000");
});