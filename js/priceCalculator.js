import { basePrice, pricing } from './mapping.js';
import { totalPriceElement, downPaymentElement, monthlyPaymentElement, accessoryCheckboxes } from './const.js';

const formatPrice = (price) => `$${price.toLocaleString()}`;

let currentPrice = basePrice;

export let selectedOptions = {
    'Modèle Performance': false,
    'Performance Plus': false,
    'Ajouter la conduite autonome': false,
};

// Ajout de l'attribut aria-live pour améliorer l'accessibilité
totalPriceElement.setAttribute("aria-live", "polite");
downPaymentElement.setAttribute("aria-live", "polite");
monthlyPaymentElement.setAttribute("aria-live", "polite");

export const updateTotalPrice = () => {
    currentPrice = basePrice;

    // Ajout des options Performance & Self-Driving
    if (selectedOptions['Modèle Performance']) currentPrice += pricing['Modèle Performance'];
    if (selectedOptions['Performance Plus']) currentPrice += pricing['Performance Plus'];
    if (selectedOptions['Ajouter la conduite autonome']) currentPrice += pricing['Ajouter la conduite autonome'];

    accessoryCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const accessoryLabel = checkbox.closest('label').querySelector('span.accessory-name').textContent.trim();
            const accessoryPrice = pricing['Accessoires'][accessoryLabel];

            if (accessoryPrice) {
                console.log(`Ajout de l'accessoire : ${accessoryLabel} - Prix : ${accessoryPrice}`);
                currentPrice += accessoryPrice;
            } else {
                console.warn(`Prix non trouvé pour : ${accessoryLabel}`);
            }
        }
    });

    totalPriceElement.textContent = formatPrice(currentPrice);

    updatePaymentBreakdown();
};

const updatePaymentBreakdown = () => {
    const downPayment = currentPrice * 0.1; // 10% d'acompte
    downPaymentElement.textContent = formatPrice(downPayment);

    const loanTermMonths = 60;
    const interestRate = 0.03;
    const loanAmount = currentPrice - downPayment;

    const monthlyInterestRate = interestRate / 12;
    const monthlyPayment =
        (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths))) /
        (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);

    monthlyPaymentElement.textContent = formatPrice(parseFloat(monthlyPayment.toFixed(2)));
};
