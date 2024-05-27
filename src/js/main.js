window.addEventListener('DOMContentLoaded', () => {
	// Tabs
	const tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
		tabsContent.forEach((item) => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach((item) => {
			item.classList.remove('tabheader__item_active');
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;
		if (target && target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});

	// Timer

	const deadline = '2024-06-30';

	function getTimeRemaining(endtime) {
		let days, hours, minutes, seconds;
		const t = Date.parse(endtime) - Date.parse(new Date());

		if (t <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			(days = Math.floor(t / (1000 * 60 * 60 * 24))),
				(hours = Math.floor((t / (1000 * 60 * 60)) % 24)),
				(minutes = Math.floor((t / (1000 * 60)) % 60)),
				(seconds = Math.floor((t / 1000) % 60));
		}

		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timerInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timerInterval);
			}
		}
	}

	setClock('.timer', deadline);

	// Modal

	const modalOpen = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal');

	function showModal() {
		modal.classList.toggle('show');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}

	function closeModal() {
		modal.classList.toggle('show');
		document.body.style.overflow = '';
	}

	modalOpen.forEach((elem) => {
		elem.addEventListener('click', showModal);
	});

	modal.addEventListener('click', (e) => {
		if (e.target == modal || e.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(() => {}, 15000);

	function showModalByScroll() {
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight - 1
		) {
			showModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}

	window.addEventListener('scroll', showModalByScroll);

	// Menu

	class MenuItem {
		constructor(src, alt, subscr, descr, total, parent, ...classes) {
			this.src = src;
			this.alt = alt;
			this.subscr = subscr;
			this.descr = descr;
			this.classes = classes;
			this.parent = document.querySelector(parent);
			this.total = total;
			this.transfer = 27;
			this.changeToUAH();
		}

		changeToUAH() {
			this.total = this.total * this.transfer;
		}

		render() {
			const element = document.createElement('div');
			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach((className) => element.classList.add(className));
			}

			element.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.subscr}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.total}</span> грн/день</div>
          </div>
			`;
			this.parent.append(element);
		}
	}

	new MenuItem(
		'img/tabs/vegy.jpg',
		'vegy',
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		9,
		'.menu .container',
		'menu__item'
	).render();

	new MenuItem(
		'img/tabs/elite.jpg',
		'elite',
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		20,
		'.menu .container',
		'menu__item'
	).render();

	new MenuItem(
		'img/tabs/post.jpg',
		'post',
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		16,
		'.menu .container',
		'menu__item'
	).render();

	// Server

	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так...',
	};

	forms.forEach((item) => {
		postData(item);
	});

	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			let statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;

			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			const object = {};
			formData.forEach(function (value, key) {
				object[key] = value;
			});

			fetch('server.php', {
				method: 'POST',
				headers: {
					'Context-type': 'application/json',
				},
				body: JSON.stringify(object),
			})
				.then((data) => data.text)
				.then((data) => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				})
				.catch(() => {
					showThanksModal(message.failure);
				})
				.finally(() => {
					form.reset();
				});
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');

		showModal();

		const thankModal = document.createElement('div');
		thankModal.classList.add('modal__dialog');
		thankModal.innerHTML = `
				<div class="modal__content">
					<div class="modal__close" data-close>&times;</div>
					<div class="modal__title">${message}</div>
				</div>
		`;

		document.querySelector('.modal').append(thankModal);
		setTimeout(() => {
			thankModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal();
		}, 4000);
	}

	fetch('https://jsonplaceholder.typicode.com/todos/1')
		.then((response) => response.json())
		.then((json) => console.log(json));
});

// const films = [
// 	{
// 		name: 'Titanic',
// 		rating: 9,
// 	},
// 	{
// 		name: 'Die hard 5',
// 		rating: 5,
// 	},
// 	{
// 		name: 'Matrix',
// 		rating: 8,
// 	},
// 	{
// 		name: 'Some bad film',
// 		rating: 4,
// 	},
// ];

// function showGoodFilms(arr) {
// 	let newArr = [];
// 	arr.map((item) => {
// 		if (item.rating >= 8) {
// 			newArr.push(item);
// 		}
// 	});
// 	return console.log(newArr);
// }

// showGoodFilms(films);

// function showListOfFilms(arr) {
// 	let newStr = '';
// 	const arrFilms = arr.map((item) => item.name);
// 	newStr = arrFilms.join(', ');
// 	console.log(newStr);
// }

// showListOfFilms(films);

// function setFilmsIds(arr) {
// 	let i = 0;
// 	const newArr = arr.map((item) => {
// 		item.id = i;
// 		i++;
// 		return item;
// 	});
// 	return newArr;
// }

// const transformedArray = setFilmsIds(films);

// function checkFilms(arr) {
// 	let idArr = arr.map((item) => item.id);
// 	const result = idArr.every((item) => typeof item === 'number');
// 	return console.log(result);
// }

// checkFilms(transformedArray);

// const funds = [
// 	{ amount: -1400 },
// 	{ amount: 2400 },
// 	{ amount: -1000 },
// 	{ amount: 500 },
// 	{ amount: 10400 },
// 	{ amount: -11400 },
// ];

// const getPositiveIncomeAmount = (data) => {
// 	let result = 0;

// 	data.map((item) => {
// 		if (item.amount >= 0) {
// 			result += item.amount;
// 		}
// 		return result;
// 	});

// 	console.log(result);
// };

// getPositiveIncomeAmount(funds);

// const getTotalIncomeAmount = (data) => {
// 	let result = 0;

// 	const newArr = data.map((item) => item.amount);
// 	if (newArr.some((elem) => elem < 0)) {
// 		result = newArr.reduce((acc, curr) => acc + curr, 0);
// 	} else {
// 		getPositiveIncomeAmount(data);
// 	}
// };

// getTotalIncomeAmount(funds);
