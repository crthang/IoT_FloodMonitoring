$(document).ready(function() {
    $("#btnDangNhap").click(function() {
        var txtUsername = document.getElementById("username").value;
        var txtPassword = document.getElementById("password").value;

        if (txtUsername == "" || txtPassword == "") {
            alert("Bạn chưa nhập đủ thông tin");
        } else {
            var username;
            var password;
            $.ajax({
                url: 'http://localhost:3000/api/user',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                type: "GET",
                /* or type:"GET" or type:"PUT" */
                dataType: "json",
                data: {},
                success: function(result) {
                    $.each(result, function(a, b) {
                        username = b.username;
                        password = b.password;

                    });
                    console.log(username + password);
                    if (txtUsername == username && txtPassword == password) {
                        sessionStorage.setItem('checklogin', 'admin');
                        location.href = '../public/index.html';

                    } else {
                        alert("Tài khoản hoặc mật khẩu chưa đúng!");

                    }
                },
                error: function() {
                    console.log("error");
                }
            });

        }
    });
});