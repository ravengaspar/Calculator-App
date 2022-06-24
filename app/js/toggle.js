const radioList = document.querySelector('[role="radiogroup"]');
const radios = radioList.querySelectorAll('[role="radio"]');
const bodyEl = document.querySelector('body');

const getCSSCustomProp = (propKey) => {
	let response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

	if (response.length) {
		response = response.replace(/\"/g, '').trim();
	}

	return response;
};

const setTheme = () => {
	localStorage.setItem('--color-mode', theme);
};

const setColorMode = () => {
	let currentSetting = localStorage.getItem('--color-mode');

	currentSetting === null ? (currentSetting = getCSSCustomProp('--color-mode')) : 'dark';

	localStorage.setItem('--color-mode', currentSetting);

	bodyEl.removeAttribute('class');
	bodyEl.classList.add(currentSetting);
	document.getElementById(currentSetting).click();
};

setColorMode();

let tabFocus = 0;

radios.forEach((radio) =>
	radio.addEventListener('click', (e) => {
		radios.forEach((radio) => radio.setAttribute('tabindex', -1));
		theme = e.target.getAttribute('id');
		radio.setAttribute('aria-checked', 'true');
		radio.setAttribute('aria-selected', 'true');
		bodyEl.removeAttribute('class');
		bodyEl.classList.add(theme);
		radio.setAttribute('tabindex', 0);
		localStorage.setItem('--color-mode', theme);
	})
);

radioList.addEventListener('keydown', (e) => {
	const keydownLeft = 37;
	const keydownRight = 39;
	const keydownUp = 38;
	const keydownDown = 40;

	// change the tabindex of the current tab to -1
	if (
		e.keyCode === keydownLeft ||
		e.keyCode === keydownRight ||
		e.keyCode === keydownUp ||
		e.keyCode === keydownDown
	) {
		radios[tabFocus].setAttribute('tabindex', -1);
		radios[tabFocus].setAttribute('aria-checked', 'false');
		radios[tabFocus].setAttribute('aria-selected', 'false');
		bodyEl.removeAttribute('class');
	}

	// if the right key is pushed, move to the next tab to the right
	if (e.keyCode === keydownRight || e.keyCode === keydownUp) {
		e.preventDefault();
		tabFocus++;
		if (tabFocus >= radios.length) {
			tabFocus = 0;
		}
	}
	if (e.keyCode === keydownLeft || e.keyCode === keydownDown) {
		e.preventDefault();
		tabFocus--;
		if (tabFocus < 0) {
			tabFocus = radios.length - 1;
		}
	}

	const theme = radios[tabFocus].getAttribute('id');

	radios[tabFocus].setAttribute('tabindex', 0);
	radios[tabFocus].setAttribute('aria-checked', 'true');
	radios[tabFocus].setAttribute('aria-selected', 'true');
	setTheme();
	bodyEl.classList.add(theme);
	radios[tabFocus].focus();
	radios[tabFocus].click();
});
