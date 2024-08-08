async function fetchCatFact() {
    try {
        const response = await fetch('https://meowfacts.herokuapp.com/');
        const data = await response.json();
        return data.data[0];
    } catch (error) {
        console.error("Error fetching cat fact", error);
        return "Failed to fetch a cat Fact. Please try agian.";
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