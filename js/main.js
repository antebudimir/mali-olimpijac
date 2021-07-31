// Register SW
if ('serviceWorker' in navigator) {
	//register our service worker
	navigator.serviceWorker
		.register('/sw.js', {
			updateViaCache: 'none',
			scope: '/',
		})
		.then(() => {
			//finished registering
		})
		.catch((err) => {
			console.warn('Failed to register', err.message);
		});

	//listen for messages
	navigator.serviceWorker.addEventListener('message', ({ data }) => {
		//received a message from the service worker
		console.log(data, 'message from service worker');
	});
}

// SYNC
async function registerPeriodicCheck() {
	const registration = await navigator.serviceWorker.ready;
	try {
		await registration.periodicSync.register('latest-update', {
			minInterval: 24 * 60 * 60 * 1000,
		});
	} catch {
		console.log('Periodic Sync could not be registered!');
	}
}

navigator.serviceWorker.ready.then((registration) => {
	registration.periodicSync.getTags().then((tags) => {
		if (tags.includes('latest-update')) skipDownloadingLatestUpdateOnPageLoad();
	});
});

// Hamburger
if (window.innerWidth < 1024) {
	const hamburger = document.querySelector('#hamburger'),
		menu = document.querySelector('.menu'),
		icon = document.querySelector('#menu-icon'),
		body = document.querySelector('body');

	hamburger.addEventListener('click', () => {
		if (menu.style.display === 'none' || menu.style.display === '') {
			setTimeout(() => {
				menu.style.display = 'flex';
				menu.style.flexFlow = 'column nowrap';
				menu.style.justifyContent = 'center';
				menu.style.alignItems = 'center';
				menu.style.animation = 'slideIn 500ms ease-in';
			}, 1);

			hamburger.style.top = '1.75rem';
			icon.classList.remove('fa-bars');
			icon.classList.add('fa-times');
			icon.style.color = 'rgb(255, 30, 0)';
			icon.style.transition = 'color 300ms ease-in';
			body.style.overflow = 'hidden';
		} else {
			slideOut();
		}
	});

	// Outside click
	menu.addEventListener('click', () => {
		slideOut();
	});

	function slideOut() {
		menu.style.animation = 'slideOut 350ms ease-in';
		setTimeout(() => {
			menu.style.display = 'none';
		}, 300);

		hamburger.style.top = '1.8rem';
		icon.classList.remove('fa-times');
		icon.classList.add('fa-bars');
		icon.style.color = 'rgb(46, 136, 163)';
		body.style.overflow = 'unset';
	}
}

// Remove the link buttons on desktop...
if (window.innerWidth > 1023 && document.querySelector('#home')) {
	const moreLinks = document.querySelectorAll('.more-link');

	for (let i = 0; i < moreLinks.length; i++) {
		const link = moreLinks[i];

		link.remove();
	}

	// ...and wrap the cards into links
	const gridContainer = document.querySelector('.section-frame.grid-container'),
		programCards = document.querySelectorAll('.program-card');

	programCards.forEach((card) => {
		const cardLink = document.createElement('a');
		cardLink.setAttribute('class', 'card-link');

		cardLink.append(card);
		gridContainer.append(cardLink);
	});

	const cardLink1 = document.querySelector('.card-link:first-child');
	cardLink1.setAttribute('href', 'mali-olimpijac.html');
	cardLink1.setAttribute('title', 'Program "Mali olimpijac"');

	const cardLink2 = document.querySelector('.card-link:nth-of-type(2)');
	cardLink2.setAttribute('href', 'mali-avanturist.html');
	cardLink2.setAttribute('title', 'Program "Mali avanturist"');

	const cardLink3 = document.querySelector('.card-link:nth-of-type(3)');
	cardLink3.setAttribute('href', 'kondicijska-priprema.html');
	cardLink3.setAttribute('title', 'Program "Kondicijska priprema"');

	const cardLink4 = document.querySelector('.card-link:last-child');
	cardLink4.setAttribute('href', 'djecja-kineziterapija.html');
	cardLink4.setAttribute('title', 'Program "Dječja kineziterapija"');
}

// Gallery filter
const buttons = document.querySelectorAll('.filter-btn'),
	placeholders = document.querySelectorAll('.placeholder');

buttons.forEach((button) => {
	button.addEventListener('click', () => {
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].classList.remove('active');
		}
		button.classList.add('active');

		placeholders.forEach((placeholder) => {
			placeholder.style.display = 'none';
			let filterName = button.textContent;

			if (
				placeholder.getAttribute('data-filters') === filterName ||
				filterName === 'Sve'
			) {
				placeholder.style.display = 'block';
			}
		});
	});
});

// Initialize tobii lightbox
const home = document.querySelector('#home');

if (document.body === home) {
	const tobii = new Tobii({
		zoom: false,
	});
}

// Add underline to the active sub-menu item
const programMenuLinks = document.querySelectorAll('.program-menu-link');

programMenuLinks.forEach((programMenuLink) => {
	if (programMenuLink.href === location.href) {
		programMenuLink.classList += ' active';
	}
});

// SCROLL back to top button
const scrollToTop = document.querySelector('.scrollButton');

window.addEventListener('scroll', () => {
	if (
		document.body.scrollTop > 500 ||
		document.documentElement.scrollTop > 500
	) {
		scrollToTop.style.display = 'block';
	} else {
		scrollToTop.style.display = 'none';
	}
});

scrollToTop.addEventListener('click', () => {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
});

// Date
const currentYear = document.querySelector('#currentYear');
currentYear.innerText = new Date().getFullYear() + '.';
