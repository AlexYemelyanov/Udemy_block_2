'use strict';

const btns = document.getElementsByTagName('button'),
	wrapper = document.querySelector('.btn-block');

wrapper.addEventListener('click', (event) => {
	if (event.target && event.target.matches('button')) {
		console.log('hello');
	}
});

const btn = document.createElement('button');
btn.classList.add('red');
wrapper.append(btn);
