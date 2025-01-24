const tabla = document.getElementById('userTableBody')

fetch('/getUsers',  {credentials: 'include'})
    .then(response => response.json())
    .then(data =>{ 
        data.forEach(element => {
            const row = document.createElement('tr');
            row.id = `row-${element.id}`;
            row.innerHTML = `
                <td>${element.id}</td>
                <td>${element.user}</td>
                <td>${element.email}</td>
                <td class="accions-section">
                    <button onclick="editarUsuario(${element.id})" class="btn btn-primary">Editar</button>
                    <button onclick="eliminarUsuario(${element.id})" class="btn btn-danger">Borrar</button>
                </td>
            `;
            tabla.appendChild(row);
        }); 
    
    })
    .catch((error) => {
        console.error('Error:', error);
    });

function editarUsuario(id){
    const row = document.getElementById(`row-${id}`);
    const user = row.children[1].textContent
    const email = row.children[2].textContent

    const modal = document.getElementById("myModal");
    const closeBtn = document.getElementById('closeBtn')
    modal.style.display = "block"
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
    }
    const userModal = document.getElementById('userModal')
    const emailModal = document.getElementById('emailModal')
    userModal.value = user
    emailModal.value = email
}
