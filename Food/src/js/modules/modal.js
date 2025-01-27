function modal() {
	// Modal

	const modalOpen = document.querySelectorAll('[data-modal]'),
		modal = document.querySelector('.modal'),
		closeBtn = modal.querySelector('[data-close]');

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
		if (e.target === closeBtn) {
			closeModal();
		}
		if (e.target == modal) {
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
}

module.exports = modal;
