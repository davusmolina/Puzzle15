//Importar los elementos html

const celdas = document.getElementsByClassName('celda');
const button = document.getElementById('button-restart');
let minutos = document.getElementById('minutos');
let segundos = document.getElementById('segundos');
let gif = document.getElementById('gif');

// Logica del juego

function generarAleatorios(min, max) {
	let randoms = [];

	while (randoms.length !== max) {
		let random = Math.floor(Math.random() * (max - min + 1) + min);

		if (!randoms.includes(random)) {
			randoms.push(random);
		}
	}
	return randoms;
}

function mover(i, array) {
	let id = parseInt(i);
	// Mover Arriba
	if (id > 3 && array[id - 4].innerText === '') {
		array[id - 4].innerText = array[id].innerText;
		array[id].innerText = '';
		array[id].style.background = 'rgb(106, 198, 184)';
		if (array[id - 4].innerText === array[id - 4].id) {
			array[id - 4].style.background = 'rgb(255, 196, 0)';
		} else {
			array[id - 4].style.background = 'rgb(106, 198, 184)';
		}
	}

	// Mover Abajo
	if (id < 12 && array[id + 4].innerText === '') {
		array[id + 4].innerText = array[id].innerText;
		array[id].innerText = '';
		array[id].style.background = 'rgb(106, 198, 184)';
		if (array[id + 4].innerText === array[id + 4].id) {
			array[id + 4].style.background = 'rgb(255, 196, 0)';
		} else {
			array[id + 4].style.background = 'rgb(106, 198, 184)';
		}
	}
	// Mover Izquierda
	if (id > 0 && array[id - 1].innerText === '') {
		array[id - 1].innerText = array[id].innerText;
		array[id].innerText = '';
		array[id].style.background = 'rgb(106, 198, 184)';
		if (array[id - 1].innerText === array[id - 1].id) {
			array[id - 1].style.background = 'rgb(255, 196, 0)';
		} else {
			array[id - 1].style.background = 'rgb(106, 198, 184)';
		}
	}
	// Mover Derecha
	if (id < 15 && array[id + 1].innerText === '') {
		array[id + 1].innerText = array[id].innerText;
		array[id].innerText = '';
		array[id].style.background = 'rgb(106, 198, 184)';
		if (array[id + 1].innerText === array[id + 1].id) {
			array[id + 1].style.background = 'rgb(255, 196, 0)';
		} else {
			array[id + 1].style.background = 'rgb(106, 198, 184)';
		}
	}
}

function definirValor() {
	let randoms = generarAleatorios(1, 15);
	for (const i in celdas) {
		if (i < 15) {
			celdas[i].innerText = randoms[i];
			celdas[i].style.background = 'rgb(106, 198, 184)';
		}
		if (i == 15) {
			celdas[i].innerText = '';
			celdas[i].style.background = 'rgb(106, 198, 184)';
		}
	}
	disminuyendo(300);
}
definirValor();

function agregarMovimiento() {
	for (const i in celdas) {
		if (i < 16) {
			celdas[i].addEventListener('click', () => {
				mover(i, celdas);
			});
		}
	}
}
agregarMovimiento();

//Agregar cuenta atras

var disminuirGlobal;

function disminuyendo(time) {
	let disminuir = setInterval(() => {
		time -= 1;
		segundos.innerText = ('0' + Math.floor(time % 60)).slice(-2);
		minutos.innerText = ('0' + Math.floor((time / 60) % 60)).slice(-2);
		if (parseInt(time) < 1) {
			clearInterval(disminuir);
			gif.setAttribute('src', './game-over.webp');
			gif.style.display = 'block';
		}
	}, 1000);
	disminuirGlobal = disminuir;
}

//Reiniciar juego

function reiniciar() {
	clearInterval(disminuirGlobal);
	definirValor();
	gif.style.display = 'none';
}
button.addEventListener('click', reiniciar);

//Funcion para cuando se resuelve el puzzle

let ganar = setInterval(() => {
	let sumaInnerText = [];
	if (
		celdas[11].innerText === '12' &&
		celdas[12].innerText === '13' &&
		celdas[13].innerText === '14' &&
		celdas[14].innerText === '15'
	) {
		for (const i in celdas) {
			sumaInnerText.push(celdas[i].innerText);
		}
		if (
			sumaInnerText.join('') ===
			sumaInnerText
				.sort(function compareNumbers(a, b) {
					return a - b;
				})
				.join('')
		) {
			clearInterval(ganar);
			gif.setAttribute('src', './bien-hecho.webp');
			gif.style.display = 'block';
			setTimeout(() => {
				alert('has ganado');
			}, 1000);
		}
	}
}, 2000);
