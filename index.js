
const mainContainer = document.getElementById("main-container")
const btn = document.getElementById("btn")

let Cvalue = ""
let Cmode = ""
let colorsArray = []

getColorFromHtml()
getColorFromApi(Cvalue, Cmode)

document.addEventListener('click', function(e){
    if(e.target.dataset.color0){
       copyClipboard(e.target.dataset.color0)
       colorCode = document.getElementById('color0').textContent
       document.getElementById('color0').textContent = "copied"
       setTimeout(function(){
            document.getElementById('color0').textContent = colorCode
       }, 1000)

    }
    else if(e.target.dataset.color1){
        copyClipboard(e.target.dataset.color1)
        colorCode = document.getElementById('color1').textContent
       document.getElementById('color1').textContent = "copied"
       setTimeout(function(){
            document.getElementById('color1').textContent = colorCode
       }, 1000)
    }
    else if(e.target.dataset.color2){
        copyClipboard(e.target.dataset.color2)
        colorCode = document.getElementById('color2').textContent
       document.getElementById('color2').textContent = "copied"
       setTimeout(function(){
            document.getElementById('color2').textContent = colorCode
       }, 1000)
    }
    else if(e.target.dataset.color3){
        copyClipboard(e.target.dataset.color3)
        colorCode = document.getElementById('color3').textContent
       document.getElementById('color3').textContent = "copied"
       setTimeout(function(){
            document.getElementById('color3').textContent = colorCode
       }, 1000)
    }
    else if(e.target.dataset.color4){
        copyClipboard(e.target.dataset.color4)
        colorCode = document.getElementById('color4').textContent
        document.getElementById('color4').textContent = "copied"
        setTimeout(function(){
                document.getElementById('color4').textContent = colorCode
        }, 1000)
    }
})

function getColorFromHtml(){
    Cvalue = document.getElementById("color-picker").value.slice(1)
    Cmode = document.getElementById("color-menu").value
}

function getColorFromApi(value, mode){
    const url = `https://www.thecolorapi.com/scheme?hex=${value}&mode=${mode}&count=5`;
    const request = new Request(url, {
    method: 'GET', // or 'POST', 'PUT', 'DELETE', etc.
    headers: {
        'Content-Type': 'application/json', // Specify the content type if required
        // Additional headers if needed
    },
    // Request body if required
    });

    fetch(request)
    .then(response => {
        if (!response.ok) {
        throw new Error('Request failed'); // Handle non-successful responses
        }
        return response.json(); // Parse response as JSON or other formats
    })
    .then(data => {
        // Handle the retrieved data
        console.log("mode: " + data.mode);
        for(i=0; i<5; i++){
            colorsArray.push(data.colors[i].hex.value)
        }
        render()
        colorsArray = []
    })
    .catch(error => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
    });
}


function render(){
    let html = ""
    colorsArray.forEach(function(element, index){
        html += 
            `<div class="color-items">
                <div class="color-column" style="background-color: ${element};"></div>
                <p id="color${index}" class="hex-value" data-color${index}="${element}">${element}</p>
            </div>`        
    })

    mainContainer.innerHTML = html
}


btn.addEventListener('click', function(){
    getColorFromHtml()
    getColorFromApi(Cvalue, Cmode)
})

function copyClipboard(text){
    navigator.clipboard.writeText(text)
    .then(() => {
      console.log('Text copied to clipboard');
    })
    .catch((error) => {
      console.error('Unable to copy text:', error);
    });
}