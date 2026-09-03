const servingsDisplay = document.querySelector('#servings');
const servingButtons = document.querySelectorAll('[data-action]');
const ingredientAmounts = document.querySelectorAll('[data-amount]');
const saveButton = document.querySelector('.save-button');

let servings = 10;

function formatAmount(amount) {
	const value = amount * servings / 10;
	if (Number.isInteger(value)) return String(value);
	if (value === 0.5) return '½';
	if (value === 1.5) return '1½';
	if (value === 2.5) return '2½';
	return value.toFixed(1).replace('.0', '').replace('.', '½');
}

function updateServings() {
	servingsDisplay.textContent = servings;
	ingredientAmounts.forEach((amount) => {
		amount.textContent = formatAmount(Number(amount.dataset.amount));
	});
}

servingButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const change = button.dataset.action === 'increase' ? 2 : -2;
		servings = Math.max(2, Math.min(20, servings + change));
		updateServings();
	});
});

saveButton.addEventListener('click', () => {
	const isSaved = saveButton.classList.toggle('saved');
	saveButton.setAttribute('aria-pressed', String(isSaved));
	saveButton.innerHTML = `<span aria-hidden="true">${isSaved ? '♥' : '♡'}</span> ${isSaved ? 'Receita salva' : 'Salvar receita'}`;
});
