"use strict";

var arTime = [];
var arData = [];
$(function () {
  // Kết nối tới server socket đang lắng nghe
  var socket = io('http://localhost:3000'); // socket.emit('Client_gui', "thang");
  //realtime event post data

  socket.on("Client_gui", function (data) {
    console.log('client: có data gửi lên');
    $("#spanCurrentWater").text(data.waterLevel + " m");
    $("#currentWaterLevel").text(" " + data.date);
    var divv = document.querySelector('#widthWaterCurrent');
    divv.setAttribute('style', 'width:' + data.waterLevel + '%');
    $("#tableData").append("<tr class='p-5'><td>" + data.date + "</td>" + "<td>" + data.time + "</td>" + "<td class='text-center text-primary'>" + data.waterLevel + "</td></tr>"); // chart

    var ctx = document.getElementById('myChart');
    arTime.push(data.time);
    arData.push(data.waterLevel); // eslint-disable-next-line no-unused-vars

    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: arTime,
        datasets: [{
          data: arData,
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 4,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false
            }
          }]
        },
        legend: {
          display: false
        }
      }
    }); // end chart

    addData(myChart, data.date, data.waterLevel);
  });
});
$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:3000/api/data',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    type: "GET",

    /* or type:"GET" or type:"PUT" */
    dataType: "json",
    data: {},
    success: function success(result) {
      // console.log(result);
      var leg = result.length;
      var waterCurrent = ' ' + result[leg - 1].waterLevel;
      var timeUpdate = ' ' + result[leg - 1].date;
      $("#spanCurrentWater").text(waterCurrent + " m");
      $("#currentWaterLevel").text(timeUpdate); // $("#widthWaterCurrent").setAttribute("width", "'" + waterCurrent + "%'");

      var divv = document.querySelector('#widthWaterCurrent');
      divv.setAttribute('style', 'width:' + waterCurrent + '%');
      $.each(result, function (a, b) {
        arTime.push(b.time);
        arData.push(b.waterLevel);
        $("#tableData").append("<tr class='p-5'><td>" + b.date + "</td>" + "<td>" + b.time + "</td>" + "<td class='text-center text-primary'>" + b.waterLevel + "</td></tr>");
      }); // $("#tableData").DataTable();
      // chart

      var ctx = document.getElementById('myChart'); // eslint-disable-next-line no-unused-vars

      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: arTime,
          datasets: [{
            data: arData,
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#007bff',
            borderWidth: 4,
            pointBackgroundColor: '#007bff'
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false
              }
            }]
          },
          legend: {
            display: false
          }
        }
      }); // end chart
    },
    error: function error() {
      console.log("error");
    }
  });
});

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach(function (dataset) {
    dataset.data.push(data);
  });
  chart.update();
}