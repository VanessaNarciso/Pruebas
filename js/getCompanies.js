

function getCompanies() {
    if(window.localStorage.tipo>0){
        window.location = 'index.html';
    }
    $.ajax({
        url: 'https://ligascortas.herokuapp.com/getCompanies',      
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){
         let tabla = $("#bodyEmpresas");          
          for (let i = 0; i < data.length; i++) {
                tabla.append(`                
                        <tr> 

                            <td><a class="nav-link" href="empresa.html?id=${data[i]._id}">${data[i].nombre}</a></td>
                            <td>${data[i].razon_social}</td>
                            <td>${data[i].domicilio}</td>                        
                            <td>${data[i].numero}</td>
                            <td>${data[i].pais}</td>
                        </tr>
                `);
            }
            $('#empresastable').DataTable({
            "language": {
                "lengthMenu": "Mostrar _MENU_ empresas por página",
                "zeroRecords": "No hay empresas para mostrar",
                "info": "Mostrando de _START_ a _END_ de un total _TOTAL_ registros",
                "infoEmpty": "",
                "infoFiltered": "(Buscando en _MAX_ empresas)"
            }
          });
        },               
        error: function(error_msg) {
          alert((error_msg["responseText"]))
        }
      })
}

window.onload = getCompanies;