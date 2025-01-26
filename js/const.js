export const topBar = document.querySelector('#top-bar');
topBar.setAttribute("aria-live", "polite");

export const exteriorColorSection = document.querySelector('#exterior-buttons');
exteriorColorSection.setAttribute("aria-labelledby", "exterior-color-label");

export const interiorColorSection = document.querySelector('#interior-buttons');
interiorColorSection.setAttribute("aria-labelledby", "interior-color-label");

export const exteriorImage = document.querySelector('#exterior-image');
exteriorImage.setAttribute("aria-labelledby", "image-section-title");

export const interiorImage = document.querySelector('#interior-image');
interiorImage.setAttribute("aria-labelledby", "image-section-title");

export const wheelButtonsSection = document.querySelector('#wheel-buttons');
wheelButtonsSection.setAttribute("aria-labelledby", "wheel-buttons-label");

export const performanceBtn = document.querySelector('#performance-btn');
performanceBtn.setAttribute("aria-describedby", "performance-cost");

export const totalPriceElement = document.querySelector('#total-price');
totalPriceElement.setAttribute("aria-live", "polite"); 

export const fullSelfDrivingCheckbox = document.querySelector('#full-self-driving-checkbox');
fullSelfDrivingCheckbox.setAttribute("aria-checked", fullSelfDrivingCheckbox.checked ? "true" : "false");

export const accessoryCheckboxes = document.querySelectorAll('.accessory-form-checkbox');
accessoryCheckboxes.forEach(checkbox => {
    checkbox.setAttribute("aria-checked", checkbox.checked ? "true" : "false");
});

export const downPaymentElement = document.querySelector('#down-payment');
downPaymentElement.setAttribute("aria-live", "polite"); 

export const monthlyPaymentElement = document.querySelector('#monthly-payment');
monthlyPaymentElement.setAttribute("aria-live", "polite"); 
