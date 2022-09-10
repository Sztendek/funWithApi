const myListLocalStoraget = JSON.parse(localStorage.getItem('myList'));

var myList = []
if(myListLocalStoraget !== null){
    myList = myListLocalStoraget
}

export const searchVideoToMyList = () => {
    const buttons = document.querySelectorAll(".addVideo");

    for (const button of buttons) {
        //add id to array myList
        button.addEventListener('click', function (event) {
            var newElementValue = event.target.value

            let classAtribute = event.target.getAttribute('class')
            let result = classAtribute.includes("green");
            //add colors to btn
            if(result){
                event.target.classList.toggle("green");
                event.target.classList.add("red");
                event.target. innerText ="-"
            }else{
                event.target.classList.toggle("red");
                event.target.classList.add("green");
                event.target. innerText ="+"
            }

            if (myList.includes(newElementValue)){
                myList = myList.filter(item => item !== newElementValue)
            }else{
                myList.push(newElementValue)
            }
            let newMyList = JSON.stringify(myList)
            localStorage.setItem('myList', newMyList);
        })
    }
}

