var arTime = [];
var arData = [];
var soDongDuLieu = 0;
var tram = document.getElementById("tram").text;

console.log('Đang chạy realtime...');

//*Hàm xử lý realtime
$(function() {
    // Kết nối tới server socket đang lắng nghe
    //https://flood-monitoring.herokuapp.com
    var socket = io('http://localhost:3000');

    //realtime event post data
    socket.on("Client_gui", function(data) {
        console.log('client: có data gửi lên');
        $("#spanCurrentWater").text(data.waterLevel + " m");
        $("#currentWaterLevel").text(" " + data.date);

        const divv = document.querySelector('#widthWaterCurrent');
        divv.setAttribute('style', 'width:' + data.waterLevel + '%');

        // Tạo bảng dữ liệu
        $("#tableData").append("<tr class='p-5'><td>" + data.date + "</td>" +
            "<td>" + data.time + "</td>" +
            "<td class='text-center text-primary'>" + data.waterLevel + "</td></tr>");

        // Tạo biểu đồ dữ liệu
        var ctx = document.getElementById('myChart');
        arTime.push(data.time);
        arData.push(data.waterLevel);
        // eslint-disable-next-line no-unused-vars
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
            })
            // end chart
        addData(myChart, data.date, data.waterLevel);
    });
})

//*Hàm load dữ liệu khi bắt đầu chạy
$(document).ready(function() {
    loadData("0001");   
    console.log('Load data finish');
});

//* hàm tạo dữ liệu
//* ma_tram: truyền vào mã trạm cần load dữ liệu
//* isLoad: nếu load lần 1 thì không khởi tạo lại dữ liệu
function loadData(ma_tram) {
    
    var arTime = [];
    var arData = [];
    $.ajax({
        //https://flood-monitoring.herokuapp.com/api/data
        url: 'http://localhost:3000/api/data/tram/'+ma_tram,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "GET",
        /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {},
        success: function(result) {
         
            var leg = result.length;
            var waterCurrent = ' ' + (result[leg - 1].muc_nuoc);
            var timeUpdate = ' ' + (result[leg - 1].thoi_gian);

            $("#spanCurrentWater").text(waterCurrent + " m");
            $("#currentWaterLevel").text(timeUpdate);
            // $("#widthWaterCurrent").setAttribute("width", "'" + waterCurrent + "%'");

            const divv = document.querySelector('#widthWaterCurrent');
            divv.setAttribute('style', 'width:' + waterCurrent + '%');

            //*Tạo bảng dữ liệu
            var dem = 1;
            $.each(result, function(a, b) {
               
                arTime.push(b.thoi_gian);
                arData.push(b.muc_nuoc);

                $("#tableData").append("<tr class='p-5'><td>" + dem + "</td><td>" + b.ngay_thang + "</td>" +
                    "<td>" + b.thoi_gian + "</td>" +
                    "<td class='text-center text-primary'>" + b.muc_nuoc + "</td></tr>");

                    soDongDuLieu++;
                    dem++;
            });


            //* Vẽ biểu đồ
            var ctx = document.getElementById('myChart')
            var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: arTime, //* truyền vào thời gian
                        datasets: [{
                            data: arData,   //*truyển vào dữ liệu
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
            })
                // end chart
        },
        error: function() {
            console.log("error");
        }
    });
}

//*Hàm update dữ liệu vào biểu đồ
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}
