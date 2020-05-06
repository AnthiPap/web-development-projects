var randomNumberOne = Math.floor(Math.random() * 6) + 1 
var newImageOne = "images/dice"+randomNumberOne+".png";

document.querySelectorAll("img")[0].setAttribute("src", newImageOne);

var randomNumberTwo = Math.floor(Math.random() * 6) + 1 
var newImageTwo = "images/dice"+randomNumberTwo+".png";

document.querySelectorAll("img")[1].setAttribute("src", newImageTwo);

if (randomNumberOne > randomNumberTwo) {
	document.querySelector("h1").innerHTML = "🔥 Player 1 Wins!";
} else if (randomNumberTwo > randomNumberOne) {
	document.querySelector("h1").innerHTML = "🔥 Player 2 Wins!";
} else {
	document.querySelector("h1").innerHTML = "🎲 Draw!";
}