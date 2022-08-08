// https://www.figma.com/file/va8IR5VkyAi0nK2QsDxiap/Movie-Watchlist-(Copy)?node-id=0%3A1  - FIGMA
// https://www.omdbapi.com/ - API
// http://www.omdbapi.com/?apikey=[1d5608e7]&
// https://www.omdbapi.com/?apikey=1d5608e7&t=batman&y=2000&plot=full  na dany rok
// https://www.omdbapi.com/?apikey=1d5608e7&t=batman&plot=full all

var shameApiColor = async() =>{
     let response = await fetch(`https://www.omdbapi.com/?apikey=1d5608e7&t=batman&plot=full`);
    let responseToDo = await response.json();
    return responseToDo;
}

window.onload = function() {
    shameApiColor().then(data =>console.log(data))
};