// form Script
function printError(req, status, err) {
    console.log('что-то пошло не так', status, err);
}

function showText(data) {
    $('.form-text').html(data);
}

var AjaxFormOpt = { type: 'GET', dataType: 'html', success: showText, error: printError };

$(".numbers").ready(function() {
    function countNumbers() {
        var num = parseInt($('input[type="number"]').first().val()) + parseInt($('input[type="number"]').last().val());

        if (isNaN(num)) {
            $('.form-text').text("Введите числа!");
        } else if (num > 25) {
            $.get("src/templates/elements/text1.html", function(html) {
                $('.form-text').html(html);
            });
        } else {
            $.ajax("src/templates/elements/text2.html", AjaxFormOpt);
        }

        return false;
    }

    $(this).on('click', 'button', countNumbers);
});
$('.runes').ready(function() {
    $(this).on('click', 'td', function() {
        $(this).toggleClass('show');
    })
});
 function getTableJson() {
     $.getJSON('src/templates/elements/json.json',
         function(data) {
             var friends = data.friends;
             var tr_head = $('<tr></tr>');
             $('.data_table').append(tr_head);
             // making thead
             for (var K in friends[0]) {
                 tr_head.append($('<th></th>').text(K));
             }
             // making table content
             for (var i = 0; i < friends.length; i++) {
                 var tr = $('<tr></tr>');
                 $('.data_table').append(tr);
                 for (var K in friends[i]) {
                     var item = friends[i][K];
                     var text = "";
                     if ($.isPlainObject(item)) {
                         for (var K in item) { text += K + ": " + item[K] + '<br>'; }
                     } else {
                         text += item;
                     }
                     tr.append($('<td></td>').html(text));
                 }
             }
         });
 }
function LoadFirstTabContent() {
    $.ajax({
        url: "src/templates/elements/pc.txt",
        type: 'get',
        success: function(data) {
            $('.tab-text').html(data);
        },
        error: function(xhr, ajaxOptions, thrownError) {
            var errorMsg = 'Ajax request failed: ' + xhr.responseText;
            $('.tab-text').html(errorMsg);
        }
    });
}

$(".tabs").ready(function() {
    var contentUrl = ["src/templates/elements/pc.txt", "src/templates/elements/oop.txt", "src/templates/elements/os.txt", "src/templates/elements/anim.txt", "src/templates/elements/vr.txt"];

    function loadContent(url) {
        $('.tab-text').load(url);
    }

    $(this).on('click', '.tab', function() {
        $('.active').removeClass("active");
        $(this).addClass("active");
        var current = $(this).index();

        var current = $(this).index();
        switch (current) {
            case 0:
                loadContent(contentUrl[0]);
                break;
            case 1:
                loadContent(contentUrl[1]);
                break;
            case 2:
                loadContent(contentUrl[2]);
                break;
            case 3:
                loadContent(contentUrl[3]);
                break;
            case 4:
                loadContent(contentUrl[4]);
                break;
        }
    });
});
// document route
$(document).ready(function() {
    var hashes = ["main", "form", "table", "tabs", "runes"];
    window.onhashchange = SwitchToPage;
    var HashState = {};

    function SwitchToPage() {
        var hashUrl = window.location.hash;
        var UrlStr = hashUrl.substr(1);

        if (UrlStr != "") {
            var PartsA = UrlStr.split("_")
            SPAStateH = { pagename: PartsA[0] };
        } else
            SPAStateH = { pagename: hashes[0] };

        switch (SPAStateH.pagename) {
            case hashes[0]:
                $('.page-content').html('<h2>MAIN PAGE</h2>');
                $('.activeMenu').removeClass('activeMenu');
                break;
            case hashes[1]:
                $('.activeMenu').removeClass('activeMenu');
                $('.menu button').eq(0).addClass('activeMenu');
                openFormTask();
                break;
            case hashes[2]:
                $('.activeMenu').removeClass('activeMenu');
                $('.menu button').eq(1).addClass('activeMenu');
                openTableTask();
                break;
            case hashes[3]:
                $('.activeMenu').removeClass('activeMenu');
                $('.menu button').eq(2).addClass('activeMenu');
                openTabsTask();
                break;
            case hashes[4]:
                $('.activeMenu').removeClass('activeMenu');
                $('.menu button').eq(3).addClass('activeMenu');
                openRunesTask();
                break;
        }
    }

    function SwitchHash(hashName) {
        UrlStr = hashName;
        location.hash = UrlStr;
    }

    function openFormTask() {
        $('.page-content').load('src/templates/pages/form_numbers.html');
    }

    function openTableTask() {
        $('.page-content').load('src/templates/pages/table_json.html', getTableJson);
    }

    function openTabsTask() {
        $('.page-content').load('src/templates/pages/tabs.html', function(responseTxt, statusTxt, xhr) {
            if (statusTxt == "success")
            // from tabs.js
                LoadFirstTabContent();
            if (statusTxt == "error")
                console.log("Error: " + xhr.status + ": " + xhr.statusText);
        });
    }

    function openRunesTask() {
        $('.page-content').load('src/templates/pages/rune_game.html');
    }

    // button events 
    $('.menu button').eq(0).click(function() { SwitchHash('form') });
    $('.menu button').eq(1).click(function() { SwitchHash('table') });
    $('.menu button').eq(2).click(function() { SwitchHash('tabs') });
    $('.menu button').eq(3).click(function() { SwitchHash('runes') });

    // first event
    SwitchToPage();
});