// VARIABLES


const form = document.querySelector("#form");
const leavingFrom = document.querySelector('#cityDepart');
const goingTo = document.querySelector('#cityArriving');
const depDate = document.querySelector('#departDate');
const geoNamesURL = 'http://api.geonames.org/searchJSON?q=';
const username = "timetotravel";
const timestampNow = (Date.now()) / 1000;
const darkAPIURL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/";
const darkAPIkey = "841a9888f38f0d5458c1f32b892d2d1b";
const pixabayAPIURL = "https://pixabay.com/api/?key=";
const pixabayAPIkey = "13947861-82731bd440ece605a78d76de8";

form.addEventListener('submit', addTrip);

// Function called when form is submitted
export function addTrip(e) {
    e.preventDefault();
    //Acquiring and storing user trip data
    const leavingFromText = leavingFrom.value;
    const goingToText = goingTo.value;
    const depDateText = depDate.value;
    const timestamp = (new Date(depDateText).getTime()) / 1000;

    // function checkInput to validate input 
    Client.validCityNames(leavingFromText, goingToText);

    getCityInfo(geoNamesURL, goingToText, username)
        .then((cityData) => {
            const cityLat = cityData.geonames[0].lat;
            const cityLong = cityData.geonames[0].lng;
            const country = cityData.geonames[0].countryName;
            const weatherData = getWeather(cityLat, cityLong, country, timestamp);
            return weatherData;
        })
        .then((weatherData) => {
            const daysLeft = Math.round((timestamp - timestampNow) / 86400);
            const userData = postData('http://localhost:8081/add', { leavingFromText, goingToText, depDateText, weather: weatherData.currently.temperature, summary: weatherData.currently.summary, daysLeft });
            console.log("userdata", userData);
            return userData;
        }).then((userData) => {
            updateUI(userData);
        })
}

//function getCityInfo to get city information from Geonames (latitude, longitude, country)

export const getCityInfo = async(geoNamesURL, goingToText, username) => {
    // res equals to the result of fetch function
    const res = await fetch(geoNamesURL + goingToText + "&maxRows=10&" + "username=" + username);
    try {
        const cityData = await res.json();
        return cityData;
    } catch (error) {
        console.log("error", error);
    }
};

// function getWeather to get weather information from Dark Sky API 

export const getWeather = async(cityLat, cityLong, country, timestamp) => {
    const req = await fetch(darkAPIURL + "/" + darkAPIkey + "/" + cityLat + "," + cityLong + "," + timestamp + "?exclude=minutely,hourly,daily,flags");
    try {
        const weatherData = await req.json();
        return weatherData;
    } catch (error) {
        console.log("error", error);
    }
}

// Function postData to POST data to our local server
export const postData = async(url = '', data = {}) => {
    const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
            depCity: data.leavingFromText,
            arrCity: data.goingToText,
            depDate: data.depDateText,
            weather: data.weather,
            summary: data.summary,
            daysLeft: data.daysLeft,
            imageLink: data.image
        })
    })
    try {
        const userData = await req.json();
        return userData;
    } catch (error) {
        console.log("error", error);
    }
}

// Function update UI that reveals the results page with updated trip information including fetched image of the destination

export const updateUI = async(userData) => {
    const res = await fetch(pixabayAPIURL + pixabayAPIkey + "&q=" + userData.arrCity + "+city&image_type=photo");
    try {
        const imageLink = await res.json();
        const dateSplit = userData.depDate.split("-").reverse().join(" / ");
        document.querySelector("#heading").innerHTML =  userData.arrCity;
        document.querySelector("#tavelDay").innerHTML =  dateSplit;
        document.querySelector("#manyOfDays").innerHTML =  userData.daysLeft;
        document.querySelector("#summary").innerHTML =  userData.summary;
        document.querySelector("#weather-expected").innerHTML =  userData.weather;
        document.querySelector("#fromPixabay").setAttribute('src', imageLink.hits[0].webformatURL);
    } catch (error) {
        console.log("error", error);
    }
}


//**************************************** *//

// //All URLs
// const weatherBit_URL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// const pixaby_URL = "https://pixabay.com/api/?key=";
// const geoname_URL = 'http://api.geonames.org/searchJSON?q=';
// const darkAPIURL = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/";


// //APIs
// //const API_geonameUserName = process.env.GEONAME_API_USERNAME;
// //const pixabayKey = process.env.PIXABY_API_KEY;
// //const weatherKey = process.env.WEATHER_BIT_API_KEY;
// const API_geonameUserName = "alblwi";
// const pixabayKey = "17819277-a26d16ef64e93aaa646736946";
// const weatherKey = "5f7e550f0c274a0dba1c6f59c015ae84";
// const darkAPIkey = "841a9888f38f0d5458c1f32b892d2d1b";
// const pixabayAPIURL = "https://pixabay.com/api/?key=";
// const pixabayAPIkey = "13947861-82731bd440ece605a78d76de8";


// //Information Travling
// const cityDepart = document.getElementById('cityDepart').value;
// const cityArriving = document.getElementById('cityArriving').value;
// const departDate = document.getElementById('departDate').value;
// const returnDate = document.getElementById('retunDate').value;
// const timestamp = (new Date(departDate).getTime()) / 1000;
// const timestampNow = (Date.now()) / 1000;


// //Split and information dates
// let splitDepart = departDate.split('/');
// let splitReturn = returnDate.split('/');
// let leavingDate = new Date(splitDepart[0], splitDepart[1] - 1, splitDepart[2]);
// let returnDateSplit = new Date(splitReturn[0], splitReturn[1] - 1, splitReturn[2]);
// let lengthTraviling = (returnDateSplit - leavingDate) / (1000 * 3600 * 24);
// console.log(lengthTraviling);

// form.addEventListener('submit', addTrip);

// //Start press the Button to get all information
// export function addTrip(e) {
//     e.preventDefault();

//     Client.validCityNames(cityDepart, cityArriving);

//     getCityInfo(geoname_URL, cityArriving, API_geonameUserName)
//         .then((cityData) => {
//             const cityLatitude = cityData.geonames[0].lat;
//             const cityLongitude = cityData.geonames[0].lng;
//             const country = cityData.geonames[0].countryName;
//             const gettingWeather = getWeather(cityLatitude, cityLongitude, country, departDate)
//             return gettingWeather;
//         })
//         .then((gettingWeather) => {
//             const daysLeft = Math.round((timestamp - timestampNow) / 86400);
//             const userData = postData('http://localhost:8081/test', { cityDepart, cityArriving, departDate, weather: gettingWeather.currently.temperature, summary: gettingWeather.currently.summary, daysLeft });
//             return userData;
//         }).then((userData) => {
//             updateUI(userData);
//         })
// }
// export const getWeather = async(cityLatitude, cityLongitude, country, timestamp) => {
//     const req = await fetch(darkAPIURL + "/" + darkAPIkey + "/" + cityLatitude + "," + cityLongitude + "," + timestamp + "?exclude=minutely,hourly,daily,flags");
//     try {
//         const cityData = await req.json();
//         return cityData;
//     } catch (error) {
//         console.log("error", error);
//     }
// }
// export const getCityInfo = async(geoname_URL, cityArriving, API_geonameUserName) => {
//     // res equals to the result of fetch function
//     const res = await fetch(geoname_URL + cityArriving + "&maxRows=10&username=" + API_geonameUserName);
//     try {
//         const cityData = await res.json();
//         return cityData;
//     } catch (error) {
//         console.log("error", error);
//     }
// };

// export const postData = async(url = '', data = {}) => {
//         const req = await fetch(url, {
//             method: "POST",
//             credentials: "same-origin",
//             headers: {
//                 "Content-Type": "application/json;charset=UTF-8"
//             },
//             body: JSON.stringify({
//                 departCity: data.leavingFromText,
//                 arrivalCity: data.goingToText,
//                 departDay: data.depDateText,
//                 weatherExp: data.weather,
//                 summary: data.summary,
//                 numberOfDays: data.lengthTraviling
//             })
//         })
//         try {
//             const userData = await req.json();
//             return userData;
//         } catch (error) {
//             console.log("error", error);
//         }
//     }
//     //Upadte UI

// export const updateUI = async(userData) => {

//     const res = await fetch(userData.arrivalCity);

//     try {
//         //const imageLink = await res.json();
//         //const dateSplit = userData.depDate.split("-").reverse().join(" / ");
//         document.getElementById("heading").innerHTML = userData.arrivalCity;
//         //document.querySelector("#date").innerHTML = dateSplit;
//         document.getElementById("manyOfDays").innerHTML = userData.lengthTraviling;
//         //document.getElementById("#summary").innerHTML = userData.summary;
//         document.getElementById("weather-expected").innerHTML = userData.weather;
//         //document.getElementById("#fromPixabay").setAttribute('src', imageLink.hits[0].webformatURL);
//     } catch (error) {
//         console.log("error", error);
//     }
// }