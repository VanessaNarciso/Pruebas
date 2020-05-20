function dateRead(d){
    var dd = d.getDate();
    var mm = d.getMonth()+1;
    var yyyy = d.getFullYear();
    var ss = d.getSeconds();
    var mii = d.getMinutes();
    var hh = d.getHours();
    if(dd<10) {dd='0'+dd}
    if(mm<10) {mm='0'+mm}
    if(ss<10) {ss='0'+ss}
    if(mii<10) {mii='0'+mii}
    if(hh<10) {hh='0'+hh}
    date = dd+'/'+mm+'/'+yyyy+'-'+hh+':'+mii+':'+ss;
    return date;
  }
  
  function getLandingsComp() {    
      $.ajax({
        // cambiar al URL correcto. solo se necesita la info de configLanding 
          url: 'https://ligascortas.herokuapp.com/configLanding/'+window.localStorage.empresaId,      
          headers: {
              'Content-Type':'application/json'
          },
          method: 'GET',
          success: function(data){
            let tabla = $("#bodyLandings");          
            for (let i = 0; i < data.length; i++) {
              $.ajax({
                url: 'https://ligascortas.herokuapp.com/user/'+data[i].createdBy,      
                headers: {
                    'Content-Type':'application/json'
                },
                method: 'GET',
                success: function(data2){
                  fechaC = dateRead(new Date(data[i].fechaCreacion));
                  fechaM = dateRead(new Date(data[i].fechaModificacion));
                  /*
                    <th>Id landing</th>
                    <th>Título</th>
                    <th>Descripción </th>
                    <th>Fecha de modificación</th>
                    <th>Liga corta</th>
                    <th>Creador</th>
                  
                  */
                  tabla.append(`                
                          <tr>
                              <td> ${data[i].landingId} </td>
                              <td> ${data[i].nombreLanding} </td>
                              <td> ${data[i].descriptionLanding}</td>
                              <td>${fechaC}</td>
                              <td>${fechaM}</td>  
                              <td>${data2.nombre}</td>     
                          </tr>
                  `);
                  if(i == data.length-1){
                    $('#landingsEmpresa').DataTable({
                      "language": {
                          "lengthMenu": "Mostrar _MENU_ lansing pages por página",
                          "zeroRecords": "No hay landing pages para mostrar",
                          "info": "Página _PAGE_ de _PAGES_",
                          "infoEmpty": "",
                          "infoFiltered": "(Buscando en _MAX_ landing pages)"
                      }
                    });
                  }
                }
              })            
            }          
          },
          error: function(error_msg) {
            alert((error_msg["responseText"]))
          }
        })
  }
  
  window.onload = getLandingComp;
