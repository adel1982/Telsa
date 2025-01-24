import { updateTotalPrice } from './priceCalculator.js';
import { initializeEventListeners } from './handlers.js';

document.addEventListener('DOMContentLoaded', () => {
    updateTotalPrice();
    initializeEventListeners();
});