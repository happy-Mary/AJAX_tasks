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
$(document).ready(function() {
    var hashes = ["main", "form", "table", "runes", "tabs"];
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
            case hashes[1]:
                openFormTask();
                break;
            case hashes[2]:
                openTableTask();
                break;
            case hashes[3]:
                openRunesTask();
                break;
            case hashes[4]:
                openTabsTask();
                break;
        }
    }

    function SwitchHash(hashName) {
        UrlStr = hashName;
        location.hash = UrlStr;
        console.log(UrlStr);
    }

    SwitchToPage();

    function openFormTask() {
        $('.page-content').load('src/templates/pages/form_numbers.html');
        SwitchHash('form');
    }

    function openTableTask() {
        $('.page-content').load('src/templates/pages/table_json.html');
        SwitchHash('table');
    }

    function openTabsTask() {
        $('.page-content').load('src/templates/pages/tabs.html');
        SwitchHash('tabs');
        // from tabs.js
        LoadFirstTabContent();
    }

    function openRunesTask() {
        $('.page-content').load('src/templates/pages/rune_game.html');
        SwitchHash('runes');
    }

    $('.menu button').eq(0).click(openFormTask);
    $('.menu button').eq(1).click(openTableTask);
    $('.menu button').eq(2).click(openTabsTask);
    $('.menu button').eq(3).click(openRunesTask);
});