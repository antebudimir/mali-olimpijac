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
const hamburger = document.querySelector('.hamburger'),
	faBars = document.querySelector('.fa-bars'),
	faTimes = document.querySelector('.fas.fa-times'),
	menu = document.querySelector('.menu'),
	bodyOverflow = document.querySelector('body');

if (window.innerWidth < 1024) {
	hamburger.addEventListener('click', () => {
		if (faBars.style.display === 'none') {
			faBars.style.display = 'block';
			faTimes.style.display = 'none';
			menu.style.display = 'none';
			bodyOverflow.style.overflow = 'auto';
		} else {
			faBars.style.display = 'none';
			faTimes.style.display = 'block';
			faTimes.style.color = 'red';
			menu.style.display = 'flex';
			menu.style.flexFlow = 'column nowrap';
			menu.style.justifyContent = 'center';
			menu.style.alignItems = 'center';
			bodyOverflow.style.overflow = 'hidden';
		}
	});

	// Close menu on outside click
	menu.addEventListener('click', () => {
		faBars.style.display = 'block';
		faTimes.style.display = 'none';
		menu.style.display = 'none';
		bodyOverflow.style.overflow = 'auto';
	});
}

// Remove the link buttons on desktop...
if (window.innerWidth > 1023 && document.querySelector('#home')) {
	const moreLinks = document.querySelectorAll('.more-link');

	for (let i = 0; i < moreLinks.length; i++) {
		const link = moreLinks[i];

		link.remove();
	}

	// ...and wrap the cards into link tags
	const gridContainer = document.querySelector('.section-frame.grid-container'),
		programCards = document.querySelectorAll('.program-card');

	programCards.forEach((card) => {
		let aTag = document.createElement('a');
		aTag.setAttribute('class', 'card-link');

		aTag.append(card);
		gridContainer.append(aTag);
	});

	aTag1 = document
		.querySelector('#programi > div > a:nth-child(1)')
		.setAttribute('href', 'mali-olimpijac.html');
	aTag2 = document
		.querySelector('#programi > div > a:nth-child(2)')
		.setAttribute('href', 'mali-avanturist.html');
	aTag3 = document
		.querySelector('#programi > div > a:nth-child(3)')
		.setAttribute('href', 'kondicijska-priprema.html');
	aTag4 = document
		.querySelector('#programi > div > a:nth-child(4)')
		.setAttribute('href', 'djecja-kineziterapija.html');
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
const tobii = new Tobii({
	zoom: false,
});

// Add underline to the active sub-menu item
const programMenuLinks = document.querySelectorAll('.program-menu-item a');

programMenuLinks.forEach((programMenuLink) => {
	if (programMenuLink.href === location.href) {
		programMenuLink.classList += 'active';
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

// Footer: current year
document.querySelector('#currentYear').innerText =
	new Date().getFullYear() + '.';
