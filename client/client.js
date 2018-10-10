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
    if (name != '' && content != '' && name.length <= 50 && content.length <= 250){
      form.style.display = 'none';
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
        }).then(()=>{
          form.reset();
          setTimeout(() => {
            form.style.display = '';
          }, 30000);
          listYeets();
        });
    }else{
      alert("You need to actually enter stuff...");
    }
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