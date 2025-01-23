const form = document.getElementById('formNewUser');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newMail = document.getElementById('newMail').value;
    const newUser = document.getElementById('newUser').value;
    const newPass = document.getElementById('newPass').value;
    const errorMessage = document.getElementById('errorMessage');


    if ((newMail && newUser && newPass) === ''){
        return errorMessage.textContent =  "COMPLETE LOS DATOS"
    } 
    
    fetch('/newUser',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            newMail,
            newUser,
            newPass
        })
    })
    .then(response => response)
    .then(data => console.log(data))
    .catch(err => console.log(err))

});