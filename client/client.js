const form = document.querySelector('form');
const URL = 'http://localhost:5000/api';

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    getYeets();
})

function getYeets(){

    fetch(URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.table(myJson);
    });
}