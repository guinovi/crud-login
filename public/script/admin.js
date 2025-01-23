const tabla = document.getElementById('userTableBody')

fetch('/getUsers',  {credentials: 'include'})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });