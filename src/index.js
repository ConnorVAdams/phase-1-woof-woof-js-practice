// ! Define variables
//API URL
const DOG_URL = 'http://localhost:3000/pups';

//Interactive DOM elements
const filterButton = document.querySelector('#good-dog-filter');

//Display DOM elements
const dogBar = document.querySelector("#dog-bar");
dogBar.addEventListener('click', () => {
    alert('')
})

// //Global state variables
let filtered = false;

// ! Define populateDogBar
//GET data from server
const populateDogBar = () => {
    return fetch(DOG_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }
    })
    .then(resp => resp.json())
    .then(dogsObj => renderDogAvatars(dogsObj))
    .catch(error => console.log('Failed to fetch data.'));
};

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
};

//Create <span> in <div#dog-bar>
//Display dog's name in <span>
//Append a <span> to <div#dog-bar>
//Attach listener for click event, invokes handleClick

// ! Populate <div#dog-info> with info and image from clicked dog of <div#dog-bar>
//Define handleClick
//GET single dogObj from db
//Capture data-id from dogObj and 
//Get image, name, and isGoodDog for clicked dog
//Populate <div#dog-info> with <img src=url>, <h2>name, and <button#good-or-bad> that displays good or bad dog
//Define <button#good-or-bad> locally so it can be targeted
const goodOrBadBtn = document.querySelector('#good-or-bad'); 

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
document.addEventListener('DOMContentLoaded', populateDogBar)