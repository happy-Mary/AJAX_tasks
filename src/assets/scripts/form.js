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