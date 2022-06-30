var clickBtnToDo = document.getElementById("clickBtnToDo");
var displayJobs = document.querySelector(".displayJobs");
var displayType = document.getElementById('displayType')
var displayCost = document.getElementById('displayCost')
var country = document.getElementById('country')

var whatCanI = async() =>{
    let response = await fetch("https://apis.scrimba.com/bored/api/activity");
    let responseToDo = await response.json();
    return responseToDo;
}

var toDo = ()=>{
    whatCanI().then(data => {
        let displayCostValue = data.price === 0 ? "Nothing" 
        : data.price < 0.2 ? "Something" 
        : "Do not think only do"
        displayJobs.innerHTML = data.activity
        displayType.innerHTML = data.type
        displayCost.innerHTML = displayCostValue
        console.log(data.price)
    })
}

clickBtnToDo.addEventListener("click",toDo)