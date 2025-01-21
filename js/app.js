const topBar = document.querySelector('#top-bar');
const exteriorColorSection = document.querySelector('#exterior-buttons');
const interiorColorSection = document.querySelector('#interior-buttons');
const exteriorImage = document.querySelector('#exterior-image');
const interiorImage = document.querySelector('#interior-image');
const wheelButtonsSection = document.querySelector('#wheel-buttons');

let selectedColor = 'Stealth Grey';
const selectedOptions = {
    'Performance Wheels': false,
    'Performance Package': false,
    'Full Self-Drving': false,
};

// Handle Top Bar on Scroll
const handleScroll = () => {
    const atTop = window.scrollY === 0;
    topBar.classList.toggle('visible-bar', atTop);
    topBar.classList.toggle('hidden-bar', !atTop);
}

// Image Mapping
const exteriorImages = {
    'Stealth Grey': '../img/model/model-y-stealth-grey.jpg',
    'Pearl White': '../img/model/model-y-pearl-white.jpg',
    'Deep Blue': '../img/model/model-y-deep-blue-metallic.jpg',
    'Solid Black': '../img/model/model-y-solid-black.jpg',
    'Ultra Red': '../img/model/model-y-ultra-red.jpg',
    'Quicksilver': '../img/model/model-y-quicksilver.jpg',
}

const interiorImages = {
    'Dark': '../img/model/model-y-interior-dark.jpg',
    'Light': '../img/model/model-y-interior-light.jpg',
}

// Handle Color Selection
const handleColorButtonClick = (event) => {
    let button;

    if(event.target.tagName === 'IMG') {
        button = event.target.closest('button');
    } else if (event.target.tagName === 'BUTTON') {
        button = event.target
    }

    if (button) {
        const buttons = event.currentTarget.querySelectorAll('button');
        buttons.forEach((btn) => btn.classList.remove('btn-selected'));
        button.classList.add('btn-selected');

        // Change exterior image
        if (event.currentTarget === exteriorColorSection) {
            const color = button.querySelector('img').alt;
            exteriorImage.src = exteriorImages[color];
        }

        // Change interior image
        if (event.currentTarget === interiorColorSection) {
            const color = button.querySelector('img').alt;
            interiorImage.src = interiorImages[color];
        }
    }
}

// Upadate exterior image based on color and wheels
const updateExteriorImage = () => {
    const performanceSuffix = selectedOptions['Performance Wheels'] ? '-performance' : ''
    const colorKey = selectedColor in exteriorImages ? selectedColor : 'Stealth Grey';
    exteriorImage.src = exteriorImages[colorKey].replace('.jpg', `${performanceSuffix}.jpg` )
}

// Wheel Selection
const handleWheelButtonClick = (event) => {
    if (event.target.tagName === 'BUTTON') {
        const buttons = document.querySelectorAll('#wheel-buttons button');
        buttons.forEach((btn) => btn.classList.remove('bg-gray-700','text-white'));

        // Add selected styles to clicked button
        event.target.classList.add('bg-gray-700', 'text-white');

        const selectedWheel = event.target.textContent.includes('Performances');

        exteriorImage.src = selectedWheel ? '../img/model/model-y-stealth-grey-performance.jpg' : '../img/model/model-y-stealth-grey.jpg'
    }
}

// Event Listeners
window.addEventListener('scroll', () => requestAnimationFrame(handleScroll))
exteriorColorSection.addEventListener('click', handleColorButtonClick)
interiorColorSection.addEventListener('click', handleColorButtonClick)
wheelButtonsSection.addEventListener('click', handleWheelButtonClick)