import { 
    exteriorImage, interiorImage, exteriorColorSection, 
    interiorColorSection, wheelButtonsSection, performanceBtn, 
    fullSelfDrivingCheckbox, accessoryCheckboxes, topBar 
} from './const.js';

import { exteriorImages, interiorImages } from './mapping.js';
import { selectedOptions, updateTotalPrice } from './priceCalculator.js';

let selectedColor = 'Stealth Grey';

const handleScroll = () => {
    const atTop = window.scrollY === 0;
    topBar.classList.toggle('visible-bar', atTop);
    topBar.classList.toggle('hidden-bar', !atTop);
};

const handleColorButtonClick = (event) => {
    let button = event.target.closest('button');

    if (!button) return;

    const buttons = event.currentTarget.querySelectorAll('button');
    buttons.forEach(btn => btn.classList.remove('btn-selected'));
    button.classList.add('btn-selected');

    if (event.currentTarget === exteriorColorSection) {
        selectedColor = button.querySelector('img').alt;
        updateExteriorImage();
    } else if (event.currentTarget === interiorColorSection) {
        const color = button.querySelector('img').alt;
        if (interiorImages[color]) {
            const { src, alt, ariaLabel } = interiorImages[color]; 
            interiorImage.src = src;
            interiorImage.alt = alt;
            interiorImage.setAttribute("aria-label", ariaLabel);
        }
    }
};

const updateExteriorImage = () => {
    const performanceSuffix = selectedOptions['Performance Wheels'] ? '-performance' : '';
    const colorKey = exteriorImages[selectedColor] ? selectedColor : 'Stealth Grey';

    if (exteriorImages[colorKey]) {
        const { src, alt, ariaLabel } = exteriorImages[colorKey];
        exteriorImage.src = src.replace('.jpg', `${performanceSuffix}.jpg`);
        exteriorImage.alt = alt;
        exteriorImage.setAttribute("aria-label", ariaLabel);
    }
};

const handleWheelButtonClick = (event) => {
    if (event.target.tagName !== 'BUTTON') return;

    const buttons = document.querySelectorAll('#wheel-buttons button');
    buttons.forEach(btn => btn.classList.remove('bg-gray-700', 'text-white'));

    event.target.classList.add('bg-gray-700', 'text-white');
    selectedOptions['Performance Wheels'] = event.target.textContent.includes('Performance');

    updateExteriorImage();
    updateTotalPrice();
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

// ✅ Correction des checkboxes accessoires pour s'assurer qu'elles fonctionnent bien
const handleAccessoryCheckboxChange = (event) => {
    const checkbox = event.currentTarget;
    if (!checkbox) return;

    checkbox.setAttribute("aria-checked", checkbox.checked ? "true" : "false"); 

    // 🔥 Mise à jour de l'affichage du SVG (coché/décoché)
    const svgCheck = checkbox.closest('.label-cbx').querySelector('.checkbox svg');
    if (svgCheck) {
        svgCheck.classList.toggle('hidden', !checkbox.checked);
    }

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
        checkbox.addEventListener('change', handleAccessoryCheckboxChange);
    });
};
