// var HOST_URL = "https://flood-monitoring.herokuapp.com";
var HOST_URL = "http://localhost:3000";
var ten_tram;
var ma_tram;
var temp ="";
var id = document.getElementById("tram").text;

//*Hiển thị danh danh sách trạm trong menu
$.ajax({
    url: HOST_URL+'/api/station',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    type: "GET",
    /* or type:"GET" or type:"PUT" */
    dataType: "json",
    data: {},
    success: function(result) {
        $.each(result, function(b,a) {
            ten_tram = (a.ten_tram).toString();
            ma_tram = (a.ma_tram).toString();
                                                            //href="api/station/'+ma_tram+'" || onclick="checkStation(\''+ma_tram+'\')"
            temp +='<a class="dropdown-item dstram"  id="'+ma_tram+'" name="'+ma_tram+'" href="#">'+ten_tram+'</a>';
            document.getElementById('ds_tram').innerHTML =temp;
        });
    },
    error: function() {
        console.log("error");
    }
});

$(document).ready(function() {
    getInfoStation(id);   
    console.log('Load station finish');
});

//*Hiển thị thông tin trạm theo mã
function getInfoStation(id) {
    var ten_tram, ma_tram, sdt, vi_do, kinh_do, muc_1 , muc_2 , muc_3;
    $.ajax({
        url: HOST_URL+'/api/station/'+id,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "GET", /* or type:"GET" or type:"PUT" */
        dataType: "json",
        data: {},
        success: function(result) {
            $.each(result, function(a,data) {
                ten_tram = (data.ten_tram).toString();
                ma_tram = (data.ma_tram).toString();
                sdt = (data.sdt).toString();
                vi_do = (data.vi_do).toString();
                kinh_do = (data.kinh_do).toString();
                muc_1 = (data.muc_1).toString();
                muc_2 = (data.muc_2).toString();
                muc_3 = (data.muc_3).toString();
            });

            $("#xem_ten_tram").text(ten_tram);
            $("#xem_ma_tram").text(ma_tram);
            $("#xem_vi_tri_tram").text( 'Kinh độ: '+kinh_do + " - Vĩ độ: " + vi_do);
            $("#xem_sdt_tram").text(sdt);
            $("#xem_muc_canhbao_1").text('Mực cảnh báo cấp 1 '+muc_1);
            $("#xem_muc_canhbao_2").text('Mực cảnh báo cấp 2 '+ muc_2);
            $("#xem_muc_canhbao_3").text('Mực cảnh báo cấp 3 '+muc_3);
        },
        error: function() {
            console.log("error");
        }
    });
}

//* cập nhật thông tin trạm
$(document).ready(function() {
    $("#btnSave").click(function() {
        console.log('progest setup....');

        var txt_level_1 = document.querySelector('#waterLevelWarning1').value;
        var txt_level_2 = document.querySelector('#waterLevelWarning2').value;
        var txt_level_3 = document.querySelector('#waterLevelWarning3').value;
console.log(HOST_URL+'/api/station/update/'+id);

        $.ajax({
            url: HOST_URL+'/api/station/update/'+id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            type: "PUT",
            /* or type:"GET" or type:"PUT" */
            dataType: "json",
            data: {
                muc_1: txt_level_1,
                muc_2: txt_level_2,
                muc_3: txt_level_3
            },
            success: function(result) {
                console.log("update station success!");
                $('#setup').modal('hide');
            },
            error: function() {
                console.log("update station error");
                $('#setup').modal('hide');
            }
        });
    });
});