// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
idE = window.localStorage.empresaId;


function getDatosDashboard(){
  $.ajax({
      url: 'https://ligascortas.herokuapp.com/ligasVisitasNav/'+idE,      
      headers: {
          'Content-Type':'application/json'
      },
      method: 'GET',
      success: function(data){     
          console.log(data)
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
                xAxes: [{
                  time: {
                    unit: 'month'
                  },
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    maxTicksLimit: 6
                  }
                }],
                yAxes: [{
                  ticks: {
                    min: 0,
                    max: 15000,
                    maxTicksLimit: 5
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