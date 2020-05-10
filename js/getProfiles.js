function getProfile() {
    /*if(window.localStorage.tipo>1){
        window.location = 'index.html';
    }*/
    $.ajax({
        url: 'https://ligascortas.herokuapp.com/getProfile',      
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){
          // guardar token en localstorage o cookie        
          console.log(data)
          let list = $("#profile");
          list.html("");
          for (let i = 0; i < data.length; i++) {
            list.append(`<li class="list-group-item">
                <table class='table mt-10'>
                    <thead>
                        <tr>
                        <th scope="col">${i+1}</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Nombre</th>
                            <td>${data[i].nombre}</td>
                        </tr>
                        <tr>
                            <th scope="row">Razón social</th>
                            <td>${data[i].correo}</td>
                        </tr>
                        <tr>
                            <th scope="row">Domicilio</th>
                            <td>${data[i].numeroTelefono}</td>
                        </tr>
                    </tbody>
                </table>
                </li>`);
          }
        },
        error: function(error_msg) {
          alert((error_msg["responseText"]))
        }
      })
}

window.onload = getProfile;