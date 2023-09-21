// ! Define variables
//API URL
const DOG_URL = 'http://localhost:3000/pups';

//Interactive DOM elements
const filterButton = document.querySelector('#good-dog-filter');

//Display DOM elements
const dogBar = document.querySelector("#dog-bar");
const displayCard = document.querySelector('#dog-info');

//Global state variables
let filtered = false;

// ! Define renderDisplayCard
const buildDisplayCard = (dogId) => {
    const dogImg = document.createElement('img');
    const dogName = document.createElement('h2');
    const dogBtn = document.createElement('button');
    dogBtn.id = dogId;
    displayCard.append(dogImg, dogName, dogBtn);
};

// ! Define fetchAllDogs
//GET data from server for all Objects
const fetchAllDogs = () => {
    return fetch(DOG_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
    })
    .then(resp => resp.json())
    .catch(error => console.log('Failed to fetch data.'));
};

// ! Define fetchSingleDog
//GET data from server for one Object
const fetchSingleDog = (dogId) => {
    return fetch(`${DOG_URL}/${dogId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
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
const renderDogAvatars = (dogsObj) => {
    dogsObj.forEach(element => {
        createDogAvatar(element);
    })
};

// ! One avatar at a time!
const createDogAvatar = (dogObj) => {
    const newDogAv = document.createElement('span');
    newDogAv.setAttribute('data-id', `${dogObj.id}`);
    newDogAv.textContent = dogObj.name;
    dogBar.appendChild(newDogAv);
    dogBar.addEventListener('click', displayDog)
};

//Create <span> in <div#dog-bar>
//Display dog's name in <span>
//Append a <span> to <div#dog-bar>
//Attach listener for click event, invokes handleClick

// ! Populate <div#dog-info> with info and image from clicked dog of <div#dog-bar>
//Define displayDog
const displayDog = (e) => {
    debugger
    const dogId = e.target.dataset.id;
    const clickedDogObj = fetchSingleDog();
    buildDisplayCard();
    populateDisplayCard(clickedDogObj);
};
//Each dog needs to bring its own button with it
//GET single dogObj from db
//Capture data-id from dogObj and 
//Get image, name, and isGoodDog for clicked dog
//Populate <div#dog-info> with <img src=url>, <h2>name, and <button#good-or-bad> that displays good or bad dog
//Define <button#good-or-bad> locally so it can be targeted
// const goodOrBadBtn = document.querySelector('#good-or-bad'); 

// ! Define populateDisplayCard
//Pull dog data from db and load it onto the display card
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