// https://www.thecolorapi.com/docs#schemes

var pathColor = document.getElementById("myColor")
var getColor = document.getElementById("getColor")

window.onload = function() {
    generateApiData()
    getColorFromApi()
};
//fetch (api url) 
var shameApiColor = async() =>{
    var color = pathColor.value.substring(1) 
    var e = document.getElementById("mySelect");
    if(e.options[e.selectedIndex] !==undefined){
        var value = e.options[e.selectedIndex].value;
    }else{
        value ='analogic'
    }

    let response = await fetch(`https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${value}&count=5`);
    let responseToDo = await response.json();
    return responseToDo;
}

//function to generate select
const generateApiData = ()=>{
    shameApiColor().then(data => {
        let html = ""
        // console.log(data._links.schemes) // options 
       var selectElements = Object.keys(data._links.schemes)
       selectElements.map((element)=>{
            html += `
            <option value=${element}>
              ${element}
            </option>`
       })
       document.getElementById('mySelect').innerHTML = html
    })
}
// function to generate five colors from api
const getColorFromApi = ()=>{
    let fiveElementHtml = ""
    shameApiColor().then(data => {
        // console.log(data.colors)
        data.colors.map((color)=>{
            fiveElementHtml +=`<div>
            <input class = "elements__generator"type="color" value=${color.hex.value}>
            <p>${color.hex.value}</p>
            </div>
            `
        })
        document.getElementById('fiveColors').innerHTML = fiveElementHtml
    })
}

pathColor.addEventListener("change", generateApiData);
getColor.addEventListener("click", getColorFromApi);