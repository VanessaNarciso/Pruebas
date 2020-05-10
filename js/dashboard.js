$('#NameEmpresa').text(window.localStorage.empresa);
idE = window.localStorage.empresaId;
tipo = window.localStorage.tipo;

function getDatosDashboard(){

    ///////////////////////////////////////////////////////////////////   TOTAL CLICS LIGAS EMPRESA
    $.ajax({
        url: 'https://ligascortas.herokuapp.com/ligasVisitas/'+idE,      
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){     
            console.log(data)
            $('#totalesLigas').text(data.length)            
        },
        error: function(error_msg) {
          alert((error_msg["responseText"]))
        }
    })


    ///////////////////////////////////////////////////////////////////   GRAFICA DE BARRAS
    $.ajax({
        url: 'https://ligascortas.herokuapp.com/ligasVisitasNav/'+idE,      
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        success: function(data){     
            console.log("Datos para grafica",data)
            // Bar Chart Example
            navs = [];
            visitas = [];
            for(var i=0; i<data.length; i++){
              navs.push(data[i]._id)
              visitas.push(data[i].visitas)
            }
            var ctx = document.getElementById("myBarChart");
            var myLineChart = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: navs,
                datasets: [{
                  label: "Visitas",
                  backgroundColor: "rgba(62, 204, 142, 1)",
                  borderColor: "rgba(62, 204, 142, 1)",
                  data: visitas,
                }],
              },
              options: {
                scales: {
                  yAxes: [{
                    ticks: {
                      stacked : true
                    },
                    gridLines: {
                      display: true
                    }
                  }],
                },
                legend: {
                  display: false
                }
              }
            });
  
        },
        error: function(error_msg) {
          alert((error_msg["responseText"]))
        }
    })
}


window.onload = getDatosDashboard;