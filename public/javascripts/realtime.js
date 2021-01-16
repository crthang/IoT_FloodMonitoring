var arTime = [];
var arData = [];
var soDongDuLieu = 0;
var dem = 1;
var tram = document.getElementById("tram").text;
var myChart ;

console.log('Đang chạy realtime...');

var ma_tram, muc_1 , muc_2 , muc_3;
$.ajax({
    url: HOST_URL+'/api/station/'+tram,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    type: "GET", /* or type:"GET" or type:"PUT" */
    dataType: "json",
    data: {},
    success: function(result) {
        $.each(result, function(a,data) {
           
            ma_tram = (data.ma_tram).toString();
            muc_1 = (data.muc_1).toString();
            muc_2 = (data.muc_2).toString();
            muc_3 = (data.muc_3).toString();
        });
    },
    error: function() {
        console.log("error");
    }
});

//*Hàm xử lý realtime

    // Kết nối tới server socket đang lắng nghe
    //https://flood-monitoring.herokuapp.com
    var socket = io(HOST_URL);

    //realtime event post data
    socket.on("Client_gui", function(data) {
        console.log('client: có data gửi lên');

        console.log(data.muc_nuoc);
        

        $("#spanCurrentWater").text(data.muc_nuoc + " m");
        $("#currentWaterLevel").text(" " + data.thoi_gian);

        
        if(data.muc_nuoc >= muc_1){
            $("#txt_canh_bao").text("Cảnh báo mức 1");
            document.getElementById("ic_canh_bao").style.color = "#F0E68C";
        }
        if(data.muc_nuoc < muc_1){
            $("#txt_canh_bao").text("không cảnh báo");
            document.getElementById("ic_canh_bao").style.color = "#8d8d8c";
        }
        if(data.muc_nuoc >= muc_2){
            $("#txt_canh_bao").text("Cảnh báo mức 2");
            document.getElementById("ic_canh_bao").style.color = "#FFD700";
        }
        if(data.muc_nuoc >= muc_3){
            $("#txt_canh_bao").text("Cảnh báo mức 3");
            document.getElementById("ic_canh_bao").style.color = "#B22222";
        }

        const divv = document.querySelector('#widthWaterCurrent');
        divv.setAttribute('style', 'width:' + data.muc_nuoc + '%');

       
        $("#tableData").find("tr:not(:first)").remove();
        dem = 1;

        loadData('0001');
        //addData(myChart, data.thoi_gian, data.muc_nuoc);
    });


//*Hàm load dữ liệu khi bắt đầu chạy
$(document).ready(function() {
    loadData("0001");    
    console.log('khởi tạo dữ liệu thành công.');
});

//* hàm tạo dữ liệu
//* ma_tram: truyền vào mã trạm cần load dữ liệu
//* isLoad: nếu load lần 1 thì không khởi tạo lại dữ liệu
function loadData(ma_tram) {
    var arTime = [];
    var arData = [];

    $.ajax({
        //https://flood-monitoring.herokuapp.com/api/data
        url: HOST_URL+'/api/data/tram/'+ma_tram,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "GET",
        /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {},
        success: function(result) {
            
            var waterCurrent = ' ' + (result[0].muc_nuoc);
            var timeUpdate = ' ' + (result[0].thoi_gian);
            
            $("#spanCurrentWater").text(waterCurrent + " m");
            $("#currentWaterLevel").text(timeUpdate);
            // $("#widthWaterCurrent").setAttribute("width", "'" + waterCurrent + "%'");

            if(result[0].muc_nuoc >= muc_1){
                $("#txt_canh_bao").text("Cảnh báo mức 1");
                document.getElementById("ic_canh_bao").style.color = "#F0E68C";
            }
            if(result[0].muc_nuoc >= muc_2){
                $("#txt_canh_bao").text("Cảnh báo mức 2");
                document.getElementById("ic_canh_bao").style.color = "#FFD700";
            }
            if(result[0].muc_nuoc >= muc_3){
                $("#txt_canh_bao").text("Cảnh báo mức 3");
                document.getElementById("ic_canh_bao").style.color = "#B22222";
            }
            const divv = document.querySelector('#widthWaterCurrent');
            divv.setAttribute('style', 'width:' + waterCurrent + '%');

            //*Tạo bảng dữ liệu
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
            myChart = new Chart(ctx, {
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
