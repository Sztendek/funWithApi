// https://www.figma.com/file/va8IR5VkyAi0nK2QsDxiap/Movie-Watchlist-(Copy)?node-id=0%3A1  - FIGMA
// https://www.omdbapi.com/ - API
// http://www.omdbapi.com/?apikey=[1d5608e7]&
// https://www.omdbapi.com/?apikey=1d5608e7&t=batman&y=2000&plot=full  na dany rok
// https://www.omdbapi.com/?apikey=1d5608e7&t=batman&plot=full all

import { searchVideoToMyList } from './searchVideoToMyList.js';
const searcBtn = document.getElementById('searcBtn')
const searchList = document.getElementById('searchList')
const myListLocalStoraget = JSON.parse(localStorage.getItem('myList'));
let html = ''

var myList = []
if(myListLocalStoraget !== null){
    myList = myListLocalStoraget
}

//take 10 element from api
const apiVideoSearch = async () => {
    let videoName = document.getElementById('searchVideo').value
    let response = await fetch(`https://www.omdbapi.com/?apikey=1d5608e7&s=${videoName}`);
    let apiVideoSearch = await response.json();
    return apiVideoSearch;
}

//take specific option video from api
const specificVideoApi = async (imdbID) => {
    let response = await fetch(`http://www.omdbapi.com/?apikey=1d5608e7&i=${imdbID}&plot=Short`);
    let specificVideoApi = await response.json();
    return specificVideoApi;
}

//search btn to add id video 

const giveMeVideo = () => {
    apiVideoSearch()
    .then(data => {
        data.Search.map((dateValue, i, arr) => {
            specificVideoApi(dateValue.imdbID).then(specificVideo => {
                html += `
                <div class="serachList__oneVideo">
                <img class="fit-picture"
                src=${specificVideo.Poster}
                alt=${specificVideo.Title}>
                    <div class="serachList__oneVideo--contenet">
                        <div class="serachList__oneVideo--header"> 
                        <h1>${specificVideo.Title}</h1>
                        <svg class="star"width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.78671 1.19529C6.01122 0.504306 6.98878 0.504305 7.21329 1.19529L8.01547 3.66413C8.11588 3.97315 8.40384 4.18237 8.72876 4.18237H11.3247C12.0512 4.18237 12.3533 5.11208 11.7655 5.53913L9.66537 7.06497C9.40251 7.25595 9.29251 7.59447 9.39292 7.90349L10.1951 10.3723C10.4196 11.0633 9.62875 11.6379 9.04097 11.2109L6.94084 9.68503C6.67797 9.49405 6.32203 9.49405 6.05916 9.68503L3.95903 11.2109C3.37125 11.6379 2.58039 11.0633 2.8049 10.3723L3.60708 7.90349C3.70749 7.59448 3.59749 7.25595 3.33463 7.06497L1.2345 5.53914C0.646715 5.11208 0.948796 4.18237 1.67534 4.18237H4.27124C4.59616 4.18237 4.88412 3.97315 4.98453 3.66414L5.78671 1.19529Z" fill="#FEC654"/>
                        </svg>
                        <p class="ratio">${specificVideo.imdbRating}</p>
                        </div>
                        <div  class="serachList__oneVideo--options">
                        <p>${specificVideo.Runtime}</p>
                        <p>${specificVideo.Genre}</p>
                        <button 
                        class="addVideo ${(myList.includes(dateValue.imdbID))? 'red' : 'green'}" 
                        type="submit"
                        value=${dateValue.imdbID}>${(myList.includes(dateValue.imdbID))? '-' : '+'}
                        </button>
                        </div>
                        <p>${specificVideo.Plot}</p>
                        </div>
                        </div>`
                        searchList.innerHTML = html
                        //last element in array
                        if (arr.length - 1 !== i) return
                        searchVideoToMyList()
                    })
                })
    })
    .catch(error => console.log(error))
};

searcBtn.addEventListener("click", giveMeVideo);
