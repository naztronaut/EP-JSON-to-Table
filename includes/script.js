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
        $("#exportErr, #rowCount, #btnExport").hide(); //hide all output elements when submit is clicked in case there is an error
        //            $("#outputText").html(''); //reset html
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
                $(innerRow).append($("<td>").append(e[key]));
            }
            $(table).append($(innerRow));
        });
        $("#output").append($(table));

        //    console.log(obj.length);
        $("#rowCount").text("Number of records:" + objLen).show();
        $("#btnExport").show();

        $("#btnExport").click(function(e) {
            //try and catch export error - if no error, export as .xls
            try {
                $('#myTable').tableExport({
                    type: 'excel',
                    escape: 'false'
                });
            } catch (err) {
                $("#exportErr").html("<span class='text-danger'>Could not export beacuse your input contains invalid characters. Error logged: " + err + "</span>").show();
            }
            e.preventDefault();
        });

    } catch (err) {
        $("#output").append("<h3 class='text-danger container'>Could not process request, please check your input and try again!</h3>");
        $("#output").append("<h5 class='bg-warning container'><strong>Error Logged: </strong>" + err + "</h5>");
    }
    //old code
    /*    
        $("#output").append(table);
    //    $("#output").append("<table class='table table-striped'>");
        for (var key in obj[0]) {
            $("#output").append("<td>" +key + "<td>");
        }

        $(obj).each(function(i,e) {
            $("#output").append("<tr>");
            for (var key in e) {
                $("#output").append("<td>" +e[key] + "<td>");
            }
            $("#output").append("</tr>");
        });   
        $("#output").append("</table>");
        */
}