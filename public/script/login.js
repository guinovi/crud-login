// Expresiones regulares
const userRegex = /^[a-zA-Z0-9._-]{4,}$/;
const passRegex = /^[a-zA-Z0-9._-]{4,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

document.getElementById('formLogin').addEventListener('submit',(event)=>{
    event.preventDefault();
    const user = document.getElementById('userInput').value
    const pass = document.getElementById('passInput').value
    const errorMessageUser = document.getElementById('errorMessageUser');
    const errorMessagePass = document.getElementById('errorMessagePass');
    const errorMessage = document.getElementById('errorMessage');

    /* if(!userRegex.test(userInput)){
        errorMessageUser.textContent = 'Usuario Invalido';
        return;
    }else{
        errorMessageUser.textContent = '';
    }
    if(!passRegex.test(passInput)){
        errorMessagePass.textContent = 'Contraseña Invalida';
        return;
    }else{
        errorMessagePass.textContent = '';
    } */

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({user, pass}),
        credentials: 'include'
    })

    .then(response => response.json())
    .then(data => {
        if(!data) return errorMessage.textContent ='Error En el Acceso'
        if(data.error) return errorMessage.textContent = 'Usuario no encontrado'
        if(data){
            fetch('/protected', {
                credentials: 'include',
              })
                .then(response => response.json())
                .then(data => {
                    if (data.redirect) {
                      window.location.href = data.redirect;
                    }
                  })
                .catch(err => console.error(err));
        }

    })
    .catch(err => errorMessage.textContent = 'Usuario no encontrado')

})
