const form = document.querySelector('form');
const yeetsList = document.querySelector('.yeets');
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
          }, 10000);
          listYeets();
        });
    }else {
      alert('Did did a silly, willy. Name cannot be longer than 50, and content cannot be longer than 250');
    }
})

function listYeets(){
  yeetsList.innerHTML = '';
  fetch(URL)
  .then(function(res) {
    return res.json();
  })
  .then(function(content) {
      content.reverse();
      content.forEach(yeet => {
        const div = document.createElement('div');

        const header = document.createElement('h3');
        header.textContent = yeet.name;

        const contents = document.createElement('p');
        contents.textContent = yeet.content;

        const date = document.createElement('small');
        date.textContent = new Date(yeet.created);

        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(date);

        yeetsList.appendChild(div);
      });
  });
}