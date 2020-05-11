function getUsersComp() {    
    $.ajax({
        url: 'https://ligascortas.herokuapp.com/users/'+window.localStorage.empresaId,      
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){
          let tabla = $("#bodyUsuarios");          
          for (let i = 0; i < data.length; i++) {
            tabla.append(`                
                        <tr>                            
                            <td>${data[i].nombre}</td>
                            <td>${data[i].correo}</td>
                            <td>${data[i].numeroTelefono}</td>
                        </tr>
                `);
          }
          $('#usuariosEmpresa').DataTable({
            "language": {
                "lengthMenu": "Mostrar _MENU_ ligas por página",
                "zeroRecords": "No hay ligas para mostrar",
                "info": "Página _PAGE_ de _PAGES_",
                "infoEmpty": "",
                "infoFiltered": "(Buscando en _MAX_ ligas)"
            }
          });
        },
        error: function(error_msg) {
          alert((error_msg["responseText"]))
        }
      })
}

window.onload = getUsersComp;
  