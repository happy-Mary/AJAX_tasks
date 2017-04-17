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