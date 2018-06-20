const box = document.getElementById('box');
const gamesWonCounter = document.getElementById('gamesWon');
const difficultySelect = document.getElementById('difficulty');
const winScreen = document.getElementById('winScreen');
const closeWinScreen = document.getElementById('closeWinScreen');
const unit = 'px';

let touchMode = false;
let gamesWon = 0;

function showWinScreen () {
	winScreen.classList.toggle('is-hidden');
}

// Resets box initial state
function reset () {
	box.style.left = '0px';
	box.style.top = '0px';
	box.style.backgroundColor = 'black';
}

function moveRandom (el) {

	let maximumMovementRange = {
		get left () {
			let width = window.getComputedStyle(el).width.substring(0, window.getComputedStyle(el).width.length-2);
			let left = el.offsetLeft-el.style.width;
			let right = window.innerWidth-left;
			return (left <= right) ? left : right;
		},
		get top () {
			let height = window.getComputedStyle(el).height.substring(0, window.getComputedStyle(el).height.length-2);
			let top = el.offsetTop-height;
			let bottom = window.innerHeight-top;
			return (top <= bottom) ? top : bottom;
		}
	};

	let direction = (Math.floor(Math.random*10) >= 5) ? 1 : -1;

	el.style.top = `${Math.floor(Math.random()*maximumMovementRange.top)*direction+unit}`;
	el.style.left = `${Math.floor(Math.random()*maximumMovementRange.left)*direction+unit}`;
	el.style.backgroundColor = `hsl(${Math.floor(Math.random()*360)}, 100%, 50%)`;
}

window.onload = () => {
	// On touch devices, just start moving randomly
	if (touchMode) {
		let pid = setInterval(moveRand, (0.75/4)*1000);
	}

	difficultySelect.addEventListener('change', function (e) {
		box.style.transition = `all ${0.75/parseInt(e.target.value)}s linear`;
	})

	box.addEventListener('mouseover', () => {
		moveRandom(box);
	})

	box.addEventListener('click', () => {
		// Win Screen
		showWinScreen();

		// Reset box state and update win counter
		reset();
		gamesWon++;
		gamesWonCounter.innerText = gamesWon;
	});

}

closeWinScreen.addEventListener('click', function () {
	winScreen.classList.toggle('is-hidden')
});

window.onresize = reset;