// $(document).ready(function() {
//     $("#btnSave").click(function() {
//         console.log('progest setup....');

//         var txtWaterLevelLimit = document.querySelector('#waterLevelWarning').value;
//         var txtStationNumber = document.querySelector('#stationNumber').value;

//         console.log('progest setup....' + txtWaterLevelLimit + " || " + txtStationNumber);

//         $.ajax({
//             url: 'https://flood-monitoring.herokuapp.com/api/setup',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             type: "POST",
//             /* or type:"GET" or type:"PUT" */
//             dataType: "json",
//             data: {
//                 stationNumber: txtStationNumber,
//                 waterLevelLimit: txtWaterLevelLimit
//             },
//             success: function(result) {
//                 console.log("success!");
//             },
//             error: function() {
//                 console.log("error");
//             }
//         });
//     });
// });