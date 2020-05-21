var pathname = $(location).attr('search');
let company = pathname.substr(4)
console.log(company)


//get Empresa


function getCompany() {
    $.ajax({
        url: 'https://ligascortas.herokuapp.com/getCompany/'+company,            
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){  
          var lblName = data.nombre;
          var lblRazon = data.razon_social;
          var lblNumero = data.numero;
          var lblDomicilio = data.domicilio;
          var lblPais = data.pais;
          //let lblNumeroLigas = $("#numero_ligas");
          //let lblNumeroUsuarios = $("#numero_usuarios");

          $("#nombre_empresa").text(lblName)
          $("#razon_social").text(lblRazon)
          $("#numero").text(lblNumero)
          $("#domicilio").text(lblDomicilio)
          $("#pais").text(lblPais)

          
        },
        error: function(error_msg) {
          alert((error_msg["responseText"]))
        }
      })
    	//Tabla Usuarios 

     $.ajax({
        url: 'https://ligascortas.herokuapp.com/users/'+company,      
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
                            <td>${data[i].tipo}</td>
                        </tr>
                `);
          }
          $('#tabla_usuarios').DataTable({
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

     //Tabla Ligas
	$.ajax({
        url: 'https://ligascortas.herokuapp.com/ligas/'+company,      
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){
          let tabla = $("#bodyLigas");          
          for (let i = 0; i < data.length; i++) {
                ligOrg = data[i].ligaOriginal.substring(8,30)+' ...';
                tabla.append(`                
                        <tr>                            
                            <td><a class="nav-link" href="liga.html?id=${data[i]._id}">${data[i].nombreLiga}</a></td>
                            <td>${data[i].ligaCorta}</td>
                            <td>${ligOrg}</td>
                        </tr>
                `);
                if(i == data.length-1){
                  $('#tabla_ligas').DataTable({
                    "language": {
                        "lengthMenu": "Mostrar _MENU_ ligas por página",
                        "zeroRecords": "No hay ligas para mostrar",
                        "info": "Página _PAGE_ de _PAGES_",
                        "infoEmpty": "",
                        "infoFiltered": "(Buscando en _MAX_ ligas)"
                    }
                  });
                }           
          }          
        },
        error: function(error_msg) {
          alert((error_msg["responseText"]))
        }
    })

    $('#save_button').on('click', function(){
    // cargar datos del form    
    let nombreE = $('#inputName').val()
    let razonE = $('#inputRazon').val()
    let domicilioE = $('#inputDomicilio').val()
    let contactoE = $('#inputContacto').val()
  
  	if(nombreE == " "){
  		nombreE = lblName
  	}
  	if(razonE == " "){
  		razonE = lblRazon
  	}
  	if(domicilioE == ""){
  		domicilioE = lblDomicilio
  	}

    if(contactoE == ""){
    	contactoE = lblNumero
    }

    json_to_send = {
      "nombre" : nombreE,
      "razon_social" : razonE, 
      "domicilio" : domicilioE,
      "numero" : contactoE
    };
  
    json_to_send = JSON.stringify(json_to_send)
    console.log(json_to_send)
    $.ajax({
      url: 'https://ligascortas.herokuapp.com/company/'+company,      
      headers: {
          'Content-Type':'application/json',
          'Authorization' : window.localStorage.token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        alert('Empresa actualizada');
        window.location = 'consultComp.html'
      },
      error: function(error_msg) {
        alert((error_msg["responseText"]))
      }
    })
})
}


//Patch Empresa



//onLoad
window.onload = getCompany;