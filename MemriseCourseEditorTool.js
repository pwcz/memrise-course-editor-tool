// ==UserScript==
// @name         Memrise Course Editor Tool
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Provides description, examples and translation for new word
// @match        https://www.memrise.com/course/*/*/edit/
// @match        https://www.memrise.com/course/*/*/edit/*
// @grant        none
// ==/UserScript==

$(document).ready(function () {
    var waitForEl = function(selector, callback) {
        if (jQuery(selector).length) {
            callback();
        } else {
            setTimeout(function() {
                waitForEl(selector, callback);
            }, 100);
        }
    };

    var button_click = 0;

    waitForEl("tbody.adding", function() {
        $("tbody.adding").append('<tr data-role="add-form" class=""> <td><button type="submit" id="mt_button">OK</button></td><td class="text column" id="mt1"><input class="wide" type="text"></td><td class="text column" id="mt2"><select class="wide" type="text"></select></td><td class="audio column" id="mt3"></td><td class="text column" id="mt4"><select class="wide" type="text"></select></td><td class="text column" id="mt5"><select class="wide" type="text"></select></td><td class="attribute"></td><td class="attribute"></td><td class="attribute"></td></tr>');
        $("#mt_button").click(    function UserAction() {

        // clear selects
        $("tr[data-role=add-form] td.text.column[data-key=1] input").val($("#mt1 input").val());
        $("#mt2 option").remove();
        $("#mt4 option").remove();
        $("#mt5 option").remove();

        fetch('http://127.0.0.1:5000/memrise_tool/api/v1.0/translate/' + $("#mt1 input").val())
            .then(
                function(response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function(data) {
                        // console.log(stringify(data));
                        var temp = "";
                        var arrayLength = 0;
                        var i = 0;
                        //$("#audio").text(data["audio"]);

                        arrayLength = data.description.length;
                        // $("#description").append("<select></select>");
                        for (i = 0; i < arrayLength; i++) {
                            // $("#description").append("<b>" + data["description"][i] + "</b><br/>")
                            temp = data.description[i];
                            // language=HTML
                            $("#mt2 select").append("<option value=\"" + temp + "\">" + temp + "</option>" );
                        }

                        arrayLength = data.translate.length;
                        for (i = 0; i < arrayLength; i++) {
                            temp = data.translate[i];
                            $("#mt5 select").append("<option value=\"" + temp + "\">" + temp + "</option>" );
                        }

                        arrayLength = data.example.length;
                        for (i = 0; i < arrayLength; i++) {
                            temp = data.example[i];
                            $("#mt4 select").append("<option value=\"" + temp + "\">" + temp + "</option>" );
                        }

                    });
                }
            );

    });
        // action    for change second column
        $("#mt2 select").change(function() {
            $("tr[data-role=add-form] td.text.column[data-key=2] input").val($("#mt2 select").val());
        });

        // action    for change fourth column
        $("#mt4 select").change(function() {
            $("tr[data-role=add-form] td.text.column[data-key=4] input").val($("#mt4 select").val());
        });
        // action    for change fifth column
        $("#mt5 select").change(function() {
            $("tr[data-role=add-form] td.text.column[data-key=5] input").val($("#mt5 select").val());
        });
    });

});