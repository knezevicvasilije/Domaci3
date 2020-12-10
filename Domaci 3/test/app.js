var game;
var currentGame;
const searchBtn = document.getElementById("searchBtn");
const nameRadio = document.getElementById("nameRadio");
const genreRadio = document.getElementById("genreRadio");
const selectGrade = document.getElementById("grade");
const itemDelete = document.querySelector(".itemDelete");
const loadMore = document.getElementById("loadMore");
var response;
var output = "";

const requestData = async () => {
    const response = await fetch('games.json');
    const json = await response.json();
    game=json;
    currentGame=game;
  
    createAll(currentGame);
    searchBtn.addEventListener('click', () => {
        createAll( searchGame(currentGame));
      })
};
window.addEventListener('load', ()=>{
    requestData();
});

var inputText = document.getElementById("searchGamee");

function searchGame(response){
    var results = [];
    var grade = selectGrade.value;
 output = "";
   if(genreRadio.checked){
    for(var i = 0; i < response.length; i++){
        if(response[i].genres.toLowerCase().includes(inputText.value) && response[i].rating === grade){
        results.push(response[i]);
        }
   }}else{
    for(var i = 0; i < response.length; i++){
        if(response[i].name.toLowerCase().includes(inputText.value.toLowerCase()) && response[i].rating === grade){
        results.push(response[i]);
   }
      
    }  
    
} 
return results;
}

function deleteGame(index){
    currentGame.splice(index,1);
    output="";
    createAll(currentGame);    
}

function createAll(response){
        response.sort(function(a, b){
            return b.rating - a.rating;
        });

output+=`  <tr>
        <td>Broj</td>
        <td>Slika</td>
        <td>Datum izlaska</td>
        <td>Izvodjac</td>
        <td>Zanr</td>
        <td>Ocjena</td>
    </tr>`;
    
  for(let i = 0; i < response.length; i++){
     output += `
     <tr>
        <td>${i+1}</td>
        <td><a class="imgPseudo"href="${response[i].url}" target="_blank"><img class="imageContainer" src=${response[i].image}>
            <p class="gameName">${response[i].name}</p>
            </a></td>
        <td>${response[i].release}</td>
        <td>${response[i].publisher}</td>
        <td>${response[i].genres}</td>
        <td>${response[i].rating}</td>
        <td>
         <i class="fas fa-times deleteBtn" onclick="deleteGame(${i})"></i></td>
        </tr>`     
           
    }
    
  
  document.getElementById("gamesList").innerHTML = output;
}


/*
XMLHttpRqst

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
   response = JSON.parse(xhttp.responseText);
  //console.log(response.games);
  //console.log(game);
     createAll(response);
     searchBtn.addEventListener('click', () => {
  createAll( searchGame(response));
})
    }
};
xhttp.open("GET", "games.json", true);
xhttp.send();
*/