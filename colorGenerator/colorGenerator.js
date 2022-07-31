// https://www.thecolorapi.com/docs#schemes
// https://www.figma.com/file/2gVhteRFOvxiJJNapTygRS/Color-Scheme-Generator-(Copy)?node-id=0%3A1

var pathColor = document.getElementById("myColor")
var getColor = document.getElementById("getColor")

window.onload = function() {
    generateApiData()
};

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

const getColorFromApi = ()=>{
    shameApiColor().then(data => {
        console.log(data)
    })
  
}

pathColor.addEventListener("change", generateApiData);
getColor.addEventListener("click", getColorFromApi);