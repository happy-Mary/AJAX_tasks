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