import { exteriorImage, interiorImage, exteriorColorSection, interiorColorSection, wheelButtonsSection, performanceBtn, fullSelfDrivingCheckbox, accessoryCheckboxes, topBar } from './const.js';
import { exteriorImages, interiorImages } from './mapping.js';
import { selectedOptions, updateTotalPrice } from './priceCalculator.js';

let selectedColor = 'Stealth Grey';

const handleScroll = () => {
    const atTop = window.scrollY === 0;
    topBar.classList.toggle('visible-bar', atTop);
    topBar.classList.toggle('hidden-bar', !atTop);
};

const handleColorButtonClick = (event) => {
    let button = event.target.tagName === 'IMG' ? event.target.closest('button') : event.target;

    if (button) {
        const buttons = event.currentTarget.querySelectorAll('button');
        buttons.forEach(btn => btn.classList.remove('btn-selected'));
        button.classList.add('btn-selected');

        if (event.currentTarget === exteriorColorSection) {
            selectedColor = button.querySelector('img').alt;
            updateExteriorImage();
        }

        if (event.currentTarget === interiorColorSection) {
            const color = button.querySelector('img').alt;
            const { src, alt, ariaLabel } = interiorImages[color]; 
            interiorImage.src = src;
            interiorImage.alt = alt;
            interiorImage.setAttribute("aria-label", ariaLabel);
        }
    }
};

const updateExteriorImage = () => {
    const performanceSuffix = selectedOptions['Performance Wheels'] ? '-performance' : '';
    const colorKey = selectedColor in exteriorImages ? selectedColor : 'Stealth Grey';

    const { src, alt, ariaLabel } = exteriorImages[colorKey]; // Extraction des données
    exteriorImage.src = src.replace('.jpg', `${performanceSuffix}.jpg`); // Appliquer le suffixe
    exteriorImage.alt = alt;
    exteriorImage.setAttribute("aria-label", ariaLabel);
};


const handleWheelButtonClick = (event) => {
    if (event.target.tagName === 'BUTTON') {
        const buttons = document.querySelectorAll('#wheel-buttons button');
        buttons.forEach(btn => btn.classList.remove('bg-gray-700', 'text-white'));

        event.target.classList.add('bg-gray-700', 'text-white');
        selectedOptions['Performance Wheels'] = event.target.textContent.includes('Performance');

        updateExteriorImage();
        updateTotalPrice();
    }
};

const handlePerformanceButtonClick = () => {
    const isSelected = performanceBtn.classList.toggle('bg-gray-700');
    performanceBtn.classList.toggle('text-white');

    selectedOptions['Performance Package'] = isSelected;
    updateTotalPrice();
};

const fullSelfDrivingChange = () => {
    selectedOptions['Full Self-Driving'] = fullSelfDrivingCheckbox.checked;
    fullSelfDrivingCheckbox.setAttribute("aria-checked", fullSelfDrivingCheckbox.checked ? "true" : "false"); 
    updateTotalPrice();
};

export const initializeEventListeners = () => {
    window.addEventListener('scroll', () => requestAnimationFrame(handleScroll));

    exteriorColorSection.addEventListener('click', handleColorButtonClick);
    interiorColorSection.addEventListener('click', handleColorButtonClick);
    wheelButtonsSection.addEventListener('click', handleWheelButtonClick);

    performanceBtn.addEventListener('click', () => {
        const isSelected = performanceBtn.classList.toggle("btn-selected");
        performanceBtn.setAttribute("aria-pressed", isSelected ? "true" : "false"); 
        handlePerformanceButtonClick();
    });

    fullSelfDrivingCheckbox.addEventListener('change', fullSelfDrivingChange);

    accessoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            checkbox.setAttribute("aria-checked", checkbox.checked ? "true" : "false"); 
            updateTotalPrice();
        });
    });
};