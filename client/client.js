const form = document.querySelector('form');
const URL = 'http://localhost:5000/api';

listYeets();

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    
    const obj = {
        name,
        content,
    }
    
    fetch(URL, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          'content-type': 'application/json'
        }
      }).then(response => {      
        if (!response.ok) {
          const contentType = response.headers.get('content-type');
          if (contentType.includes('json')) {
            return response.json().then(error => Promise.reject(error.message));
          } else {
            return response.text().then(message => Promise.reject(message));
          }
        }
      });
    
    listYeets();
})

function listYeets(){
    fetch(URL)
    .then(function(res) {
      return res.json();
    })
    .then(function(content) {
      console.table(content);
    })
}