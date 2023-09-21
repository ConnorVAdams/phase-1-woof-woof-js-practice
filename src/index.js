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

//Global state variables
let filtered = false;

// ! Define renderDisplayCard
const buildDisplayCard = (dogId) => {
    dogImg = document.createElement('img');
    dogName = document.createElement('h2');
    dogBtn = document.createElement('button');
    dogBtn.addEventListener('click', toggleGoodOrBad)
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

// ! Define toggleGoodOrBad
//Send PATCH request to server to toggle value of isGoodDog
const toggleGoodOrBad = (e, newGoodOrBadValue) => {
    const requestedDogId = dogBtn.dataset.id;
    
    return fetch(`${DOG_URL}/${requestedDogId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({isGoodDog: })
    })
    .then(resp => resp.json())
    .then(dogObj => console.log(dogObj))
    .catch(error => console.log('Failed to fetch data.'));
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
const createDogAvatar = (dogObj) => {
    const newDogAv = document.createElement('span');
    newDogAv.setAttribute('data-id', `${dogObj.id}`);
    newDogAv.textContent = dogObj.name;
    dogBar.appendChild(newDogAv);
    dogBar.addEventListener('click', displayDogSync);
};

// ! Populate <div#dog-info> with info and image from clicked dog of <div#dog-bar>
//Define displayDog synchronously
const displayDogAsync = (e) => {
    const requestedDogId = e.target.dataset.id;
    const clickedDogObj = fetchSingleDog(requestedDogId); 
    populateDisplayCard(clickedDogObj);
};

//Define displayDog asynchronously
const displayDogSync = (e) => {
    const requestedDogId = e.target.dataset.id;
    const clickedDogObj = fetchSingleDog(requestedDogId); 
    fetch(`${DOG_URL}/${requestedDogId}`, {
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

// ! Handle goodDog button click
    //Define handleGoodOrBadClick
    //PATCH database to reflect change
    //Change textContent of goodDog <button>
// ! Attach listener to <button#good-or-bad>
//<button#good-or-bad> gets handleGoodOrBadClick

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
//<button#good-dog-filter> gets handleFilterClick
//<document> gets populateDogBar on DOMContentLoaded

// ! Fetch data from API
document.addEventListener('DOMContentLoaded', populateDogBar);
document.addEventListener('DOMContentLoaded', buildDisplayCard)

//Each dog needs to bring its own button with it
//GET single dogObj from db
//Capture data-id from dogObj and 
//Get image, name, and isGoodDog for clicked dog
//Populate <div#dog-info> with <img src=url>, <h2>name, and <button#good-or-bad> that displays good or bad dog
//Define <button#good-or-bad> locally so it can be targeted
// const goodOrBadBtn = document.querySelector('#good-or-bad'); 