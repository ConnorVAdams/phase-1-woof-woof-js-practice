const displayDogAsync = (e) => {
    const dogId = e.target.dataset.id;
    const clickedDogObj = fetchSingleDog(); 
    buildDisplayCard();
    populateDisplayCard(clickedDogObj);
};

const displayDogSync = (e) => {
    const dogId = e.target.dataset.id;
    return fetch(`${DOG_URL}/${dogId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(resp => resp.json())
    .then(buildDisplayCard())
    .then(populateDisplayCard(dogObj))
    .catch(error => console.log('Failed to fetch data.'))
};

const fetchSingleDog = (dogId) => {
    return fetch(`${DOG_URL}/${dogId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(resp => resp.json())
    .catch(error => console.log('Failed to fetch data.'));
};

const fetchAllDogs = () => {
    return fetch(DOG_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(resp => resp.json())
    .catch(error => console.log('Failed to fetch data.'));
};

const buildDisplayCard = (dogId) => {
    const dogImg = document.createElement('img');
    const dogName = document.createElement('h2');
    const dogBtn = document.createElement('button');
    dogBtn.id = dogId;
    displayCard.append(dogImg, dogName, dogBtn);
};

const populateDisplayCard = (dogObj) => {
    debugger
    displayCard.img.src = dogObj.image;
    displayCard.name = dogObj.name;
    if (dogsObj.isGoodDog){
        displayCard.dogBtn.textContent = "Good Dog!";
    } else {
        displayCard.dogBtn.textContent = "Bad Dog!";
    }
};