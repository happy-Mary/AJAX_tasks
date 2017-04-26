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