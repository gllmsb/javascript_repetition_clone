// //*CAT FACT GENERATOR
async function fetchCatFact() {
    try {
        const response = await fetch('https://meowfacts.herokuapp.com/');
        const data = await response.json();
        return data.data[0];
    } catch (error) {
        console.error("Error fetching cat fact", error);
        return "Failed to fetch a cat Fact. Please try again.";
    }
}

async function displayCatFact(cardId) {
    const fact = await fetchCatFact();
    document.getElementById(cardId).textContent = fact;
}

document.getElementById('card-1').addEventListener('click', () => displayCatFact('card-1'));
document.getElementById('card-2').addEventListener('click', () => displayCatFact('card-2'));
document.getElementById('card-3').addEventListener('click', () => displayCatFact('card-3'));

document.getElementById('generate-btn').addEventListener('click', async () => {
    await displayCatFact('card-1');
    await displayCatFact('card-2');
    await displayCatFact('card-3');
});

//* TOGGLE SECTIONS VISIBILITY
const generateCatFactsSection = document.querySelector('.generate-cat-facts');
const catBreedInfoSection = document.getElementById('cat-breed-info');
let isCatBreedInfoVisible = false;  

function showCatFacts() {
    generateCatFactsSection.classList.remove('hidden');
    catBreedInfoSection.classList.add('hidden');
    isCatBreedInfoVisible = false;
}

function showBreedInfoSection() {
    generateCatFactsSection.classList.add('hidden');
    catBreedInfoSection.classList.remove('hidden');
    isCatBreedInfoVisible = true;
    catBreedInfoSection.scrollIntoView({ behavior: 'smooth' }); 
}

//* THE CAT API
const API_KEY = 'live_46DNc4FvetMNZsyDJqVXru2pyBEGCgfJSAZRx0xVO2KHJyw8J2ZZ28KBaXeiPlbU';
const breedsUrl = 'https://api.thecatapi.com/v1/breeds';
const breedImageUrl = 'https://api.thecatapi.com/v1/images/search?breed_ids=';

const breedsDropdown = document.getElementById('cat-breeds-dropdown');
const breedsList = document.getElementById('breeds-list');
const breedNameElement = document.getElementById('breed-name');
const breedImageElement = document.getElementById('breed-image');
const breedDescriptionElement = document.getElementById('breed-description');

async function fetchCatBreeds() {
    try {
        const response = await fetch(breedsUrl, {
            headers: {
                'x-api-key': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const breeds = await response.json();
        console.log(breeds);

        if (Array.isArray(breeds)) {
            populateBreedsList(breeds);
        } else {
            throw new Error('Invalid response format from the API');
        }

    } catch (error) {
        console.error('Error fetching cat breeds:', error);
    }
}

function populateBreedsList(breeds) {
    breedsList.innerHTML = '';
    breeds.forEach(breed => {
        const li = document.createElement('li');
        li.textContent = breed.name;
        li.classList.add('breed-item');
        li.addEventListener('click', () => showBreedInfo(breed));
        breedsList.appendChild(li);
    });
    breedsList.classList.remove('hidden'); 
}

async function showBreedInfo(breed) {
    breedNameElement.textContent = breed.name;
    breedDescriptionElement.textContent = breed.description;

    try {
        const response = await fetch(`${breedImageUrl}${breed.id}`, {
            headers: {
                'x-api-key': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.length > 0) {
            breedImageElement.src = data[0].url;
            showBreedInfoSection();
        } else {
            console.error('No image found for this breed.');
        }

    } catch (error) {
        console.error('Error fetching breed image:', error);
    }
}

breedsDropdown.addEventListener('click', (event) => {
    event.preventDefault();
    if (!isCatBreedInfoVisible) {
        fetchCatBreeds();
    } else {
        showCatFacts();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    fetchCatBreeds();
});