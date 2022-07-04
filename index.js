var clickBtnToDo = document.getElementById("clickBtnToDo");
var displayJobs = document.getElementById(".displayJobs");
var displayType = document.getElementById('displayType')
var displayCost = document.getElementById('displayCost')
var country = document.getElementById('country')
var manyElems = Array.from(document.querySelectorAll(".element"))
let currentPosition = 1
let click =0;
let clicked = document.getElementById('clicked')


var whatCanI = async() =>{
    let response = await fetch("https://apis.scrimba.com/bored/api/activity");
    let responseToDo = await response.json();
    return responseToDo;
}
var showElements = (currentPosition,previousPosition)=>{
    let testValue = document.getElementById("displayCost");
    if(currentPosition === 0){
        previousPosition = 2
    }
    if(testValue !== null){
        console.log(displayJobs)
        manyElems[previousPosition].removeChild(displayJobs)
        manyElems[previousPosition].removeChild(displayType)
        manyElems[previousPosition].removeChild(displayCost)
    }

    displayJobs = document.createElement('div');
    displayCost = document.createElement('div');
    displayType = document.createElement('div');

    displayJobs.setAttribute("id", "displayJobs");
    displayType.setAttribute("id", "displayType");
    displayCost.setAttribute("id", "displayCost");
    displayJobs.setAttribute("class", "displayJobs -inElement");
    displayType.setAttribute("class", "displayType -inElement");
    displayCost.setAttribute("class", "displayCost -inElement");

    manyElems[previousPosition].classList.remove("current");
    
    manyElems[currentPosition].classList.add("current");

    manyElems[currentPosition].appendChild(displayJobs)
    manyElems[currentPosition].appendChild(displayType)
    manyElems[currentPosition].appendChild(displayCost)
    
}

var clickedBtn = ()=>{
    if(click===0){
        clicked.classList.add("current");
        clicked.classList.add("-clicked");
    }
    click++
    clicked.innerHTML = `Clicked ${click}`
}


var toDo = ()=>{
    let previousPosition = currentPosition -1

    showElements(currentPosition, previousPosition)
    clickedBtn()
    whatCanI().then(data => {
        let displayCostValue = data.price === 0 ? "Do..." 
        : data.price < 0.2 ? "Why not?" 
        : "Do not think only do!"
        displayJobs.innerHTML = data.activity
        displayType.innerHTML = data.type
        displayCost.innerHTML = displayCostValue
    })
    currentPosition++
    if(currentPosition > 2){
        currentPosition = 0
    }
}





clickBtnToDo.addEventListener("click",toDo)