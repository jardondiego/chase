const unit = "px";
const box = document.getElementById('box');
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

	box.addEventListener('mouseover', moveRand)
	box.addEventListener('click', () => {
		// Reset box initial position
		box.style.top = 0+"px";
		box.style.left = 0+"px";

		gamesWon++;
		let gamesWonCounter = document.querySelector("#gamesWon");
		
		if (gamesWonCounter) {
			gamesWonCounter.removeChild(gamesWonCounter.firstChild);
			gamesWonCounter.innerHTML = gamesWon;
		}
	});
}