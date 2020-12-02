var ten_tram;
var ma_tram;
var temp ="";

$.ajax({
    url: 'http://localhost:3000/api/station',
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

