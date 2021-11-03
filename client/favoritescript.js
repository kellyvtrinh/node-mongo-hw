// const { response } = require("express");

(() => {
  // makeAPOD is used to create a APOD node in the following format:
  // <div class="apod">
  //     <small id="apod-date"> 02-21-2021 </small>
  //     <img id="apod-image" width="200px" src="https://apod.nasa.gov/apod/image/2102/rosette_goldman_960.jpg" alt="">
  // </div>
  const makeAPOD = (url, date) => {
    var div = document.createElement("div");
    div.className = "apod";
    var small = document.createElement("small");
    small.id = "apod-date";
    small.innerText = date;
    var img = document.createElement("img");
    img.src = url;
    img.style.width = "200px";
    div.appendChild(small);
    div.appendChild(img);
    return div;
  };

  fetch('http://localhost:8080/api/favorite')
  .then(response => response.json)
  .then(jsonResponse => {
    console.log(jsonResponse);
    var al = document.getElementById("apod-list");
    for (apod in jsonResponse.results) {
      al.appendChild(makeAPOD(apod.image_url, apod.date));
    }
  })

})();
