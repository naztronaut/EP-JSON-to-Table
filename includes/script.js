/*
script.js
Title: JSON to Table
Author: Nazmus
URL: http://nazm.us
Github: https://github.com/nlinux1/

Custom JS file for JTable
*/

$(document).ready(function () {
    $("#myForm").on("submit", function (e) {
        $("#output").html(""); //clear HTML
        var list = $("#text").val(); // read value from textarea 
        jTable(list.toString()); // convert input to string
        e.preventDefault();
    });
});

function jTable(data) {
    var obj = JSON.parse(data); // parse the sent string back to JSON and store into obj
    
    // new table, thead and tr elements
    var table = $("<table>").addClass("table table-striped table-hover table-bordered table-condensed table-responsive").attr("id", "myTable");
    var thead = $("<thead>");
    var row = $("<tr>");
    for (var key in obj[0]) {
        // add the column headers with the 'info' class - headers are the object keys - only goes through the first object in the array to get the key
        $(table).append($(thead).append($(row).append($("<th>").addClass("info").append(key)))); 
    }

    // iterate through each object array
    $(obj).each(function (i, e) {
        var innerRow = $("<tr>"); //create tr element
        for (var key in e) {
            $(innerRow).append($("<td>").append(e[key])); //append value to each td element and append to tr above
        }
        $(table).append($(innerRow)); // append everything to the table created above
    });
    
    //output results to #output and display number of records found in #rowCount
    $("#output").append($(table));
    $("#rowCount").text("Number of records:" + obj.length);
}