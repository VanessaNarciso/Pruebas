function getUsersComp() {
    var tipo = window.localStorage.tipo;
    var serverName = 'https://ligascortas.herokuapp.com';
    var getUrl = serverName;
    if(tipo == "0"){
      getUrl= getUrl+"/users/";
      $('#usuariosEmpresa > thead tr').append('<th>Empresa</th>');
    }else{
      getUrl= getUrl+'/users/'+window.localStorage.empresaId;
    }
    $.ajax({
        url: getUrl,
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){
          let tabla = $("#bodyUsuarios");          
          for (let i = 0; i < data.length; i++) {
            if(tipo == "0"){
              tabla.append(`                
                        <tr>                            
                            <td>${data[i].nombre}</td>
                            <td>${data[i].correo}</td>
                            <td>${data[i].numeroTelefono}</td>
                            <td>${data[i].empresa}</td>
                        </tr>
                `);
            }else{
              tabla.append(`                
                        <tr>                            
                            <td>${data[i].nombre}</td>
                            <td>${data[i].correo}</td>
                            <td>${data[i].numeroTelefono}</td>                            
                        </tr>
                `);
            }
          }
          $('#usuariosEmpresa').DataTable({
            "language": {
                "lengthMenu": "Mostrar _MENU_ perfiles por página",
                "zeroRecords": "No hay perfiles para mostrar",
                "info": "Página _PAGE_ de _PAGES_",
                "infoEmpty": "",
                "infoFiltered": "(Buscando en _MAX_ perfiles)"
            }
          });
        },
        error: function(error_msg) {
          alert((error_msg["responseText"]))
        }
      })
}

window.onload = getUsersComp;
  