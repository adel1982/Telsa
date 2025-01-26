import { basePrice, pricing } from './mapping.js';
import { totalPriceElement, downPaymentElement, monthlyPaymentElement, accessoryCheckboxes } from './const.js';

const formatPrice = (price) => `$${price.toLocaleString()}`;

let currentPrice = basePrice;
export let selectedOptions = {
    'Performance Wheels': false,
    'Performance Package': false,
    'Full Self-Driving': false,
};

totalPriceElement.setAttribute("aria-live", "polite");
downPaymentElement.setAttribute("aria-live", "polite");
monthlyPaymentElement.setAttribute("aria-live", "polite");

export const updateTotalPrice = () => {
    currentPrice = basePrice;

    if (selectedOptions['Performance Wheels']) currentPrice += pricing['Performance Wheels'];
    if (selectedOptions['Performance Package']) currentPrice += pricing['Performance Package'];
    if (selectedOptions['Full Self-Driving']) currentPrice += pricing['Full Self-Driving'];

    accessoryCheckboxes.forEach(checkbox => {
        const accessoryLabel = checkbox.closest('label').querySelector('span').textContent.trim();
        const accessoryPrice = pricing['Accessories'][accessoryLabel];

        if (checkbox.checked) {
            currentPrice += accessoryPrice;
            checkbox.setAttribute("aria-checked", "true"); 
        } else {
            checkbox.setAttribute("aria-checked", "false");
        }
    });

    totalPriceElement.textContent = formatPrice(currentPrice);
    updatePaymentBreakdown();
};

const updatePaymentBreakdown = () => {
    const downPayment = currentPrice * 0.1;
    downPaymentElement.textContent = formatPrice(downPayment);

    const loanTermMonths = 60;
    const interestRate = 0.03;
    const loanAmount = currentPrice - downPayment;

    const monthlyInterestRate = interestRate / 12;
    const monthlyPayment =
        (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths))) /
        (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);

    monthlyPaymentElement.textContent = formatPrice(monthlyPayment.toFixed(2));
};

