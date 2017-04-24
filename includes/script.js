/*
script.js
Title: JSON to Table
Author: Nazmus
URL: http://nazm.us
Github: https://github.com/nlinux1/

Custom JS file for JTable
*/

$(document).ready(function() {
    $("#myForm").on("submit", function(e) {
        $("#output").html(""); //clear HTML

        var list = $("#text").val(); //.split("\n"); // array item per newline 

        jTable(list.toString());
        e.preventDefault();
    });
});

function jTable(obj) {
    var objLen; // variable placeholder to store the number of records 
    try {
        obj = JSON.parse(obj);
        var table = $("<table>").addClass("table table-striped table-hover table-bordered table-condensed table-responsive").attr("id", "myTable");
        var thead = $("<thead>");
        var row = $("<tr>");
        $(table).append($(row).append($("<th>").addClass("info").append("#")));
        //check to see if obj is in array format or basic JSON
        if (obj[0] != undefined) {
            for (var key in obj[0]) {
                $(table).append($(thead).append($(row).append($("<th>").addClass("info").append(key))));
            }
            objLen = obj.length;
        } else {
            for (var key in obj) {
                $(table).append($(thead).append($(row).append($("<th>").addClass("info").append(key))));
            }
            objLen = 1; //always will be one because it's just one JSON item
        }

        $(obj).each(function(i, e) {
            var innerRow = $("<tr>");
            $(innerRow).append($("<td>").append(i + 1));
            for (var key in e) {
                $(innerRow).append($("<td>").append(outputFormat(e[key])));//.append(e[key]));
            }
            $(table).append($(innerRow));
        });
        $("#output").append($(table));

        //    console.log(obj.length);
        $("#rowCount").text("Number of records:" + objLen).show();

    } catch (err) {
        $("#output").append("<h3 class='text-danger container'>Could not process request, please check your input and try again!</h3>");
        $("#output").append("<h5 class='bg-warning container'><strong>Error Logged: </strong>" + err + "</h5>");
    }
}

function outputFormat(o){
    if(typeof(o) == 'object'){
        var str = '';
        for(p in o){
            str += '<details>';
            str += '<summary>' + p + '</summary>';
            str += '<p style="padding-left: 15px">' + outputFormat(o[p]) + '</p>';
            str += '</details>';
//            str += '<strong>' + p + '</strong>: ' + outputFormat(o[p]) + '<br />';
        }
        console.log(str);
        return str;
    } else { return o; }
}
