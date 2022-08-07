// https://www.thecolorapi.com/docs#schemes

const pathColor = document.getElementById("myColor")
const getColor = document.getElementById("getColor")

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

//in this function show or hidde element in html
const changeFunction = (select, i) =>{
    elements = document.querySelectorAll('.colorCalue'+i);
    var selectElement = document.getElementById(select.id);
    var value = selectElement.value;
   switch (value) {
    case 'RGB':
        elements.forEach(element => {
            if(element.id === 'RGB'+i){
                element.classList.remove("hidden")
            }else{
                element.classList.add('hidden')
            }
        });
        break;
    case 'HSL':
        elements.forEach(element => {
            if(element.id === 'HSL'+i){
                element.classList.remove("hidden")
            }else{
                element.classList.add('hidden')
            }
        });
        break;
    case 'HEX':
        elements.forEach(element => {
            if(element.id === 'HEX'+i){
                element.classList.remove("hidden")
            }else{
                element.classList.add('hidden')
            }
        });
        break;
   }
}



//selector for color 
const selectorOptionColor = (color, i)=>{
    var newElementInSelectColor = ""
    newElementInSelectColor +=`
    <div>
    <p class="colorCalue${i} " id="RGB${i}">${color.rgb.value}</p>
    <p class="colorCalue${i} hidden" id="HSL${i}">${color.hsl.value}</p>
    <p class="colorCalue${i} hidden" id="HEX${i}">${color.hex.value}</p>
        <select id="selectColors${i}" class = "select__colors" onchange="changeFunction(selectColors${i},${i})">
            <option value="RGB">RGB</option>
            <option value="HSL">HSL</option>
            <option value="HEX">HEX</option>
        </select>
    </div>
    `
    return newElementInSelectColor
}

function HexToHSL(r,g,b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);
    h = Math.round(360*h);

    return [h, s, l];
}


//add new chose from generate Color
const changeSingleColor = (color, i) =>{
    var colorElement = document.getElementById(color.id);
    var colorValue = colorElement.value;
    const r = parseInt(colorValue.substr(1,2), 16)
    const g = parseInt(colorValue.substr(3,2), 16)
    const b = parseInt(colorValue.substr(5,2), 16)

    var RGB = document.getElementById('RGB'+i);
    var HSL = document.getElementById('HSL'+i);
    var HEX = document.getElementById('HEX'+i);
    objHsl = HexToHSL(r,g,b)

    hslValue = `hsl(${ objHsl[0] }, ${ objHsl[1] }%, ${ objHsl[2] }%)`
    rgbValue = `rgb(${r}, ${g}, ${b})`
    RGB.innerHTML = rgbValue
    HSL.innerHTML = hslValue
    HEX.innerHTML = colorValue.toUpperCase()
}

// function to generate five colors from api
const getColorFromApi = ()=>{
    let fiveElementHtml = ""
    shameApiColor().then(data => {
        i=0;
        // console.log(data.colors)
        data.colors.map((color)=>{
            fiveElementHtml +=`<div>
            <input class = "elements__generator " id="color${i}"type="color" value=${color.hex.value} onchange="changeSingleColor(color${i}, ${i})">
            ${selectorOptionColor(color, i)}
            </div>
            `
            i++;
        })
        document.getElementById('fiveColors').innerHTML = fiveElementHtml
    })
}

pathColor.addEventListener("change", generateApiData);
getColor.addEventListener("click", getColorFromApi);