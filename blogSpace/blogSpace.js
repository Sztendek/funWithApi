// BaseURL: https://apis.scrimba.com/jsonplaceholder/
// Endpoint: /posts

var whatCanI = async() =>{
    let response = await fetch("https://apis.scrimba.com/jsonplaceholder/posts");
    let responseToDo = await response.json();
    return responseToDo;
}

window.onload = function() {
    let html = ""
    whatCanI().then(data => {
        var list = data
        var size = 2
        var itemsArray = list.slice(0, size)

        for (const items of itemsArray) {
            html += `
            <div class="blog__space--post">
                <h2>${items.title}</h2>
                <p>${items.body}</p>
            </div>
               `
        }
      document.getElementById('blogSpace').innerHTML = html
    })
  };


  function zero_first_format(value)
{
    if (value < 10)
    {
        value='0'+value;
    }
    return value;
}

  function date_time()
{
    var current_datetime = new Date();
    var day = zero_first_format(current_datetime.getDate());
    var month = zero_first_format(current_datetime.getMonth()+1);
    var year = current_datetime.getFullYear();
    var hours = zero_first_format(current_datetime.getHours());
    var minutes = zero_first_format(current_datetime.getMinutes());
    var seconds = zero_first_format(current_datetime.getSeconds());
    return day+"/"+month+"/"+year+" "+hours+":"+minutes+":"+seconds;
}

var actualDate = document.getElementById("mainHeaderDate");
setInterval(function () {
    actualDate.innerHTML = date_time();
}, 1000);


document.getElementById("sumbit").addEventListener("click", postApi);


function addNewElement(data){

    var div = document.createElement("div");
    div.classList.add('blog__space--post');


    var h2 = document.createElement("h2");
    h2.textContent = data.title

    var paragraph = document.createElement("p");
    paragraph.textContent = data.body

    div.appendChild(h2);
    div.appendChild(paragraph);

    var element = document.getElementById("blogSpace");
    element.appendChild(div);
}

function postApi(event) {
    event.preventDefault();
    var bodyValue = document.getElementById('body').value
    var titleValue = document.getElementById('title').value

    let data = {
        title: titleValue,
        body: bodyValue, 
    }

    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }
    
    fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
        .then(res => res.json())
        .then(data => addNewElement(data))


    document.getElementById("myForm").reset();
}
