import { updateTotalPrice } from './priceCalculator.js';
import { initializeEventListeners } from './handlers.js';

document.addEventListener('DOMContentLoaded', () => {
    updateTotalPrice();
    initializeEventListeners();

    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.setAttribute("tabindex", "-1"); 
        mainContent.focus();
    }
});
