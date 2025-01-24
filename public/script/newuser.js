const form = document.getElementById('formNewUser');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const newMail = document.getElementById('newMail').value;
    const newUser = document.getElementById('newUser').value;
    const newPass = document.getElementById('newPass').value;
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.color = 'red'



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
    .then(data => {
        if(data.status === 409){
            errorMessage.textContent = 'Usuario o email ya registrado'
            console.log(data)
            return;
        }
        if(data.status === 500){
            errorMessage.textContent = 'Error al Registrar el Usuario'
            return;
        }
        if(data.status === 200){
            errorMessage.style.color = 'green'
            errorMessage.textContent = 'USUARIO REGISTRADO'
            return
        }

    })
    .catch(err => {
        console.log(err)
        return errorMessage.textContent = 'ERROR AL registro'
    })

});