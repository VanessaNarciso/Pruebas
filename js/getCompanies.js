

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
                            <td>${data[i].nombre}</td>
                            <td>${data[i].razon_social}</td>
                            <td>${data[i].domicilio}</td>                        
                            <td>${data[i].numero}</td>
                            <td>${data[i].pais}</td>
                        </tr>
                `);
            }
            $('#empresastable').DataTable({
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

window.onload = getCompanies;