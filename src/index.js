// ! Define variables
//API URL
const DOG_URL = 'http://localhost:3000/pups';

//Interactive DOM elements
const filterButton = document.querySelector('#good-dog-filter');

//Display DOM elements
const dogBar = document.querySelector("#dog-bar");
const displayCard = document.querySelector('#dog-info');
let dogImg;
let dogName;
let dogBtn;

//Global malleable variables
let filtered = false;
let currentlyDisplayedDog = false;

// ! Define renderDisplayCard
const buildDisplayCard = (dogId) => {
    dogImg = document.createElement('img');
    dogName = document.createElement('h2');
    dogBtn = document.createElement('button');
    dogBtn.addEventListener('click', updateGoodOrBad)
    displayCard.append(dogImg, dogName, dogBtn);
};

// ! Define fetchAllDogs
//GET data from server for all Objects and return dogsObj
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

// ! Define fetchSingleDog
//GET data from server for one Object and return dogObj
const fetchSingleDog = (requestedDogId) => {
    return fetch(`${DOG_URL}/${requestedDogId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(resp => resp.json())
    .catch(error => console.log('Failed to fetch data.'));
};

// ! Define patchDog
const patchDog = (dogObj) => {
    fetch(`${DOG_URL}/${currentlyDisplayedDog}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({isGoodDog: dogObj.isGoodDog})
    })
};

// ! Define populateDogBar
//Fetch all dogs from the server and render them in the nav bar
//Fires automatically when page loads
const populateDogBar = () => {
    const dogsObj = fetchAllDogs()
    .then(dogsObj => renderDogAvatars(dogsObj))
}

// ! Farm out createDogAvatar
//Iterate through passed object and create an avatar for each dog
const renderDogAvatars = (dogsObj) => {
    dogsObj.forEach(element => {
        createDogAvatar(element);
    })
};

// ! Render one avatar at a time
//Create one dog avatar for use in nav bar
//TODO Build hidden class into this function
const createDogAvatar = (dogObj) => {
    const newDogAv = document.createElement('span');
    newDogAv.className = 'avatar';
    newDogAv.setAttribute('data-id', `${dogObj.id}`);
    newDogAv.textContent = dogObj.name;
    dogBar.appendChild(newDogAv);
    dogBar.addEventListener('click', displayDog);
};

// ! Populate <div#dog-info> with info and image from clicked dog of <div#dog-bar>
//Define displayDog
const displayDog = (e) => {
    if (!currentlyDisplayedDog) {
        buildDisplayCard();
    };
    currentlyDisplayedDog = e.target.dataset.id;
    const clickedDogObj = fetchSingleDog(currentlyDisplayedDog); //TODO can I automatically pass this or do I need to assign it to a var first like I did here?
    fetch(`${DOG_URL}/${currentlyDisplayedDog}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(resp => resp.json())
    .then(dogObj => populateDisplayCard(dogObj))
    .catch(error => console.log('Failed to fetch data.'));
};

// ! Define populateDisplayCard
//Pull dog data from db and load it onto the display card
const populateDisplayCard = (dogObj) => {
    dogImg.src = dogObj.image;
    dogName.textContent = dogObj.name;
    if (dogObj.isGoodDog) {
        dogBtn.textContent = 'Good Dog!';
    } else {
        dogBtn.textContent = 'Bad Dog!';
    }
    dogBtn.dataset.id = dogObj.id;
};

// ! Define updateGoodOrBadDb
const updateGoodOrBad = () => {
    const currentDogObj = fetchSingleDog(currentlyDisplayedDog)
    //TODO if(!resp.ok)
    .then(currentDogObj => {
        currentDogObj.isGoodDog = !currentDogObj.isGoodDog;
        return currentDogObj; //TODO why isn't this implicitly returning the obj? 
    })
    .then(currentDogObj => {
        patchDog(currentDogObj)
        return currentDogObj;
    })
    .then((currentDogObj) => updateDogBtn(currentDogObj.isGoodDog))
};

// ! Define updateDogBtn
const updateDogBtn = (bool) => {
    if (bool) {
        dogBtn.textContent = 'Good Dog!';
    } else {
        dogBtn.textContent = 'Bad Dog!';
    }
};

// ! Define hideBadDogs
const filterDogs = () => {
    if (filtered) {
        const dogsObj = fetchAllDogs() 
        .then(dogsObj => {
            const badDogIds = dogsObj.filter(dog => !dog.isGoodDog).map(dog => dog.id);
            return badDogIds;
        })
        .then(badDogIds => {
            const dogBarDogs = [...document.querySelectorAll('.avatar')];
            dogBarDogs.filter(avatar => {
                debugger
                if (badDogIds.includes(parseInt(avatar.dataset.id))) {
                    console.log('bad')
                }
            })
        })
        //Iterate through all dogs in db
        //Return IDs of bad dogs
        //Pass those IDs to hideBadDogs
            //Iterate through dog avatars and add .hidden class to all passed IDs
    //Toggle filtered state
    } else {
        
    }
    filtered = !filtered;
};

//TODO Am I going overboard with the data IDs/SST thing?

const isGoodAvatar = (dogObj) => {
    
    if (dogObj.isGoodDog) {
        return 'is-good-avatar';
    } else {
        return 'is-bad-avatar';
    };
};

// ! Filter good dogs
//Define handleFilterClick
//Change state of filter
//Toggle textContent of button#good-dog-filter

//Filter out bad dogs from <div#dog-bar>
//toggleHidden()

// ! Define toggleHidden
//Iterate through elements in <div#dog-bar>
//If isGoodDog === false
//Toggle hidden attribute on for bad dogs

//Else iterate through elements in <div#dog-bar>
//If isGoodDog === false
//Toggle hidden attribute off for bad dogs

// ! Attach event listeners
// Fetch data from API and load dog avatars on page load
document.addEventListener('DOMContentLoaded', populateDogBar);
filterButton.addEventListener('click', filterDogs)