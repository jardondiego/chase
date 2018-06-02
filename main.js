const box = document.getElementById('box');
const gamesWonCounter = document.querySelector("#gamesWon");
const difficultySelect = document.getElementById("difficulty");
const unit = "px";
let gamesWon = 0;

window.onload = () => {

	box.style.top = 0; box.style.left = 0;

	let moveRand = () => {
		
		let maximumMovementRange = {
			get left () {
				let width = window.getComputedStyle(box).width.substring(0, window.getComputedStyle(box).width.length-2);
				let left = box.offsetLeft-box.style.width;
				let right = window.innerWidth-left;
				return (left <= right) ? left : right;
			},
			get top () {
				let height = window.getComputedStyle(box).height.substring(0, window.getComputedStyle(box).height.length-2);
				let top = box.offsetTop-height;
				let bottom = window.innerHeight-top;
				return (top <= bottom) ? top : bottom;
			}
		};

		let direction = (Math.floor(Math.random()*10) >= 5) ? 1 : -1;
		box.style.top = `${Math.floor(Math.random()*maximumMovementRange.top)*direction+unit}`;
		box.style.left = `${Math.floor(Math.random()*maximumMovementRange.left)*direction+unit}`;
	}

	difficultySelect.addEventListener("change", function (e) {
		box.style.transition = `all ${0.75/parseInt(e.target.value)}s linear`;
	});
	box.addEventListener('mouseover', moveRand)
	box.addEventListener('click', () => {
		alert("You've won!");

		// Reset box initial position
		box.style.top = 0+"px";
		box.style.left = 0+"px";

		gamesWon++;
		gamesWonCounter.innerHTML = gamesWon;
	});
}